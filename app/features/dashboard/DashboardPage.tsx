import React, { useEffect, useState } from 'react'
import Page from '@/components/layout/page'
import { SidebarProvider } from '@/components/primitives/sidebar'
import { useContext } from 'react'
import DashboardSidebar from './components/Sidebar'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table'
import { Button } from '@heroui/button'
import { API } from '@/lib/client';
import { useAuth } from "@/features/auth/context/AuthContext";
import { useEvents } from '@/providers/events-context';
import { useUserRsvps } from "@/features/auth/hooks/useMe";

import CancelRsvpButton from './components/CancelRsvpButton'
export default function DashboardPage() {
    const { user } = useAuth();
    const { data: rsvps, isLoading: rsvpsLoading } = useUserRsvps(user?.epccId);
    const { events } = useEvents();


    if (rsvpsLoading) return <p>No</p>


    // Merge based on id
    const ids = rsvps?.userRsvps?.map(obj => obj.eventId) || [];
    const merged = events.filter(e => ids.includes(e.id))

    if (!user) return <p>No</p>


    return (
        <Page className='bg-background flex-1 flex mt-16'>
            <SidebarProvider>
                <DashboardSidebar />
                <section className='size-full p-10 grid gap-5 grid-cols-5 grid-rows-5 '>
                    <div className='backdrop-blur-[10px] bg-gradient-to-r from-[rgba(99,110,155,0.15)] via-[rgba(255,255,255,0.15)] to-[rgba(62,93,161,0.15)] rounded-[12px] shadow-lg p-6 col-span-5 row-span-1 '>dd</div>
                    <div className='col-span-2 row-span-4 bg-accent rounded-[12px]'>
                        <pre>
                            <code>
                                {JSON.stringify(user, null, 4)}
                            </code>
                        </pre>
                    </div>
                    <div className='col-span-3 row-span-4 bg-accent rounded-[12px]'>
                        <Table>
                            <TableCaption>A list of your recent invoices.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-2/4">Title</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {merged.map((er, i) => (
                                    <TableRow key={er.id * i + user.epccId}>
                                        <TableCell className="font-medium">{er.title}</TableCell>
                                        <TableCell>{new Date(er.date).toLocaleString()}</TableCell>
                                        <TableCell>
                                            <CancelRsvpButton eventId={er.id} />
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </div>
                </section>
            </SidebarProvider>
        </Page>
    )
}
