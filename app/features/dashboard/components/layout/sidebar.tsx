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

import { Home, Settings, PersonStanding } from "lucide-react"
import { useMe } from "@/features/auth/hooks/useMe"
import Admin from "@/components/layout/admin"
import { NavLink } from "react-router" // ⬅️ from react-router-dom
import { LogoutButton } from "../buttons"
import { Separator } from "@/components/primitives/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/primitives/avatar"

const items = [
    { title: "Home", to: "", icon: Home },      // /profile/:userId
    { title: "Settings", to: "settings", icon: Settings },  // /profile/:userId/settings
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
        <Sidebar className="px-5 pb-10">

            <SidebarHeader className="mt-10">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
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
                            <Admin>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <NavLink {...linkProps("admin")}>
                                            <PersonStanding className="mr-2 h-4 w-4" />
                                            <span>Admin</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </Admin>
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
