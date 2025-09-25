import React from 'react'

export function useIsDev() {
    const isDev: boolean =
        typeof import.meta !== 'undefined' &&
        (import.meta as any)?.env &&
        Boolean((import.meta as any).env.DEV);

    return isDev
}
