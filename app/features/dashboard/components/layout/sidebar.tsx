// DashboardSidebar.tsx

import {
    PermissionGuard,
    FeatureFlag,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarItem,
    SidebarFooter,
    SidebarGroup,
    SidebarRail,
    SidebarTrigger,
    SidebarMenuButton,
    SidebarMenuBadge,
    useSidebar
} from "@/components/layout"

import { Home, PersonStanding, UserCircle2, School, BadgeHelp } from "lucide-react"
import { useMe } from "@/features/auth/hooks/use-me"
import { LogoutButton } from "../buttons"
import { Separator } from "@/components/primitives/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/primitives/avatar"
import { useAddPoints } from "../../hooks/use-user"


export function DashboardSidebar() {
    const { data: user } = useMe()
    const { state } = useSidebar()
    const addPoints = useAddPoints()

    const isExpanded = state === 'expanded'


    return (
        <Sidebar className="px-3" collapsible="icon">
            <SidebarHeader className="mt-10 list-none ">

                <SidebarItem>
                    <div>
                        {isExpanded &&
                            <>
                                <Avatar className="size-6 rounded-lg">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">  {user?.fullName ?? 'Anonymous'}</span>
                                    <span className="truncate text-xs">{user?.epccId}</span>
                                </div>
                            </>
                        }
                        <SidebarMenuBadge className="pointer-events-auto group-data-[collapsible=icon]:block">
                            <SidebarTrigger className=" md:flex" />
                        </SidebarMenuBadge>
                    </div>
                </SidebarItem>
            </SidebarHeader>

            <Separator />

            <SidebarContent>
                <SidebarGroup label="Dashboard">
                    <SidebarItem to="">
                        <Home className="size-3.5 shrink-0" />
                        <span>Home</span>
                    </SidebarItem>

                    <SidebarItem to='profile'>
                        <UserCircle2 className="size-3.5 shrink-0" />
                        <span>Profile</span>
                    </SidebarItem>

                    <PermissionGuard resource="users" requiredRoles={['advisor', 'instructor', 'president']}>
                        <SidebarItem to='admin'>
                            <PersonStanding className="h-4 w-4" />
                            <span>Admin</span>
                        </SidebarItem>
                    </PermissionGuard>

                    <FeatureFlag>
                        <PermissionGuard resource="users" requiredRoles={['instructor']}>
                            <SidebarItem to='instructor'>
                                <School className="h-4 w-4" />
                                <span>Instructors</span>
                            </SidebarItem>
                        </PermissionGuard>
                    </FeatureFlag>


                    <FeatureFlag ready>
                        <SidebarItem to='help'>
                            <BadgeHelp className="h-4 w-4" />
                            <span>Help</span>
                        </SidebarItem>
                    </FeatureFlag>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="mb-10 list-none">
                <SidebarMenuButton asChild>
                    <LogoutButton collapsed={!isExpanded} />
                </SidebarMenuButton>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}
