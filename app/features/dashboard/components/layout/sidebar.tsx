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
    SidebarSeparator,
    useSidebar
} from "@/components/layout"

import { Home, PersonStanding, UserCircle2, CodeXml, BadgeHelp, Users } from "lucide-react"
import { MdEventNote } from "react-icons/md";

import { FaChalkboardTeacher } from "react-icons/fa";

import { LogoutButton } from "../buttons"
import { Separator } from "@/components/primitives/separator"
import { UserCard } from "../data"


export function DashboardSidebar() {
    const { state } = useSidebar()

    const isExpanded = state === 'expanded'


    return (
        <Sidebar className="px-3" collapsible="icon">
            <SidebarHeader className="mt-10 list-none ">

                <SidebarItem>
                    <div>
                        {isExpanded &&
                            <UserCard />
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


                    <FeatureFlag ready>
                        <SidebarItem to='help'>
                            <BadgeHelp className="h-4 w-4" />
                            <span>Help</span>
                        </SidebarItem>
                    </FeatureFlag>
                </SidebarGroup>

                <PermissionGuard resource="" requiredRoles={['instructor']}>
                    <Separator />
                    <SidebarGroup label="Instructors">
                        <FeatureFlag ready>
                            <SidebarItem to='instructor'>
                                <FaChalkboardTeacher className="h-4 w-4" />
                                <span>Students</span>
                            </SidebarItem>
                        </FeatureFlag>
                    </SidebarGroup>
                </PermissionGuard>

                <PermissionGuard resource="users" requiredRoles={['advisor', 'president']}>
                    <Separator />
                    <SidebarGroup label="Admin">
                        <SidebarItem to='admin/users'>
                            <Users className="h-4 w-4" />
                            <span>Users</span>
                        </SidebarItem>
                        <SidebarItem to='admin/events'>
                            <MdEventNote className="h-4 w-4" />
                            <span>Events</span>
                        </SidebarItem>
                        <PermissionGuard resource="users" requiredRoles={['advisor', 'instructor', 'president']}>
                            <SidebarItem to='admin'>
                                <PersonStanding className="h-4 w-4" />
                                <span>Admin</span>
                            </SidebarItem>
                        </PermissionGuard>
                    </SidebarGroup>
                </PermissionGuard>

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
