// features/auth/auth-page.tsx

import { Page } from "@/components/layout/page";
import { Outlet } from "react-router";
import { Calendar, Trophy, ClipboardList, CheckCircle2, Gift, LayoutDashboard, MessageSquare } from "lucide-react";


const perks = [
    { text: 'RSVP for upcoming club events', icon: Calendar },
    { text: 'View and manage your RSVP’d events', icon: ClipboardList },
    { text: 'Track and verify your attendance', icon: CheckCircle2 },
    { text: 'Earn points for attendance and surveys', icon: Trophy },
    { text: 'Redeem points for rewards (set by officers)', icon: Gift },
    { text: 'Access your member dashboard with stats', icon: LayoutDashboard },
    { text: 'Provide feedback and suggest new features', icon: MessageSquare },
]


export default function AuthPage() {
    return (
        <Page className="flex bg-[#232325] ">
            <aside className="w-1/2 h-full p-7 flex-col items-center justify-center hidden lg:flex">
                <div className=" bg-gradient-to-br from-neutral-900/95 to-neutral-900/80 rounded-2xl size-full p-25 shadow-lg shadow-black/80 border ">
                    <h2 className="font-monts text-4xl font-bold text-white mb-4 ">
                        Welcome to the ACM Club at EPCC
                    </h2>
                    <p className="text-slate-400 mb-12">
                        Create your account and unlock exclusive member benefits
                    </p>

                    <ul className="space-y-4 text-slate-300">
                        {perks.map(perk => (
                            <li key={perk.text} className="flex items-center gap-3">
                                <perk.icon className="h-5 w-5 text-rose-700" />
                                <span className="font-monts font-medium">{perk.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            <div className="w-full lg:w-1/2 h-full flex items-center justify-center bg-matte-black md:rounded-2xl lg:bg-inherit">
                <Outlet />
            </div>
        </Page>
    );
}
