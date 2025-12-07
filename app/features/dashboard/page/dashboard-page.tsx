import { Page, } from '@/components/layout/page'
import { Container } from '@/components/layout'
import { SidebarProvider, SidebarTrigger } from '@/components/primitives/sidebar'
import { DashboardSidebar } from '../components/layout'
import { Outlet } from 'react-router'
import { useMe } from '@/features/auth/hooks/use-me'
import { useNavigate } from 'react-router'
import { EventsIndexProvider } from '@/features/events/context/index-context'


export default function DashboardPage() {
    const { data: user, isLoading } = useMe();
    const navigate = useNavigate()

    if (isLoading) return <p>loading</p>


    // if (!user) navigate('/auth')


    return (
        <Page className='bg-background flex mt-16 flex-1 relative'>
            <SidebarProvider>
                <DashboardSidebar />
                <SidebarTrigger className='md:hidden absolute top-5 left-10 z-10' />
                <EventsIndexProvider>
                    <div className='flex-1 md:m-5 xl:m-10' >
                        <Outlet />
                    </div>
                </EventsIndexProvider>
            </SidebarProvider>
        </Page>
    )
}
