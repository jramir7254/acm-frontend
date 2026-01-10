import { Button } from "@/components/primitives/button"
import { Info } from "lucide-react"

export function InfoButton({ showInfo, setShowInfo }: { showInfo: boolean, setShowInfo: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <Button variant='secondary' size='icon' onClick={() => setShowInfo(!showInfo)}>
            <Info />
        </Button>
    )
}
