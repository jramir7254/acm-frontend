export interface User {
    epccId: string,
    firstName: string,
    lastName: string,
    epccEmail: string,
    points: number,
    eventsAttended: number,
    accountComplete: boolean,
    permissions: string[],
    role: string,
    isAdmin: boolean,
}