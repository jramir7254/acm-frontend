import React from 'react'
import { Badge } from '@/components/primitives/badge'
import { Circle } from 'lucide-react'
import { snakeToTitle } from '@/lib/utils'

import { Italic } from '@/components/text/typography'

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | null | undefined


export type BadgeConfig = {
    [k in string]: {
        variant?: BadgeVariant
        color: keyof typeof colorMap
    }
}

const colorMap = {
    red: 'oklch(50.5% 0.213 27.518)',
    purple: 'oklch(54.1% 0.281 293.009)',
    yellow: 'oklch(90.5% 0.182 98.111)',
    orange: 'oklch(75% 0.183 55.934)',
    cyan: 'oklch(78.9% 0.154 211.53)',
    green: 'oklch(69.6% 0.17 162.48)',
    blue: 'oklch(62.3% 0.214 259.815)',
    white: 'oklch(87% 0 0)'
}


export function CustomBadge({ itemKey, config, className }: { itemKey: keyof BadgeConfig, config: BadgeConfig, className?: string }) {

    if (!itemKey) {
        return (
            <Badge variant={'outline'} className={`font-nunit`}>
                <Italic muted>Null</Italic>
            </Badge>
        )
    }


    return (
        <Badge variant={config[itemKey].variant} className={`font-nunit size-fit ${className}`}>
            <Circle fill={colorMap[config[itemKey].color]} stroke='none' />
            {snakeToTitle(itemKey)}
        </Badge>
    )
}




