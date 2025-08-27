
export const kebabToTitle = (kebabStr: string): string => {
    if (!kebabStr || kebabStr.length === 0) return ""
    return kebabStr.split('-').map(i => i.charAt(0).toUpperCase().concat(i.substring(1))).join(" ").trim()
}


export const titleToKebab = (titleStr: string): string => {
    if (!titleStr || titleStr.length === 0) return ""
    return titleStr.toLowerCase().replace(' ', '-').trim()
}

