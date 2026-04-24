import { useEffect, useState } from "react";
import { useCurrentSemester } from "../use-semester";


export function useSemsterSelect() {
    const [value, setValue] = useState('current')

    const onChange = (id: string | 'current') => {
        setValue(id)
    }

    return { value, onChange, setValue }
}