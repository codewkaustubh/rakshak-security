import { getDeviceLogs, getDeviceStatus } from "@/api/rakshak";
import { useRakshakStore } from "@/store/useRakshakStore";
import type { AlarmEvent } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

export function useDeviceStatus(deviceId: string | null) {
  const { setStatus, setLoading } = useRakshakStore();
  const status = useRakshakStore((s) => s.status);
  const [error, setError] = useState<string | null>(null);
  const isLoading = useRakshakStore((s) => s.isLoading);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetch = useCallback(async () => {
    if (!deviceId) return;
    try {
      const data = await getDeviceStatus(deviceId);
      setStatus(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    }
  }, [deviceId, setStatus]);

  useEffect(() => {
    if (!deviceId) return;
    setLoading(true);
    fetch().finally(() => setLoading(false));
    intervalRef.current = setInterval(fetch, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [deviceId, fetch, setLoading]);

  return { status, isLoading, error };
}

export function useDeviceLogs(deviceId: string | null) {
  const { appendLogs } = useRakshakStore();
  const logs = useRakshakStore((s) => s.logs);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!deviceId) return;
    setIsLoading(true);
    getDeviceLogs(deviceId)
      .then((fetched) => appendLogs(fetched))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [deviceId, appendLogs]);

  return { logs, isLoading };
}

export function useAuthGuard() {
  const isAuthenticated = useRakshakStore((s) => s.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  return { isAuthenticated };
}

export function useAlarm() {
  const alarm = useRakshakStore((s) => s.alarm);
  const triggerAlarm = useRakshakStore((s) => s.triggerAlarm);
  const clearAlarm = useRakshakStore((s) => s.clearAlarm);

  const trigger = useCallback(
    (event: AlarmEvent) => triggerAlarm(event),
    [triggerAlarm],
  );

  return { alarm, triggerAlarm: trigger, clearAlarm };
}

export function useToast() {
  const addToast = useRakshakStore((s) => s.addToast);
  const removeToast = useRakshakStore((s) => s.removeToast);
  const toasts = useRakshakStore((s) => s.toasts);

  return { toasts, addToast, removeToast };
}
