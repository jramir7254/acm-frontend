

export interface User {
    id: number
    epccId: string
    epccEmail: string
    firstName: string,
    lastName: string,
    emailVerifiedAt: string,
    accountComplete: boolean
}

export type BaseUser = User & {
    role: string
    courseId: number,
    fullName: string,
}

export type Student = User & {
    course: string
    attendance: number,
    missing: number
}