import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/primitives/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/primitives/form";
import { checkIn } from '@/features/events/api/events'

import { Button } from '@/components/primitives/button'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/primitives/input-otp'

export function CheckInButton({ eventId }) {

    const FormSchema = z.object({
        code: z.string().min(6, {
            message: "Your one-time password must be 6 characters.",
        }),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { code: "" },
    });

    const onSubmit = async (values) => {
        await checkIn(eventId, values)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='default'>Check In</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-accent">
                <DialogHeader>
                    <DialogTitle>Check in for event</DialogTitle>
                    <DialogDescription>
                        Enter the 6 digit code that is projected from the screen.
                    </DialogDescription>
                </DialogHeader>
                <div className='grid place-items-center'>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">

                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event Check-In Code</FormLabel>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>

            </DialogContent>
        </Dialog>
    )
}
