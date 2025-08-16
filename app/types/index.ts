export interface Event {
    id: string,
    imageUrl: string,
    date: Date,
    time: string,
    title: string,
    location: string,
    host: string,
    description: string,
    isRsvpd?: boolean | undefined
}


export interface User {
    epccId: string,
    firstName: string,
    lastName: string,
    epccEmail: string,
    points: number,
    eventsAttended: number,
    isAdmin: boolean,
}

export interface Rsvp {
    eventId: string,
    rsvpDate: string,
}