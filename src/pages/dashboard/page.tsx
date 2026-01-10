import { Page, } from '@/components/layout/page'
import { SidebarProvider, SidebarTrigger } from '@/components/primitives/sidebar'

import { Outlet } from 'react-router'
import { useMe } from '@/features/users/hooks/me/queries'
import { DashboardSidebar } from '@/components/navigation/sidebar'
import { ScrollArea } from '@/components/primitives/scroll-area'


export default function DashboardPage() {
    const { data: user, isLoading } = useMe();

    if (isLoading) return <p>loading</p>




    return (
        <Page className='bg-background flex flex-1 relative overflow-hidden'>
            <SidebarProvider>
                <DashboardSidebar />
                <SidebarTrigger className='md:hidden absolute top-5 left-10 z-10' />
                {/* <ScrollArea className='flex-1'> */}
                <div className='m-5 lg:m-7 2xl:m-8 flex-1 max-h-full'>
                    <Outlet />
                </div>
                {/* </ScrollArea> */}
            </SidebarProvider>
        </Page>
    )
}
