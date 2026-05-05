import { useRakshakStore } from "@/store/useRakshakStore";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";

// ── Device Switcher ───────────────────────────────────────────────────────────────
function DeviceSwitcher() {
  const [open, setOpen] = useState(false);
  const devices = useRakshakStore((s) => s.devices);
  const activeDeviceId = useRakshakStore((s) => s.activeDeviceId);
  const setActiveDevice = useRakshakStore((s) => s.setActiveDevice);
  const status = useRakshakStore((s) => s.status);

  const active = devices.find((d) => d.deviceId === activeDeviceId);
  const isOnline = status?.online ?? false;

  return (
    <div className="relative" data-ocid="header.device_switcher">
      <button
        type="button"
        className="flex items-center gap-2 px-2 py-1.5 rounded border border-[#1E2A45] bg-[#141929] hover:bg-[#1a2035] transition-colors"
        onClick={() => setOpen((o) => !o)}
      >
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: isOnline ? "#00E676" : "#FF3B3B" }}
        />
        <span className="text-xs font-bold tracking-wider font-display uppercase text-foreground max-w-[80px] truncate">
          {active?.name ?? "No Device"}
        </span>
        <ChevronDown className="w-3 h-3 text-muted-foreground" />
      </button>

      {open && (
        <div
          className="absolute top-full mt-1 left-0 min-w-[160px] rounded border border-[#1E2A45] bg-[#141929] shadow-xl z-50"
          data-ocid="header.device_dropdown"
        >
          {devices.map((d) => (
            <button
              type="button"
              key={d.deviceId}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-[#1E2A45] transition-colors text-left
                ${d.deviceId === activeDeviceId ? "text-[#00A3FF]" : "text-foreground"}`}
              onClick={() => {
                setActiveDevice(d.deviceId);
                setOpen(false);
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: d.online ? "#00E676" : "#FF3B3B" }}
              />
              <span className="font-bold tracking-wider font-display uppercase">
                {d.name}
              </span>
              <span className="ml-auto text-muted-foreground font-mono">
                {d.deviceId}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── User Menu ─────────────────────────────────────────────────────────────────
function UserMenu() {
  const [open, setOpen] = useState(false);
  const user = useRakshakStore((s) => s.user);
  const logout = useRakshakStore((s) => s.logout);
  const navigate = useNavigate();

  return (
    <div className="relative" data-ocid="header.user_menu">
      <button
        type="button"
        className="w-8 h-8 rounded-full border border-[#1E2A45] bg-[#1E2A45] flex items-center justify-center hover:border-[#00A3FF] transition-colors"
        onClick={() => setOpen((o) => !o)}
        aria-label="User menu"
      >
        <User className="w-4 h-4 text-muted-foreground" />
      </button>

      {open && (
        <div
          className="absolute top-full mt-1 right-0 min-w-[160px] rounded border border-[#1E2A45] bg-[#141929] shadow-xl z-50"
          data-ocid="header.user_dropdown"
        >
          {user && (
            <div className="px-3 py-2 border-b border-[#1E2A45]">
              <p className="text-xs font-bold text-foreground truncate">
                {user.displayName}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          )}
          <Link
            to="/settings"
            className="flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-[#1E2A45] transition-colors"
            onClick={() => setOpen(false)}
            data-ocid="header.settings_link"
          >
            <Settings className="w-3.5 h-3.5" />
            Settings
          </Link>
          <button
            type="button"
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#FF3B3B] hover:bg-[#1E2A45] transition-colors"
            onClick={() => {
              logout();
              navigate({ to: "/" });
              setOpen(false);
            }}
            data-ocid="header.signout_button"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

// ── Nav Items ───────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {
    to: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    ocid: "nav.dashboard",
  },
  { to: "/alerts", icon: Bell, label: "Alerts", ocid: "nav.alerts" },
  { to: "/settings", icon: Settings, label: "Settings", ocid: "nav.settings" },
] as const;

interface AppLayoutProps {
  children: React.ReactNode;
}

// ── AppLayout ─────────────────────────────────────────────────────────────────
export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const status = useRakshakStore((s) => s.status);
  const lastPoll = useRakshakStore((s) => s.lastPoll);
  const unreadAlertCount = useRakshakStore((s) => s.unreadAlertCount);

  const getLastSeenText = () => {
    if (!lastPoll) return "";
    const mins = Math.floor((Date.now() - lastPoll.getTime()) / 60000);
    if (mins < 1) return "Just now";
    return `${mins}m ago`;
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#0B0F1C" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-4 py-2.5 border-b"
        style={{
          backgroundColor: "#141929",
          borderColor: "#1E2A45",
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(30,42,69,0.3) 0px, rgba(30,42,69,0.3) 1px, transparent 1px, transparent 24px)",
        }}
        data-ocid="header.bar"
      >
        {/* Logo + brand */}
        <div className="flex items-center gap-2" data-ocid="header.logo">
          <div
            className="w-7 h-7 flex items-center justify-center border"
            style={{
              borderColor: "#00A3FF",
              backgroundColor: "rgba(0,163,255,0.1)",
            }}
          >
            <Shield
              className="w-4 h-4"
              style={{ color: "#00A3FF" }}
              fill="currentColor"
            />
          </div>
          <span
            className="text-sm font-bold tracking-[0.25em] font-display uppercase"
            style={{ color: "#00A3FF" }}
          >
            RAKSHAK
          </span>
        </div>

        {/* Center: device switcher */}
        <DeviceSwitcher />

        {/* Right: connection + bell + avatar */}
        <div className="flex items-center gap-3">
          {/* Online status */}
          <div
            className="hidden sm:flex items-center gap-1.5"
            data-ocid="header.connection_status"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: status?.online ? "#00E676" : "#FF3B3B",
                boxShadow: status?.online
                  ? "0 0 6px #00E676"
                  : "0 0 6px #FF3B3B",
              }}
            />
            <span
              className="text-[10px] font-bold tracking-widest font-display uppercase"
              style={{ color: status?.online ? "#00E676" : "#FF3B3B" }}
            >
              {status?.online ? "ONLINE" : "OFFLINE"}
            </span>
            {!status?.online && lastPoll && (
              <span className="text-[10px] text-muted-foreground font-mono">
                · {getLastSeenText()}
              </span>
            )}
          </div>

          {/* Bell with unread badge */}
          <Link
            to="/alerts"
            className="relative p-1.5 rounded hover:bg-[#1E2A45] transition-colors"
            data-ocid="header.alerts_bell"
          >
            <Bell className="w-4 h-4 text-muted-foreground" />
            {unreadAlertCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={{ backgroundColor: "#FF3B3B", color: "#fff" }}
                data-ocid="header.unread_badge"
              >
                {unreadAlertCount > 9 ? "9+" : unreadAlertCount}
              </span>
            )}
          </Link>

          <UserMenu />
        </div>
      </header>

      {/* Desktop sidebar + main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <aside
          className="hidden md:flex flex-col w-14 lg:w-48 border-r flex-shrink-0"
          style={{ backgroundColor: "#141929", borderColor: "#1E2A45" }}
          data-ocid="nav.sidebar"
        >
          <nav className="flex flex-col pt-4">
            {NAV_ITEMS.map(({ to, icon: Icon, label, ocid }) => {
              const isActive = location.pathname === to;
              const isAlerts = to === "/alerts";
              return (
                <Link
                  key={to}
                  to={to}
                  className={`relative flex items-center gap-3 px-3 lg:px-4 py-3 mx-2 mb-1 transition-colors duration-150
                    ${isActive ? "text-[#00A3FF]" : "text-muted-foreground hover:text-foreground hover:bg-[#1E2A45]"}`}
                  style={
                    isActive
                      ? {
                          backgroundColor: "rgba(0,163,255,0.1)",
                          borderLeft: "2px solid #00A3FF",
                        }
                      : {}
                  }
                  data-ocid={ocid}
                >
                  <div className="relative flex-shrink-0">
                    <Icon className="w-4 h-4" />
                    {isAlerts && unreadAlertCount > 0 && (
                      <span
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center text-[7px] font-bold"
                        style={{ backgroundColor: "#FF3B3B", color: "#fff" }}
                      >
                        {unreadAlertCount}
                      </span>
                    )}
                  </div>
                  <span className="hidden lg:block text-xs font-bold tracking-wider font-display uppercase">
                    {label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div
            className="mt-auto p-2 border-t text-[10px] text-muted-foreground font-mono text-center"
            style={{ borderColor: "#1E2A45" }}
          >
            <span className="hidden lg:block">v2.0.0</span>
          </div>
        </aside>

        {/* Main */}
        <main
          className="flex-1 overflow-y-auto pb-16 md:pb-0"
          style={{ backgroundColor: "#0B0F1C" }}
        >
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 flex md:hidden border-t z-50"
        style={{ backgroundColor: "#141929", borderColor: "#1E2A45" }}
        data-ocid="nav.bottom"
      >
        {NAV_ITEMS.map(({ to, icon: Icon, label, ocid }) => {
          const isActive = location.pathname === to;
          const isAlerts = to === "/alerts";
          return (
            <Link
              key={to}
              to={to}
              className={`relative flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-colors duration-150
                ${isActive ? "text-[#00A3FF]" : "text-muted-foreground hover:text-foreground"}`}
              data-ocid={ocid}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {isAlerts && unreadAlertCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold"
                    style={{ backgroundColor: "#FF3B3B", color: "#fff" }}
                  >
                    {unreadAlertCount > 9 ? "9+" : unreadAlertCount}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-bold tracking-widest font-display uppercase">
                {label}
              </span>
              {isActive && (
                <span
                  className="absolute bottom-0 w-8 h-0.5"
                  style={{ backgroundColor: "#00A3FF" }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

// Legacy Layout export for backwards compatibility
export const Layout = AppLayout;
