import { Button } from '@/components/primitives/button'
import CheckInForm from '../forms/check-in-form'
import { Overlay } from '@/components/ui'


export function CheckInButton() {
    return (
        <Overlay
            title='Check in for event'
            description='Enter the 6 digit code that is projected from the screen.'
            trigger={<Button variant='default'>Check In</Button>}
        >
            <div className='flex items-center justify-center'>
                <CheckInForm />
            </div>
        </Overlay>
    )
}
