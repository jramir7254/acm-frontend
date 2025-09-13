import React from 'react'
import { Label } from '../primitives/label'
import { Input } from '../primitives/input'
import { InfoIcon } from 'lucide-react'

export default function InputDisplay({ name, label, value }: { name: string, label: string, value: string | number | undefined }) {
    return (
        <div className='space-y-2'>
            <Label htmlFor={name} className='flex items-center'>
                {label} <span title="If you need to change this field email jrami904@epcc.edu"><InfoIcon className='cursor-pointer' size={15} /></span>
            </Label>
            <Input disabled readOnly id={name} defaultValue={value} className="max-w-fit" />
        </div>
    )
}
