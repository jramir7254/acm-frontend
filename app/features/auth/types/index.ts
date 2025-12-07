

export type AuthMode = "login" | "register" | 'reset' | 'forgot' | 'verify'


export type Purpose = 'verify' | 'reset'

export interface AuthResponse {
    token: string,
    epccId: string,
    purpose?: Purpose
}



