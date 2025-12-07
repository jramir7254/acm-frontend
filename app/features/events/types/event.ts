
export type EventFields = 'rsvps' | 'attendance' | 'feedback' | 'base' | 'all'

export interface Event {
    id: number,
    imageUrl: string,
    startAt: string,
    endAt: string,
    code: string,
    time: string,
    title: string,
    location: string,
    host: string,
    description: string,
    past: boolean,
    isRsvpd?: boolean | undefined
}


export interface EventFeedback {
    question1: number,
    question2: number,
    question3: number,
    question4: number,
    question5?: string | null,
}
