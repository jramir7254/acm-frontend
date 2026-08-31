

export type AuthMode = "login" | "register" | 'reset' | 'forgot' | 'verify'


export type Purpose = 'verify' | 'reset'

export interface AuthResponse {
    token: string,
    id: number;
    epccEmail: string;
    purpose: Purpose;
    epccId: string;
    emailVerifiedAt: string | null;
    role: string;
}



