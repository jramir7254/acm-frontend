import React from 'react'

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/primitives/input-otp"

export default function OtpDisplay({ code }: { code: string }) {
    return (
        <InputOTP disabled maxLength={6} value={code} containerClassName='has-disabled:opacity-100'>
            <InputOTPGroup className=''>
                <InputOTPSlot index={0} className='p-10 text-3xl font-bold text-white ' />
                <InputOTPSlot index={1} className='p-10 text-3xl font-bold text-white ' />
                <InputOTPSlot index={2} className='p-10 text-3xl font-bold text-white ' />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
                <InputOTPSlot index={3} className='p-10 text-3xl font-bold text-white ' />
                <InputOTPSlot index={4} className='p-10 text-3xl font-bold text-white ' />
                <InputOTPSlot index={5} className='p-10 text-3xl font-bold text-white ' />
            </InputOTPGroup>
        </InputOTP>
    )
}
