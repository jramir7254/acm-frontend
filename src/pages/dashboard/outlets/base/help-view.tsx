import Gradient from '@/components/layout/gradient';
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/primitives/accordion"
import { Separator } from '@/components/primitives/separator';
// import { HelpForm } from '../../components/forms';
import { HelpForm } from '@/features/users/components/user/forms/help-form';
import { UnderConstructionCard } from '@/components/layout';

export default function HelpView() {


    return (
        <Gradient via="rgba(50,50,50,0.20)" className=" py-15 md:p-10 size-full flex flex-col md:flex-row border-2 border-accent rounded-md">
            <div className='hidden flex-1 lg:flex px-5' >
                <UnderConstructionCard className='flex-1 rounded-[12px] border-8' text='FAQ SOON'>
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        defaultValue="item-1"
                    >
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Product Information</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    Our flagship product combines cutting-edge technology with sleek
                                    design. Built with premium materials, it offers unparalleled
                                    performance and reliability.
                                </p>
                                <p>
                                    Key features include advanced processing capabilities, and an
                                    intuitive user interface designed for both beginners and experts.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </UnderConstructionCard>
            </div>
            <Separator orientation='vertical' className='hidden md:block' />
            <div className='flex-1 px-10 space-y-10'>
                <div>
                    <h2 className='text-2xl font-monts font-bold'>Help & Feedback Form</h2>
                    <Separator className='mt-5' />
                </div>
                <HelpForm />
            </div>

        </Gradient>
    );
}
