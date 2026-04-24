import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import { Outlet } from 'react-router'
import { useMe } from '@/features/users/hooks/me/queries'
import { DashboardSidebar } from '@/components/navigation/sidebar'
import { Separator } from '@/components/ui/separator'
import { SemesterSelect } from '@/components/other/semester-select'


export default function DashboardPage() {
    const { data: user, isLoading } = useMe();

    if (isLoading) return <p>loading</p>




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
                        <div>
                            <SemesterSelect />
                        </div>
                    </div>
                </header>
                <Separator />

                <div className='p-5 lg:p-7 2xl:p-8 flex-1 relative '>

                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
