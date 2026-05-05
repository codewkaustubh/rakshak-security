import { MOCK_DEVICES } from "@/api/mockData";
import { getDevices, pairDevice } from "@/api/rakshak";
import { useRakshakStore } from "@/store/useRakshakStore";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Shield,
  Wifi,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Step = 1 | 2 | 3;

const DEVICE_ID_PATTERN = /^RKSH-[A-Z0-9]{4}$/;
const NAME_SUGGESTIONS = ["Home", "Office", "Garage", "Warehouse", "Factory"];

// ── Step Indicator ────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "ENTER DEVICE ID" },
  { id: 2, label: "NAME DEVICE" },
  { id: 3, label: "CONNECTING" },
] as const;

function StepIndicator({ current }: { current: Step }) {
  return (
    <div
      className="flex items-center gap-0 w-full"
      data-ocid="setup.step_indicator"
    >
      {STEPS.map((s, i) => (
        <div key={s.id} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1 flex-1">
            {/* Circle */}
            <div
              className={`w-7 h-7 flex items-center justify-center border-2 transition-all duration-300 text-[10px] font-bold font-display ${
                s.id < current
                  ? "border-primary bg-primary text-primary-foreground"
                  : s.id === current
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border/50 bg-transparent text-muted-foreground/50"
              }`}
            >
              {s.id < current ? <CheckCircle2 className="w-4 h-4" /> : s.id}
            </div>
            {/* Label */}
            <span
              className={`text-[8px] tracking-[0.25em] font-display font-bold hidden sm:block text-center ${
                s.id === current ? "text-primary" : "text-muted-foreground/50"
              }`}
            >
              {s.label}
            </span>
          </div>
          {/* Connector */}
          {i < STEPS.length - 1 && (
            <div
              className={`h-px flex-1 transition-all duration-500 ${
                current > s.id ? "bg-primary" : "bg-border/40"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Pulsing Connecting Animation ─────────────────────────────────────────────
function ConnectingAnimation({ success }: { success: boolean }) {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Rings */}
        {!success && (
          <>
            <div
              className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"
              style={{ animationDuration: "1.5s" }}
            />
            <div
              className="absolute inset-4 rounded-full border border-primary/20 animate-ping"
              style={{ animationDuration: "2s", animationDelay: "0.3s" }}
            />
          </>
        )}
        {success && (
          <div
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: "rgba(0,230,118,0.6)" }}
          />
        )}
        {/* Center icon */}
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
            success
              ? "border-[#00E676] bg-[#00E676]/15"
              : "border-primary/50 bg-primary/10 glow-pulse"
          }`}
        >
          {success ? (
            <CheckCircle2
              className="w-10 h-10"
              style={{
                color: "#00E676",
                filter: "drop-shadow(0 0 12px rgba(0,230,118,0.7))",
              }}
            />
          ) : (
            <Shield
              className="w-10 h-10 text-primary"
              style={{ filter: "drop-shadow(0 0 12px rgba(0,163,255,0.7))" }}
              strokeWidth={1.5}
            />
          )}
        </div>
      </div>

      {success ? (
        <div className="flex flex-col items-center gap-2 text-center">
          <p
            className="text-xl font-black tracking-[0.25em] font-display"
            style={{
              color: "#00E676",
              textShadow: "0 0 20px rgba(0,230,118,0.5)",
            }}
          >
            PAIRED SUCCESSFULLY
          </p>
          <p className="text-sm text-muted-foreground font-body">
            Device is ready
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5">
            <Wifi className="w-4 h-4 text-primary animate-pulse" />
            <p className="text-sm font-bold tracking-[0.3em] text-primary font-display">
              CONNECTING...
            </p>
          </div>
          <p className="text-xs text-muted-foreground font-body">
            Establishing secure link to device
          </p>
        </div>
      )}
    </div>
  );
}

// ── Main DeviceSetup Page ─────────────────────────────────────────────────────
export function DeviceSetupPage() {
  const navigate = useNavigate();
  const { setDevices, setActiveDevice } = useRakshakStore();

  const [step, setStep] = useState<Step>(1);
  const [deviceId, setDeviceId] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [_connecting, setConnecting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pairedId, setPairedId] = useState("");
  const [pairedName, setPairedName] = useState("");
  const [idError, setIdError] = useState("");

  const idInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    if (step === 1) idInputRef.current?.focus();
  }, [step]);

  // Validate Device ID format
  const isValidId = DEVICE_ID_PATTERN.test(deviceId);

  const handleIdChange = (v: string) => {
    const formatted = v.toUpperCase().replace(/[^A-Z0-9-]/g, "");
    setDeviceId(formatted);
    if (idError) setIdError("");
  };

  const handleIdContinue = () => {
    if (!isValidId) {
      setIdError("INVALID FORMAT — MUST BE RKSH-XXXX");
      return;
    }
    setStep(2);
  };

  const handlePair = async () => {
    if (!name.trim()) return;
    setLoading(true);
    setStep(3);
    setConnecting(true);

    try {
      await pairDevice(deviceId, name.trim());
      const devices = await getDevices();
      setDevices(devices);
      setActiveDevice(deviceId);
    } catch {
      // Demo mode: use mock data on error
      setDevices(MOCK_DEVICES);
      setActiveDevice(deviceId);
    }

    // Show connecting animation, then success
    setTimeout(() => {
      setConnecting(false);
      setSuccess(true);
      setPairedId(deviceId);
      setPairedName(name.trim());
      setLoading(false);
    }, 1400);
  };

  const handleSkip = () => {
    setDevices(MOCK_DEVICES);
    setActiveDevice(MOCK_DEVICES[0].deviceId);
    navigate({ to: "/dashboard" });
  };

  const goBack = () => {
    if (step === 2) setStep(1);
    else if (step === 1) navigate({ to: "/" });
  };

  return (
    <div
      className="min-h-screen dot-grid-bg flex flex-col items-center justify-center px-5 py-10 relative overflow-hidden"
      data-ocid="setup.page"
    >
      {/* Corner accents */}
      <div
        className="fixed top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-primary/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-primary/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-primary/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-primary/20 pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-[420px] flex flex-col gap-6">
        {/* Back button */}
        <AnimatePresence>
          {step < 3 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              type="button"
              onClick={goBack}
              className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-primary transition-colors tracking-wider font-mono self-start"
              data-ocid="setup.back_button"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {step === 1 ? "BACK TO LOGIN" : "BACK"}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-1"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <h1 className="text-2xl font-black tracking-[0.2em] text-primary font-display">
              PAIR YOUR DEVICE
            </h1>
          </div>
          <p className="text-xs text-muted-foreground font-body">
            Connect your Rakshak unit to cloud control
          </p>
        </motion.div>

        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="px-2"
        >
          <StepIndicator current={step} />
        </motion.div>

        {/* Content card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="border border-border bg-card/70 backdrop-blur-sm"
        >
          <AnimatePresence mode="wait">
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="p-6 flex flex-col gap-5"
                data-ocid="setup.step1"
              >
                <div>
                  <p className="text-[9px] font-bold tracking-[0.4em] text-primary/80 font-display mb-0.5">
                    STEP 1 OF 3
                  </p>
                  <h2 className="text-lg font-black tracking-wider text-foreground font-display">
                    ENTER DEVICE ID
                  </h2>
                  <p className="text-xs text-muted-foreground font-body mt-1">
                    The unique identifier printed on your Rakshak unit label
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="device-id-input"
                    className="text-[9px] font-bold tracking-[0.35em] text-muted-foreground font-display"
                  >
                    DEVICE ID
                  </label>
                  <input
                    id="device-id-input"
                    ref={idInputRef}
                    type="text"
                    maxLength={9}
                    placeholder="RKSH-XXXX"
                    value={deviceId}
                    onChange={(e) => handleIdChange(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleIdContinue()}
                    className="w-full px-4 py-3 text-lg font-mono bg-background border border-input text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary tracking-[0.3em] transition-colors text-center"
                    data-ocid="setup.device_id_input"
                  />
                  {/* Validation feedback */}
                  <div className="flex items-center justify-between">
                    <AnimatePresence>
                      {idError ? (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-[10px] font-bold tracking-wider text-destructive font-display"
                          data-ocid="setup.id_error_state"
                        >
                          {idError}
                        </motion.p>
                      ) : isValidId ? (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-[10px] font-bold tracking-wider font-display"
                          style={{ color: "#00E676" }}
                        >
                          ✓ VALID FORMAT
                        </motion.p>
                      ) : (
                        <p className="text-[10px] text-muted-foreground/50 font-mono">
                          Format: RKSH-XXXX
                        </p>
                      )}
                    </AnimatePresence>
                  </div>
                  <p className="text-[10px] text-muted-foreground/60 font-body mt-1">
                    The Device ID begins with{" "}
                    <span className="font-mono text-muted-foreground">
                      RKSH-
                    </span>{" "}
                    and is printed on the label on your Rakshak unit.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleIdContinue}
                  disabled={!isValidId}
                  className="w-full py-3 flex items-center justify-center gap-2
                    text-sm font-black tracking-[0.3em] font-display
                    bg-primary text-primary-foreground
                    hover:opacity-90 active:scale-[0.98]
                    disabled:opacity-40 disabled:cursor-not-allowed
                    transition-all duration-200"
                  style={{
                    boxShadow: isValidId
                      ? "0 0 16px rgba(0,163,255,0.3)"
                      : "none",
                  }}
                  data-ocid="setup.continue_button"
                >
                  CONTINUE
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
                className="p-6 flex flex-col gap-5"
                data-ocid="setup.step2"
              >
                <div>
                  <p className="text-[9px] font-bold tracking-[0.4em] text-primary/80 font-display mb-0.5">
                    STEP 2 OF 3
                  </p>
                  <h2 className="text-lg font-black tracking-wider text-foreground font-display">
                    NAME YOUR DEVICE
                  </h2>
                  <p className="text-xs text-muted-foreground font-body mt-1">
                    Pairing:{" "}
                    <span className="font-mono text-primary">{deviceId}</span>
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="device-name-input"
                    className="text-[9px] font-bold tracking-[0.35em] text-muted-foreground font-display"
                  >
                    DEVICE NAME
                  </label>
                  <input
                    id="device-name-input"
                    type="text"
                    placeholder="e.g. Home, Office, Warehouse"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && name.trim() && handlePair()
                    }
                    className="w-full px-4 py-2.5 text-sm bg-background border border-input text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors font-body"
                    data-ocid="setup.device_name_input"
                  />
                </div>

                {/* Quick suggestions */}
                <div className="flex flex-col gap-2">
                  <p className="text-[9px] tracking-[0.3em] text-muted-foreground/60 font-display font-bold">
                    QUICK NAMES
                  </p>
                  <div
                    className="flex flex-wrap gap-2"
                    data-ocid="setup.name_suggestions"
                  >
                    {NAME_SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setName(s)}
                        className={`px-3 py-1.5 text-xs font-bold tracking-wider font-display border transition-all duration-200 ${
                          name === s
                            ? "border-primary bg-primary/15 text-primary"
                            : "border-border/60 bg-transparent text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                        data-ocid={`setup.name_suggestion.${s.toLowerCase()}`}
                      >
                        {s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePair}
                  disabled={!name.trim() || loading}
                  className="w-full py-3 flex items-center justify-center gap-2
                    text-sm font-black tracking-[0.3em] font-display
                    bg-primary text-primary-foreground
                    hover:opacity-90 active:scale-[0.98]
                    disabled:opacity-40 disabled:cursor-not-allowed
                    transition-all duration-200"
                  style={{
                    boxShadow: name.trim()
                      ? "0 0 16px rgba(0,163,255,0.3)"
                      : "none",
                  }}
                  data-ocid="setup.pair_button"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent animate-spin rounded-full" />
                      PAIRING...
                    </span>
                  ) : (
                    <>
                      PAIR DEVICE
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {/* STEP 3 — Connecting */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="p-6 flex flex-col gap-5"
                data-ocid="setup.step3"
              >
                <div className="text-center">
                  <p className="text-[9px] font-bold tracking-[0.4em] text-primary/80 font-display mb-0.5">
                    STEP 3 OF 3
                  </p>
                  <h2 className="text-lg font-black tracking-wider text-foreground font-display">
                    {success ? "DEVICE PAIRED" : "CONNECTING TO CLOUD"}
                  </h2>
                </div>

                <ConnectingAnimation success={success} />

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    {/* Device summary */}
                    <div
                      className="border border-border/60 bg-background p-4 flex items-center gap-3"
                      data-ocid="setup.success_state"
                    >
                      <div
                        className="w-10 h-10 flex items-center justify-center border-2 flex-shrink-0"
                        style={{
                          borderColor: "#00E676",
                          backgroundColor: "rgba(0,230,118,0.1)",
                        }}
                      >
                        <Shield
                          className="w-5 h-5"
                          style={{ color: "#00E676" }}
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-sm font-black tracking-widest font-display"
                          style={{ color: "#00E676" }}
                        >
                          {pairedName.toUpperCase()}
                        </p>
                        <p className="text-[11px] font-mono text-muted-foreground">
                          {pairedId}
                        </p>
                      </div>
                      <div
                        className="ml-auto text-[9px] font-bold tracking-widest font-display px-2 py-1"
                        style={{
                          color: "#00E676",
                          backgroundColor: "rgba(0,230,118,0.1)",
                          border: "1px solid rgba(0,230,118,0.3)",
                        }}
                      >
                        ONLINE
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate({ to: "/dashboard" })}
                      className="w-full py-3 text-sm font-black tracking-[0.3em] font-display
                        bg-primary text-primary-foreground
                        hover:opacity-90 active:scale-[0.98]
                        transition-all duration-200"
                      style={{ boxShadow: "0 0 20px rgba(0,163,255,0.35)" }}
                      data-ocid="setup.dashboard_button"
                    >
                      GO TO DASHBOARD
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Skip link */}
        {step < 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <button
              type="button"
              onClick={handleSkip}
              className="text-[11px] text-muted-foreground/60 hover:text-muted-foreground font-mono tracking-wider transition-colors underline underline-offset-2"
              data-ocid="setup.skip_button"
            >
              Skip for now (use demo device)
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
