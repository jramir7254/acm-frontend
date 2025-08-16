// app/features/auth/services/token-store.ts
const KEY = "authToken";
const USER = "user";

export const tokenStore = {
    get(): string | null {
        return localStorage.getItem(KEY) || sessionStorage.getItem(KEY);
    },
    set(token: string, { persist = "local" as "local" | "session" } = {}) {
        this.clear();
        if (persist === "local") localStorage.setItem(KEY, token);
        else sessionStorage.setItem(KEY, token);
    },
    clear() {
        localStorage.removeItem(KEY);
        sessionStorage.removeItem(KEY);
        localStorage.removeItem(USER);
        sessionStorage.removeItem(USER);
    },
    currentPersist(): "local" | "session" {
        return localStorage.getItem(KEY) ? "local" : "session";
    }
};
