
export const IS_DEV: boolean =
    typeof import.meta !== 'undefined' &&
    (import.meta as any)?.env &&
    Boolean((import.meta as any).env.DEV);


export const FEEDBACK_QUESTIONS = {
    1: {
        heading: 'Overall, how satisfied are you with this workshop?',
        options: [
            'Very Dissatisfied',
            'Somewhat Dissatisfied',
            'Neutral',
            'Satisfied',
            'Very Satisfied',
        ]
    },
    2: {
        heading: 'How clear and engaging was the instructor’s delivery?',
        options: [
            'Not Clear',
            'Slightly Clear',
            'Moderately Clear',
            'Very Clear',
            'Extremely Clear',
        ]
    },
    3: {
        heading: 'How relevant was the content to your studies/work/professional goals?',
        options: [
            'Not Relevant',
            'Slightly Relevant',
            'Somewhat Relevant',
            'Very Relevant',
            'Extremely Relevant',
        ]
    },
    4: {
        heading: 'How likely are you to apply what you learned in your work/studies?',
        options: [
            'Not Likely',
            'Slightly Likely',
            'Somewhat Likely',
            'Very Likely',
            'Extremely Likely',
        ]
    },

}

export const FEEDBACK_QUESTIONS_ARRAY = [
    {
        heading: 'Overall, how satisfied are you with this workshop?',
        options: [
            'Very Dissatisfied',
            'Somewhat Dissatisfied',
            'Neutral',
            'Somewhat Satisfied',
            'Very Satisfied',
        ]
    },
    {
        heading: 'How clear and engaging was the instructor’s delivery?',
        options: [
            'Not Clear',
            'Slightly Clear',
            'Moderately Clear',
            'Very Clear',
            'Extremely Clear',
        ]
    },
    {
        heading: 'How relevant was the content to your studies/work/professional goals?',
        options: [
            'Not Relevant',
            'Slightly Relevant',
            'Somewhat Relevant',
            'Very Relevant',
            'Extremely Relevant',
        ]
    },
    {
        heading: 'How likely are you to apply what you learned in your work/studies?',
        options: [
            'Not Likely',
            'Slightly Likely',
            'Somewhat Likely',
            'Very Likely',
            'Extremely Likely',
        ]
    },

]