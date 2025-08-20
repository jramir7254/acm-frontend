export type Event = {
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
