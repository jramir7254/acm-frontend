import { Button } from "@/components/primitives/button";
import { CgPassword } from "react-icons/cg";

import { ShowCodeOverlay } from "../overlays/code-overlay";
export function ShowCodeButton({ isLive }: { isLive: boolean }) {

    if (!isLive) return null

    return (
        <ShowCodeOverlay>
            <Button variant='secondary' size='icon'><CgPassword /></Button>
        </ShowCodeOverlay>
    )
}

