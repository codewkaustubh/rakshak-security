import { MOCK_USER } from "@/api/mockData";
import { useRakshakStore } from "@/store/useRakshakStore";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type FormEvent, useState } from "react";

// ── Google G Icon ────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ── Shield SVG Logo ──────────────────────────────────────────────────────────
function RakshakShield({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer pulse ring */}
      <div className="absolute inset-0 rounded-full border border-primary/15 glow-pulse" />
      {/* Mid ring */}
      <div
        className="absolute inset-[10px] rounded-full border border-primary/25 animate-pulse"
        style={{ animationDuration: "3s" }}
      />
      {/* Inner bg */}
      <div className="absolute inset-[22px] rounded-full bg-primary/8" />
      {/* Shield icon */}
      <ShieldCheck
        className="w-14 h-14 text-primary relative z-10"
        strokeWidth={1.5}
        style={{ filter: "drop-shadow(0 0 16px rgba(0,163,255,0.75))" }}
      />
    </div>
  );
}

type AuthMode = "signin" | "register";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// ── Main Login Page ──────────────────────────────────────────────────────────
export function LoginPage() {
  const navigate = useNavigate();
  const { setUser, setHasDevices } = useRakshakStore();

  const [mode, setMode] = useState<AuthMode>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [fieldError, setFieldError] = useState("");

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const update =
    (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const triggerShake = (msg: string) => {
    setFieldError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 500);
    setTimeout(() => setFieldError(""), 3000);
  };

  const mockLogin = () => {
    setUser(MOCK_USER);
    setHasDevices(true);
    navigate({ to: "/dashboard" });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.email.trim()) {
      triggerShake("EMAIL ADDRESS IS REQUIRED");
      return;
    }
    if (!form.password) {
      triggerShake("PASSWORD IS REQUIRED");
      return;
    }
    if (mode === "register") {
      if (!form.name.trim()) {
        triggerShake("DISPLAY NAME IS REQUIRED");
        return;
      }
      if (form.password !== form.confirmPassword) {
        triggerShake("PASSWORDS DO NOT MATCH");
        return;
      }
    }
    setLoading(true);
    // Demo mode: bypass real auth
    setTimeout(() => {
      setLoading(false);
      mockLogin();
    }, 800);
  };

  const isRegister = mode === "register";

  return (
    <div
      className="min-h-screen dot-grid-bg flex flex-col items-center justify-center px-5 py-10 relative overflow-hidden"
      data-ocid="login.page"
    >
      {/* Scanline texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 36px)",
        }}
      />
      {/* Corner accent lines */}
      <div
        className="fixed top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-primary/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-primary/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/20 pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-[380px] flex flex-col items-center gap-7">
        {/* ── Animated Logo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex flex-col items-center gap-4"
          data-ocid="login.logo"
        >
          <RakshakShield className="w-28 h-28" />

          <div className="text-center">
            <h1 className="text-5xl font-black tracking-[0.3em] text-primary font-display leading-none">
              RAKSHAK
            </h1>
            <div className="flex items-center gap-2 justify-center mt-1.5">
              <div className="h-px flex-1 bg-primary/30" />
              <p className="text-[10px] tracking-[0.45em] text-muted-foreground font-mono font-semibold">
                CLOUD SECURITY SYSTEM
              </p>
              <div className="h-px flex-1 bg-primary/30" />
            </div>
          </div>
        </motion.div>

        {/* ── Auth Panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.25,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="w-full"
        >
          <div className="border border-border bg-card/70 backdrop-blur-sm">
            {/* Panel header stripe */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-card">
              <div className="w-1.5 h-1.5 bg-primary" />
              <span className="text-[10px] font-bold tracking-[0.45em] text-primary/90 font-display">
                {isRegister ? "CREATE ACCOUNT" : "SECURE AUTHENTICATION"}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                initial={{ opacity: 0, x: isRegister ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRegister ? -20 : 20 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmit}
                className="p-5 flex flex-col gap-4"
                data-ocid="login.form"
              >
                {/* Name field (register only) */}
                {isRegister && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="flex flex-col gap-1.5"
                  >
                    <label
                      htmlFor="login-name"
                      className="text-[9px] font-bold tracking-[0.35em] text-muted-foreground font-display"
                    >
                      DISPLAY NAME
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                      <input
                        id="login-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={update("name")}
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-background border border-input text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-body"
                        data-ocid="login.name_input"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="flex flex-col gap-1.5"
                >
                  <label
                    htmlFor="login-email"
                    className="text-[9px] font-bold tracking-[0.35em] text-muted-foreground font-display"
                  >
                    EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                    <input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      placeholder="operator@domain.com"
                      value={form.email}
                      onChange={update("email")}
                      className="w-full pl-9 pr-4 py-2.5 text-sm bg-background border border-input text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-body"
                      data-ocid="login.email_input"
                    />
                  </div>
                </motion.div>

                {/* Password */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  className="flex flex-col gap-1.5"
                >
                  <label
                    htmlFor="login-password"
                    className="text-[9px] font-bold tracking-[0.35em] text-muted-foreground font-display"
                  >
                    PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete={
                        isRegister ? "new-password" : "current-password"
                      }
                      placeholder="••••••••"
                      value={form.password}
                      onChange={update("password")}
                      className="w-full pl-9 pr-10 py-2.5 text-sm bg-background border border-input text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-body"
                      data-ocid="login.password_input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      data-ocid="login.toggle_password"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Confirm Password (register only) */}
                {isRegister && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 }}
                    className="flex flex-col gap-1.5"
                  >
                    <label
                      htmlFor="login-confirm"
                      className="text-[9px] font-bold tracking-[0.35em] text-muted-foreground font-display"
                    >
                      CONFIRM PASSWORD
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                      <input
                        id="login-confirm"
                        type={showConfirm ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        value={form.confirmPassword}
                        onChange={update("confirmPassword")}
                        className="w-full pl-9 pr-10 py-2.5 text-sm bg-background border border-input text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-body"
                        data-ocid="login.confirm_password_input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
                        aria-label={
                          showConfirm ? "Hide password" : "Show password"
                        }
                      >
                        {showConfirm ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Inline error */}
                <AnimatePresence>
                  {fieldError && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`flex items-center gap-2 px-3 py-2 border border-destructive/60 bg-destructive/10 ${shake ? "shake" : ""}`}
                      data-ocid="login.error_state"
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
                      <span className="text-[10px] font-bold tracking-[0.25em] text-destructive font-display">
                        {fieldError}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Forgot password (sign-in only) */}
                {!isRegister && (
                  <div className="text-right -mt-1">
                    <button
                      type="button"
                      className="text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-wider font-mono"
                      data-ocid="login.forgot_password"
                      onClick={mockLogin}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Primary submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 text-sm font-black tracking-[0.35em] font-display
                    bg-primary text-primary-foreground
                    hover:opacity-90 active:scale-[0.98]
                    disabled:opacity-60 disabled:cursor-not-allowed
                    transition-all duration-200
                    relative overflow-hidden"
                  style={{ boxShadow: "0 0 20px rgba(0,163,255,0.35)" }}
                  data-ocid="login.submit_button"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent animate-spin rounded-full" />
                      AUTHENTICATING...
                    </span>
                  ) : isRegister ? (
                    "CREATE ACCOUNT"
                  ) : (
                    "SIGN IN"
                  )}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[10px] text-muted-foreground font-mono tracking-widest">
                    OR
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Google Sign-In */}
                <button
                  type="button"
                  onClick={mockLogin}
                  className="w-full py-2.5 flex items-center justify-center gap-2.5
                    border border-border bg-transparent text-foreground text-sm font-medium
                    hover:border-primary/40 hover:bg-primary/5
                    active:scale-[0.98] transition-all duration-200 font-body"
                  data-ocid="login.google_button"
                >
                  <GoogleIcon />
                  <span>SIGN IN WITH GOOGLE</span>
                </button>

                {/* Mode toggle */}
                <p className="text-center text-[11px] text-muted-foreground font-body">
                  {isRegister
                    ? "Already have an account? "
                    : "Don't have an account? "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode(isRegister ? "signin" : "register");
                      setFieldError("");
                    }}
                    className="text-primary font-bold hover:underline tracking-wider"
                    data-ocid="login.toggle_mode"
                  >
                    {isRegister ? "SIGN IN" : "REGISTER"}
                  </button>
                </p>
              </motion.form>
            </AnimatePresence>
          </div>

          {/* Demo note */}
          <p className="text-center text-[10px] text-muted-foreground/50 font-mono mt-3 tracking-wider">
            DEMO MODE — No real auth required
          </p>
        </motion.div>

        {/* Footer tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-[9px] text-muted-foreground/40 font-mono tracking-[0.35em]"
        >
          SECURE · AES-256 ENCRYPTED · PROTECTED
        </motion.p>
      </div>
    </div>
  );
}
