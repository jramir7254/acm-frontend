import { useMe } from "@/features/auth/hooks/use-me"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/primitives/avatar"

export function UserCard() {
    const { data: user } = useMe()

    return (

        <div className="flex items-center gap-3">
            <Avatar className="size-6 rounded-lg">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.fullName}</span>
                <span className="truncate text-xs">{user?.epccId}</span>
            </div>
        </div>
    )
}