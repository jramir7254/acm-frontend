import React from 'react'
import { UsersNumberCard } from '@/features/users/components/ui/num-users-card';
import UsersTable from '@/features/users/components/tables/users-table';
// import UsersTable from '@/features/users/components/users/tables/users-table';



export default function UsersView() {


    return (
        <div className='size-full flex flex-col gap-5'>
            <header>
                <UsersNumberCard />
            </header>

            <div className='  overflow-hidden '>
                <UsersTable />
            </div>
        </div>
    )
}
