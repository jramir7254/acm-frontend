
export type EventFields = 'rsvps' | 'attendance' | 'feedback' | 'base' | 'all'

export interface Event {
    id: number,
    imageUrl: string,
    startAt: string,
    endAt: string,
    code: string,
    time: string,
    type: "meeting" | "workshop" | "external" | "major" | "recurring" | "hackathon" | "datathon" | "extra_credit";
    externalLink: string,
    title: string,
    location: string,
    host: string,
    description: string,
}


export interface EventFeedback {
    question1: number,
    question2: number,
    question3: number,
    question4: number,
    question5?: string | null,
}
