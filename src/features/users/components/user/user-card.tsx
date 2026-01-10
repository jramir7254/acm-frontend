
import { useMe } from "@/features/users/hooks/me/queries"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/primitives/avatar"
import { useRole } from "@/features/auth/hooks/use-auth"
import { RoleBadge } from "../role-badge"
import type { BaseUser } from "../../types"
import { Card, CardAction, CardContent, CardHeader } from "@/components/primitives/card"
import { Separator } from "@/components/primitives/separator"
// import { mail } from 'lucide-react'
import { MdEmail } from "react-icons/md"
import { Paragraph, Text } from "@/components/text/typography"
import { CustomBadge } from "@/components/ui/custom-badge"
import { Mail, AtSign } from "lucide-react"
import { roleBadgeConfig } from '@/components/ui/badge-configs'
import { EditUserPanel } from "@/features/admin/components/forms/edit-user-form"
import { useCourse } from "@/features/edu/hooks/queries"
import { CourseName } from "@/components/text/course-name"


export function UserCard({ user }: { user: BaseUser }) {

    return (
        <Card>
            <CardHeader>
                <CardAction>
                    <EditUserPanel user={user} />
                </CardAction>

                <div className="flex items-center gap-3 h-full ">
                    <Avatar className="size-7 md:size-15 rounded-4xl">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <Separator orientation="vertical" />
                    <div className="flex flex-col gap-1 ">
                        {/* <div className="truncate text-xs md:text-sm font-medium font-monts">{`${user.firstName} ${user.lastName}`}</div> */}
                        <div className="inline-flex gap-2">
                            <Text fallBack="First Name" >{user?.firstName}</Text>
                            <Text fallBack="Last Name" >{user?.lastName}</Text>
                        </div>
                        <CustomBadge className="py-0" config={roleBadgeConfig} itemKey={user?.role} />
                    </div>
                </div>



                <div>
                    <Text > {user?.epccId}</Text>
                    <div className="inline-flex items-center gap-1">
                        <Mail size={15} />
                        <Text >{user?.epccEmail}</Text>
                    </div>

                </div>

            </CardHeader>
            <CardContent className="space-y-3">
                <Separator />
                <div>
                    <CourseName courseId={user?.courseId} />


                </div>
            </CardContent>
        </Card>
    )
}