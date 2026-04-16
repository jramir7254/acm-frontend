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
    SidebarMenuButton
} from "@/components/layout"

import { Home, PersonStanding, UserCircle2, BadgeHelp, Users } from "lucide-react"
import { MdEventNote } from "react-icons/md";

import { FaChalkboardTeacher } from "react-icons/fa";

import { Separator } from "@/components/primitives/separator"
import { SidebarMenu, SidebarMenuItem } from "@/components/primitives/sidebar";
import { Text } from "../text/typography";
import { SidebarUserFooter } from "./sidebar-footer";
import { useAppNavigation } from "@/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../primitives/avatar";
import { SemesterName } from "../text/semester-name";


export function DashboardSidebar() {

    const { toHome } = useAppNavigation()



    return (
        <Sidebar className="" collapsible="icon" variant="inset">
            <SidebarHeader className="">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" onClick={toHome}>
                            <Avatar className="size-7 md:size-8 rounded-md bg-black">
                                <AvatarImage src="/epcc.png" />
                                <AvatarFallback className="rounded-lg">EPCC</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">ACM EPCC</span>
                                <span className="truncate text-xs"><SemesterName /></span>
                            </div>

                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup label="Dashboard">
                    <SidebarItem to="">
                        <Home className="size-3.5 shrink-0" />
                        <Text>Home</Text>
                    </SidebarItem>

                    <SidebarItem to='profile'>
                        <UserCircle2 className="size-3.5 shrink-0" />
                        <Text>Profile</Text>
                    </SidebarItem>


                    <FeatureFlag ready>
                        <SidebarItem to='help'>
                            <BadgeHelp className="h-4 w-4" />
                            <Text>Help</Text>
                        </SidebarItem>
                    </FeatureFlag>
                </SidebarGroup>

                <PermissionGuard resource="" requiredRoles={['instructor']}>
                    <Separator />
                    <SidebarGroup label="Instructors">
                        <FeatureFlag ready>
                            <SidebarItem to='instructor'>
                                <FaChalkboardTeacher className="h-4 w-4" />
                                <Text>Students</Text>
                            </SidebarItem>
                        </FeatureFlag>
                    </SidebarGroup>
                </PermissionGuard>

                <PermissionGuard resource="users" requiredRoles={['advisor', 'president']}>
                    <Separator />
                    <SidebarGroup label="Admin">
                        <SidebarItem to='admin/users'>
                            <Users className="h-4 w-4" />
                            <Text>Users</Text>
                        </SidebarItem>
                        <SidebarItem to='admin/events'>
                            <MdEventNote className="h-4 w-4" />
                            <Text>Events</Text>
                        </SidebarItem>
                        <PermissionGuard resource="users" requiredRoles={['owner']}>
                            <SidebarItem to='auth'>
                                <PersonStanding className="h-4 w-4" />
                                <Text>Admin</Text>
                            </SidebarItem>
                        </PermissionGuard>
                    </SidebarGroup>
                </PermissionGuard>

            </SidebarContent>


            <SidebarFooter className="">
                <SidebarUserFooter />
            </SidebarFooter>
        </Sidebar>
    )
}
