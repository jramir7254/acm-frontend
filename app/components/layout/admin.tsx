import React from 'react'
import { useAuth } from "@/features/auth/context/AuthContext";

type Props = {
    children: React.ReactNode,
    className?: string
}

export default function Admin({ children, className }: Props) {
    const { user } = useAuth()

    return user?.isAdmin ? (
        <div className={className}>{children}</div>
    ) : null
}
