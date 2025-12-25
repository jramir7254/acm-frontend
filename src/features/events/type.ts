
export type EventFields = 'rsvps' | 'attendance' | 'feedback' | 'base' | 'all' | 'code'

export type EventType = "meeting" | "workshop" | "external" | "major" | "recurring" | "hackathon" | "datathon" | "extra_credit"

export interface Event {
    id: number,
    title: string,
    location: string,
    host: string,
    description: string,
    startAt: string,
    endAt: string,
    imageUrl: string,
    code: string,
    type: EventType;
    externalLink: string,
}


export type EventIdentifiers = Pick<Event, 'id' | 'title'>



export type EventRating = EventIdentifiers & { avgRating: number }

export type RatedEvents = {
    highestRated: EventRating
    lowestRated: EventRating
}

export interface EventFeedback {
    question1: number,
    question2: number,
    question3: number,
    question4: number,
    question5?: string | null,
}
