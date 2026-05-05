import { AlarmOverlay } from "@/components/AlarmOverlay";
import { AppLayout } from "@/components/Layout";
import { ToastContainer } from "@/components/ToastContainer";
import { useRakshakStore } from "@/store/useRakshakStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
} from "@tanstack/react-router";
import { Suspense, lazy, useEffect } from "react";

// Lazy-load pages
const LoginPage = lazy(() =>
  import("@/pages/Login").then((m) => ({ default: m.LoginPage })),
);
const DeviceSetupPage = lazy(() =>
  import("@/pages/DeviceSetup").then((m) => ({ default: m.DeviceSetupPage })),
);
const DashboardPage = lazy(() =>
  import("@/pages/Dashboard").then((m) => ({ default: m.DashboardPage })),
);
const AlertsPage = lazy(() =>
  import("@/pages/Alerts").then((m) => ({ default: m.AlertsPage })),
);
const SettingsPage = lazy(() =>
  import("@/pages/Settings").then((m) => ({ default: m.SettingsPage })),
);

const PageLoader = () => (
  <div
    className="flex-1 flex items-center justify-center min-h-screen"
    style={{ backgroundColor: "#0B0F1C" }}
  >
    <div
      className="w-8 h-8 border-2 border-t-transparent animate-spin"
      style={{ borderColor: "#00A3FF", borderTopColor: "transparent" }}
    />
  </div>
);

// Root route
const rootRoute = createRootRoute({
  component: () => {
    useEffect(() => {
      document.documentElement.classList.add("dark");
    }, []);
    const alarm = useRakshakStore((s) => s.alarm);
    return (
      <>
        <Outlet />
        {alarm && <AlarmOverlay />}
        <ToastContainer />
      </>
    );
  },
});

// Login (no layout) — redirect to dashboard if already authenticated
function LoginRouteComponent() {
  const isAuthenticated = useRakshakStore((s) => s.isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);
  return (
    <Suspense fallback={<PageLoader />}>
      <LoginPage />
    </Suspense>
  );
}

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LoginRouteComponent,
});

// Device Setup (no layout)
const setupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/setup",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DeviceSetupPage />
    </Suspense>
  ),
});

// Dashboard
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <AppLayout>
      <Suspense fallback={<PageLoader />}>
        <DashboardPage />
      </Suspense>
    </AppLayout>
  ),
});

// Alerts
const alertsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/alerts",
  component: () => (
    <AppLayout>
      <Suspense fallback={<PageLoader />}>
        <AlertsPage />
      </Suspense>
    </AppLayout>
  ),
});

// Settings
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => (
    <AppLayout>
      <Suspense fallback={<PageLoader />}>
        <SettingsPage />
      </Suspense>
    </AppLayout>
  ),
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  setupRoute,
  dashboardRoute,
  alertsRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 5000 },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
