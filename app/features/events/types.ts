
export type EventFields = 'rsvps' | 'attendance' | 'feedback' | 'base' | 'all' | 'code'

export type EventType = "meeting" | "workshop" | "external" | "major" | "recurring" | "hackathon" | "datathon" | "extra_credit"

type Boolean = 1 | 0

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
    requireSurvey: Boolean,
    type: EventType;
    externalLink: string,
    semesterCreatedId: number

}


export type EventIdentifiers = Pick<Event, 'id' | 'title'>

export type EventWithStats = Pick<Event, 'title' | 'id' | 'type'> & {
    date: string,
    rsvps: number,
    attended: number
}




export type EventRating = EventIdentifiers & { avgRating: number }

export type RatedEvents = {
    highestRated: EventRating
    lowestRated: EventRating
}

export type RatedEvent = {
    id: number,
    title: string,
    avgRating: number,
    semesterCreatedId: number,
    isCurrent: number
}


export type EventsStats = {
    totalEvents: number,
    numSemEvents: number,
    highestRated: RatedEvent,
    lowestRated: RatedEvent
}

export interface EventFeedback {
    question1: number,
    question2: number,
    question3: number,
    question4: number,
    question5?: string | null,
}
