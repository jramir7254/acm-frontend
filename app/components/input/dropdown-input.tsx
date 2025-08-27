"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/primitives/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/primitives/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/primitives/command"

type Option = { id: string; name: string }

interface MultiSelectProps {
    values: Option[]
    selected: string[]
    onChange: (values: string[]) => void
    placeholder?: string
}

export function MultiSelect({
    values,
    selected,
    onChange,
    placeholder = "Select options...",
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false)

    function toggleValue(value: string) {
        if (selected.includes(value)) {
            onChange(selected.filter((v) => v !== value))
        } else {
            onChange([...selected, value])
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[240px] justify-between"
                >
                    {selected.length > 0
                        ? `${selected.length} selected`
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-0">
                <Command>
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {values.map((opt) => (
                                <CommandItem
                                    key={opt.id}
                                    onSelect={() => toggleValue(opt.id)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selected.includes(opt.id)
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {opt.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
