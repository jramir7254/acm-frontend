import ConfirmationModal from "@/components/other/confirmation"
import { Button } from "@/components/ui/button"
import { useLogout } from "@/features/auth/hooks/use-auth"
import { LogOutIcon } from "lucide-react"

export function LogoutButton() {
    const logout = useLogout()

    return (
        <ConfirmationModal title="Are you sure you want to logout?" onConfirm={logout}>
            <Button variant="ghost" className="w-full flex justify-start" >
                <LogOutIcon />
                Log out
            </Button>
        </ConfirmationModal>
    )
}
