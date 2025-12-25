import { Button } from "@/components/primitives/button";
import { CgPassword } from "react-icons/cg";
import { ShowCodeOverlay } from "../../overlays/code-overlay";
import type { Event } from "@/features/events/types/event";

export function ShowCodeButton({ event, isLive }: { isLive: boolean, event: Event }) {

    if (!isLive) return null

    return (
        <ShowCodeOverlay event={event}>
            <Button variant='secondary' size='icon'><CgPassword /></Button>
        </ShowCodeOverlay>
    )
}

