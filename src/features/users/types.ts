import type { Event } from "../events/type"


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

export type DetailedUser = BaseUser & {
    createdAt: string,
    updatedAt: string,
}

export type Student = User & {
    course: string
    attendance: number,
    missing: number
}


export type UserEvent = Pick<Event, | 'title' | 'startAt' | 'endAt' | 'semesterCreatedId'> & {
    eventId: number
    checkedInAt: string | null
    complete: boolean | null
}