
import { useMe } from "@/features/users/hooks/me/queries"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/primitives/avatar"
import { useRole } from "@/features/auth/hooks/use-auth"
import { RoleBadge } from "../../role-badge"
export function MeCard() {
    const { data: user } = useMe()
    const { data } = useRole()

    return (
        <div className="flex items-center gap-3 ">
            <Avatar className="size-7 md:size-8 rounded-lg">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <div className="truncate text-xs md:text-sm font-medium font-monts">{user?.fullName}</div>
                {/* <span className="truncate text-xs">{user?.epccId} </span> */}
                <RoleBadge role={data?.role} />
            </div>
        </div>
    )
}