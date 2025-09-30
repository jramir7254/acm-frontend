import Gradient from '@/components/layout/gradient'
import React from 'react'

export default function InstructorView() {
    return (
        <Gradient via="rgba(50,50,50,0.20)" className=" p-10 size-full grid grid-cols-1 md:grid-cols-2 border-2 border-accent rounded-md">
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
