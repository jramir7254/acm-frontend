import { Page, } from '@/components/layout/page'
import { SidebarProvider, SidebarTrigger } from '@/components/primitives/sidebar'

import { Outlet } from 'react-router'
import { useMe } from '@/features/users/hooks/me/queries'
import { DashboardSidebar } from '@/components/navigation/sidebar'


export default function DashboardPage() {
    const { data: user, isLoading } = useMe();

    if (isLoading) return <p>loading</p>




    return (
        <Page className='bg-background flex mt-16 flex-1 relative'>
            <SidebarProvider>
                <DashboardSidebar />
                <SidebarTrigger className='md:hidden absolute top-5 left-10 z-10' />
                <div className='flex-1 m-0 md:m-5 xl:m-10' >
                    <Outlet />
                </div>
            </SidebarProvider>
        </Page>
    )
}
