
import { useCallback } from "react"
import { type DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { ListFilter } from "lucide-react"
import { Button } from "@/components/primitives/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/primitives/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export type EventFilters = {
    past: boolean
    upcoming: boolean
}

type Props = {
    filters: EventFilters
    onChange: (next: EventFilters) => void
}

export function FilterEventsButton({ filters, onChange }: Props) {
    // tiny helper to update a single key
    const set = useCallback(
        (key: keyof EventFilters, val: boolean) =>
            onChange({ ...filters, [key]: val }),
        [filters, onChange]
    )


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size='icon'><ListFilter /></Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
                <DropdownMenuCheckboxItem
                    onSelect={(e) => e.preventDefault()}      // keep menu open
                    checked={filters.past}
                    onCheckedChange={() => set("past", !filters.past)}
                >
                    Past Events
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem
                    onSelect={(e) => e.preventDefault()}
                    checked={filters.upcoming}
                    onCheckedChange={() => set("upcoming", !filters.upcoming)}
                >
                    Upcoming Events
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}