
import { SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, Search, Settings, PersonStanding } from "lucide-react"
import { useAuth } from "@/features/auth/context/AuthContext";
import Admin from "@/components/layout/admin";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"

const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },

    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]
import { User } from "@heroui/user";
import { Button } from "@heroui/button"
import LogoutButton from "./LogoutButton"
import { Separator } from "@/components/ui/separator"
export default function DashboardSidebar() {
    const { user } = useAuth()
    return (

        <Sidebar className='px-5 pb-10'>
            <SidebarHeader className="mt-10">
                <User
                    className="self-start"
                    avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    }}
                    description={user.epccId || 'none'}
                    name={(user.firstName + " " + user.lastName) || 'None'}
                />
            </SidebarHeader>
            <Separator />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <Admin>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <a href={'#'}>
                                            <PersonStanding />
                                            <span>Admin</span>
                                        </a>
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
