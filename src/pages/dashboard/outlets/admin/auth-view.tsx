import Gradient from '@/components/layout/gradient'
import { useRoles } from '@/features/auth/hooks/use-roles'
import React from 'react'
import { CustomBadge } from '@/components/ui/custom-badge'
import { roleBadgeConfig } from '@/components/ui/badge-configs'
import { useSemesters, useCurrentSemester } from '@/features/app/use-semester'
import ChangeSemesterOverlay from '@/features/admin/components/overlays/change-semester-overlay'

export default function AuthView() {
    const { data } = useRoles()
    const { data: semesters } = useSemesters()
    const { data: semester } = useCurrentSemester()

    if (!data) return

    return (
        <Gradient via="rgba(50,50,50,0.20)" className="p-10 size-full flex  border-2 border-accent rounded-md">
            <div className='flex flex-col'>
                {data.map(r => <CustomBadge config={roleBadgeConfig} itemKey={r.role} key={`${r.role}-${r.id}`} />)}

            </div>

            <ChangeSemesterOverlay />
        </Gradient>
    )
}
