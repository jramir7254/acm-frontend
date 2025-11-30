

import Gradient from '@/components/layout/gradient'
import { Button } from '@/components/primitives/button';
import { useAppNavigation } from '@/hooks';
import { useUser } from '@/features/dashboard/hooks/use-admin';
import { ArrowLeft, Edit2 } from 'lucide-react';
import { Paragraph } from '@/components/text/typography';
import { Badge } from '@/components/primitives/badge';
import { useCourse } from '@/features/dashboard/hooks/use-courses';
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/primitives/tabs';
import AttendanceTable from './components/attendance-table';
import { Separator } from '@/components/primitives/separator';
import { RoleBadge } from '@/features/dashboard/components/ui/role-badge';
import { Item } from '@/components/primitives/item';
import { AssignRoleOverlay } from './components/role-overlay';
import { AddAttendanceOverlay } from './components/attendance-overlay';

export default function UserView() {
    const { toUsers, reqUserId } = useAppNavigation()
    const { data } = useUser(reqUserId || '')
    const course = useCourse(data?.course || -1)



    if (!data) return <p>load</p>

    const { firstName, lastName, epccEmail, epccId, rsvps, attendance, role, id } = data

    return (
        <Gradient via="rgba(50,50,50,0.20)" className=" p-10 size-full flex flex-col border-2 border-accent rounded-md">
            <header className='h-[7%] '>
                <Button onClick={toUsers} size='icon' variant={'ghost'}><ArrowLeft /></Button>
            </header>
            <div className='flex flex-1'>

                <div className=' w-1/3 h-full p-3'>
                    <Paragraph>{firstName} {lastName}</Paragraph>
                    <Paragraph>{epccEmail} </Paragraph>
                    <Paragraph>{epccId}</Paragraph>
                    <Paragraph>{course?.name}</Paragraph>
                    <Item className='p-0'>
                        <RoleBadge role={role} />
                        <AssignRoleOverlay currentRole={role} userId={id} epccId={epccId} />
                    </Item>
                </div>
                <Separator orientation='vertical' className='' />
                <div className='w-2/3 px-2'>
                    <Tabs defaultValue='rsvps'>
                        <TabsList>
                            <TabsTrigger value='rsvps'>Rsvps</TabsTrigger>
                            <TabsTrigger value='attendance'>Attendance</TabsTrigger>
                        </TabsList>
                        <TabsContent value='attendance'>
                            <AddAttendanceOverlay attendance={attendance} epccId={epccId} />
                            <AttendanceTable attendance={attendance} />
                        </TabsContent>
                    </Tabs>

                </div>
            </div>
        </Gradient>
    )
}