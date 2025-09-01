import {
    SidebarGroup as InnerSidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/primitives/sidebar"
import { NavLink } from "react-router"


export function SidebarItem({ children, to = null }: { children: React.ReactNode, to?: string | null }) {
    return (
        <SidebarMenuItem >
            {to !== null ? (
                <NavLink to={to} end={to === ""}>
                    {({ isActive }) => (
                        <SidebarMenuButton asChild isActive={isActive} size='default' className="p-2">
                            <div className="flex items-center">
                                {children}
                            </div>
                        </SidebarMenuButton>
                    )}
                </NavLink>
            ) : (
                <SidebarMenuButton asChild>
                    {children}
                </SidebarMenuButton>
            )}
        </SidebarMenuItem>
    )
}


export function SidebarGroup({ children, label }: { children: React.ReactNode, label?: string }) {
    return (
        <InnerSidebarGroup>
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            {/* <SidebarGroupContent> */}
            <SidebarMenu>
                {children}
            </SidebarMenu>
            {/* </SidebarGroupContent> */}
        </InnerSidebarGroup>
    )
}
