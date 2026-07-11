import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { capitalize } from 'es-toolkit/string';


import { Link, Outlet } from 'react-router'
import { DashboardSidebar } from '@/components/navigation/sidebar'
import { Separator } from '@/components/ui/separator'
import { SemesterSelect } from '@/components/other/semester-select'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useLocation } from "react-router";

export default function DashboardPage() {
    const location = useLocation();


    console.log(location.pathname); // Output: "/dashboard"

    const paths = location.pathname.split('/').slice(2)

    console.log({ paths }); // Output: "/dashboard"



    return (
        <SidebarProvider className=' min-h-screen bg-background'>
            <DashboardSidebar />
            <SidebarInset className=''>

                <header className="flex h-16 shrink-0 items-center gap-3 px-4 sm:px-5 lg:px-6">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                        <SidebarTrigger className="size-8" />
                        <Separator
                            className="data-[orientation=vertical]:h-8"
                            orientation="vertical"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink render={<Link to={`/dashboard`}>Dashboard</Link>} />
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />

                                {paths.map((path, index) => {
                                    if (index === paths.length - 1) {
                                        return (
                                            <BreadcrumbItem>
                                                <BreadcrumbPage>{capitalize(path)}</BreadcrumbPage>
                                            </BreadcrumbItem>
                                        )
                                    }

                                    return (
                                        <>
                                            <BreadcrumbItem>
                                                <BreadcrumbLink render={<Link to={`/dashboard/${path}`}>{capitalize(path)}</Link>} />
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                        </>
                                    )
                                })}

                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <Separator />

                <ScrollArea className='p-5 h-[80vh] lg:p-7 2xl:p-8 flex-1 relative '>
                    <Outlet />
                </ScrollArea>
            </SidebarInset>
        </SidebarProvider>
    )
}
