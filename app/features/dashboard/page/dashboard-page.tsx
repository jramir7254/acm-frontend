import Page from '@/components/layout/page'
import { SidebarProvider } from '@/components/primitives/sidebar'
import { DashboardSidebar } from '../components/layout'
import { Outlet } from 'react-router'
import { useMe } from '@/features/auth/hooks/useMe'
import { useNavigate } from 'react-router'
export default function DashboardPage() {
    const { data: user } = useMe();
    const navigate = useNavigate()


    if (!user) navigate('/auth')


    return (
        <Page className='bg-background flex-1 flex mt-16'>
            <SidebarProvider>
                <DashboardSidebar />
                <Outlet />
            </SidebarProvider>
        </Page>
    )
}
