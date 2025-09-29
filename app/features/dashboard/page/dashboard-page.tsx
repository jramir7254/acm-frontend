import { Page, } from '@/components/layout/page'
import { Container } from '@/components/layout'
import { SidebarProvider, SidebarTrigger } from '@/components/primitives/sidebar'
import { DashboardSidebar } from '../components/layout'
import { Outlet } from 'react-router'
import { useMe } from '@/features/auth/hooks/use-me'
import { useNavigate } from 'react-router'
import { EventsIndexProvider } from '@/features/events/context/index-context'


export default function DashboardPage() {
    const { data: user } = useMe();
    const navigate = useNavigate()


    // if (!user) navigate('/auth')


    return (
        <Page className='bg-background flex mt-16 flex-1 relative'>
            <SidebarProvider>
                <DashboardSidebar />
                <SidebarTrigger className='md:hidden absolute top-5 left-10 z-10' />
                <EventsIndexProvider>
                    <Container className='flex-1 m-2 md:m-10'>
                        <Outlet />
                    </Container>
                </EventsIndexProvider>
            </SidebarProvider>
        </Page>
    )
}
