import React, { useState } from 'react'
import Gradient from '@/components/layout/gradient'
import { DateTimePickerInput } from '@/components/input'
import { Button } from '@/components/primitives/button'
import { logger } from '@/lib/logger'

import { backend } from '@/services/api/backend'
import { formatDateAndTime } from '@/lib/utils'


export default function DeveloperView() {
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())


    const handleClick = () => {
        logger.debug({ start, end })
        const { date, time } = formatDateAndTime(start, end)
        logger.debug({ date, time })
        backend.post({ root: 'auth', route: '/test/email', payload: { start, end, date, time } })
    }

    return (
        <Gradient via="rgba(50,50,50,0.20)" className=" p-10 size-full grid grid-cols-1 md:grid-cols-2 border-2 border-accent rounded-md">
            <h3>Send Test Email</h3>
            <div>
                <DateTimePickerInput value={start} onChange={setStart} />
                <DateTimePickerInput value={end} onChange={setEnd} />
                <Button onClick={handleClick}>Send</Button>
            </div>
            {/* <Tabs defaultValue="courses" className="size-full">
                          <TabsList>
                              <TabsTrigger value="courses">Courses</TabsTrigger>
                              <TabsTrigger value="users">Users</TabsTrigger>
                              <TabsTrigger value="events">Events</TabsTrigger>
                          </TabsList>
                          <TabsContent value="courses" className="grid grid-cols-2">
                              <CoursesTable />
                              <CourseForm />
                          </TabsContent>
                          <TabsContent value="users">
                              <UsersTable />
                          </TabsContent>
                          <TabsContent value="events">
                              <EventsTable />
                          </TabsContent>
                      </Tabs> */}
        </Gradient>
    )
}
