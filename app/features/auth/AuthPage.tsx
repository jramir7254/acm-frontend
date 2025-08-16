import React from 'react'
import Page from '@/components/layout/page';
import AuthForm from './components/AuthForm';

export default function AuthPage() {

    return (
        <Page className='flex'>
            <aside className='w-1/3 h-full bg-stone-800'>
                <h2 className='monts auth-sidebar__header'>Welcome Back!</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, necessitatibus.</p>
            </aside>

            <div className='w-2/3 h-full flex items-center justify-center bg-[#2b2638]'>
                <AuthForm />
            </div>
        </Page>
    );
}