import Page from '@/components/layout/page'
import { SidebarProvider, SidebarInset } from '@/components/primitives/sidebar'
import { DashboardSidebar } from '../components/layout'
import { Outlet } from 'react-router'
import { useMe } from '@/features/auth/hooks/use-me'
import { useNavigate } from 'react-router'
import { EventsIndexProvider } from '@/features/events/context/index-context'


export default function DashboardPage() {
    const { data: user } = useMe();
    const navigate = useNavigate()


    if (!user) navigate('/auth')


    return (
        <Page className='bg-background flex mt-16'>
            <SidebarProvider>
                <DashboardSidebar />

                <EventsIndexProvider>
                    <Outlet />
                </EventsIndexProvider>
            </SidebarProvider>
        </Page>
    )
}
