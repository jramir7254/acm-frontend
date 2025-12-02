import React from 'react'
import { Badge } from '@/components/primitives/badge'
import { Circle } from 'lucide-react'
import { snakeToTitle } from '@/lib/utils'

import { ROLES, type Role } from '@/components/layout'
import { Italic } from '@/components/text/typography'

interface RoleVariants {
    className: string,
    variant: "default" | "secondary" | "destructive" | "outline" | null | undefined
}

const roleVariants: Record<Role, RoleVariants> = {
    owner: {
        className: 'oklch(50.5% 0.213 27.518)',
        variant: 'default'
    },
    advisor: {
        className: 'purple',
        variant: 'secondary'
    },
    president: {
        className: 'oklch(90.5% 0.182 98.111)',
        variant: 'secondary'
    },
    vice_president: {
        className: 'oklch(75% 0.183 55.934)',
        variant: 'secondary'
    },
    secretary: {
        className: 'oklch(78.9% 0.154 211.53)',
        variant: 'secondary'
    },
    treasurer: {
        className: 'oklch(69.6% 0.17 162.48)',
        variant: 'secondary'
    },
    instructor: {
        className: 'oklch(62.3% 0.214 259.815)',
        variant: 'secondary'
    },
    student: {
        className: 'oklch(87% 0 0)',
        variant: 'outline'
    }
}


export function RoleBadge({ role }: { role: Role | null | undefined }) {

    if (!role) {
        return (
            <Badge variant={'outline'} className={`font-nunit `}>
                <Italic className='text-muted-foreground'>Select Role</Italic>
            </Badge>
        )
    }


    return (
        <Badge variant={roleVariants[role]['variant']} className={`font-nunit size-fit`}>
            <Circle fill={roleVariants[role].className} stroke='none' />
            {snakeToTitle(role)}
        </Badge>
    )
}
