import ConfirmationModal from "@/components/ui/confirmation"
import { Button } from "@/components/primitives/button"
// import { useAuth } from "archive/use-auth"\
import { useLogout } from "@/features/auth/hooks/use-auth"
import { LogOutIcon } from "lucide-react"

export function LogoutButton({ collapsed }: { collapsed: boolean }) {
    const logout = useLogout()

    return (
        <ConfirmationModal title="Are you sure you want to logout?" onConfirm={logout}>
            <Button variant="outline" size={collapsed ? 'icon' : 'default'}>
                {collapsed ? <LogOutIcon /> : 'Logout'}
            </Button>
        </ConfirmationModal>
    )
}
