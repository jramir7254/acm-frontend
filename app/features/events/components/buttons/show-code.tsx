import { Button } from "@/components/primitives/button";
import { Info } from "lucide-react";
import { ShowCodeOverlay } from "../overlays/code-overlay";
export function ShowCodeButton() {

    return (
        <ShowCodeOverlay>
            <Button variant='secondary' size='icon'><Info /></Button>
        </ShowCodeOverlay>
    )
}

