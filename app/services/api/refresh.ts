// app/lib/auth-refresh.ts
// Coordinates refresh across ALL tabs using BroadcastChannel + localStorage.

const EXPIRY_MS = 10_000; // consider a refresh "in-flight" for up to 10s
const FLAG_KEY = "auth:refreshing-ts";
const CH_NAME = "auth-refresh";

let inThisTab = false;
let listeners: Array<(t: string | null) => void> = [];
const ch = typeof window !== "undefined" && "BroadcastChannel" in window
    ? new BroadcastChannel(CH_NAME)
    : null;

if (ch) {
    ch.onmessage = (e: MessageEvent) => {
        const msg = e.data;
        if (!msg || typeof msg !== "object") return;
        if (msg.type === "refresh-start") {
            // another tab started a refresh: mark flag locally
            localStorage.setItem(FLAG_KEY, String(Date.now()));
        }
        if (msg.type === "refresh-done") {
            // clear flag and notify waiters with new token (or null on failure)
            localStorage.removeItem(FLAG_KEY);
            listeners.forEach((cb) => cb(msg.accessToken ?? null));
            listeners = [];
        }
    };
}

export function beginGlobalRefresh() {
    inThisTab = true;
    localStorage.setItem(FLAG_KEY, String(Date.now()));
    ch?.postMessage({ type: "refresh-start" });
}

export function endGlobalRefresh(newAccessToken?: string | null) {
    inThisTab = false;
    localStorage.removeItem(FLAG_KEY);
    ch?.postMessage({ type: "refresh-done", accessToken: newAccessToken ?? null });
    // Also notify same-tab listeners in case BroadcastChannel is unavailable
    listeners.forEach((cb) => cb(newAccessToken ?? null));
    listeners = [];
}

export function isGlobalRefreshing(): boolean {
    if (inThisTab) return true;
    const ts = Number(localStorage.getItem(FLAG_KEY) || 0);
    return !!ts && Date.now() - ts < EXPIRY_MS;
}

// Subscribe to the next "refresh-done" message. Returns an unsubscribe.
export function onRefreshDone(cb: (t: string | null) => void) {
    listeners.push(cb);
    return () => {
        listeners = listeners.filter((x) => x !== cb);
    };
}
