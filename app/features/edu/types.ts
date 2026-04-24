
export interface Course {
    id: number,
    instructorFirstName: string
    instructorLastName: string
    title: string
    subject: string
    courseNumber: string
    active: boolean
}

export type CourseWithName = Course & {
    name: string
}
