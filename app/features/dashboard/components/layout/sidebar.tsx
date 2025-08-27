// DashboardSidebar.tsx
import {
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/primitives/sidebar"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/primitives/sidebar"

import { Home, Settings, PersonStanding, UserCircle2 } from "lucide-react"
import { useMe } from "@/features/auth/hooks/use-me"
import { PermissionGuard } from "@/components/layout"
import { NavLink } from "react-router" // ⬅️ from react-router-dom
import { LogoutButton } from "../buttons"
import { Separator } from "@/components/primitives/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/primitives/avatar"

const items = [
    { title: "Home", to: "", icon: Home },
    { title: "Profile", to: "profile", icon: UserCircle2 },
    // { title: "Admin", to: "admin", icon: PersonStanding }, // (optional)
]

export function DashboardSidebar() {
    const { data: user } = useMe()

    // Make index exact-match with `end`
    const linkProps = (to: string) => ({
        to,
        className: ({ isActive }: { isActive: boolean }) =>
            isActive ? "bg-red" : undefined,
        end: to === "",
    })

    return (
        <Sidebar className="px-5 pb-10 ratio-16-10:w-6">
            <SidebarHeader className="mt-10">
                <div className="flex">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-muted">{user?.epccId}</p>
                </div>
            </SidebarHeader>

            <Separator />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <NavLink to={item.to} end={item.to === ""}>
                                        {({ isActive }) => (
                                            <SidebarMenuButton asChild isActive={isActive}>
                                                <div className="flex items-center">
                                                    <item.icon className="mr-2 h-4 w-4" />
                                                    <span>{item.title}</span>
                                                </div>
                                            </SidebarMenuButton>
                                        )}
                                    </NavLink>
                                </SidebarMenuItem>
                            ))}
                            <PermissionGuard resource="users" requiredRoles={['advisor', 'instructor', 'president']}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <NavLink {...linkProps("admin")}>
                                            <PersonStanding className="mr-2 h-4 w-4" />
                                            <span>Admin</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </PermissionGuard>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <LogoutButton />
            </SidebarFooter>
        </Sidebar>
    )
}
