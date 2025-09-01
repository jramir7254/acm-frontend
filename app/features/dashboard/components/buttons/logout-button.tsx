import ConfirmationModal from "@/components/ui/confirmation"
import { Button } from "@/components/primitives/button"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { LogOutIcon } from "lucide-react"

export function LogoutButton({ collapsed }: { collapsed: boolean }) {
    const { logout } = useAuth()

    return (
        <ConfirmationModal title="Are you sure you want to logout?" onConfirm={logout}>
            <Button variant="outline" size={collapsed ? 'icon' : 'default'}>
                {collapsed ? <LogOutIcon /> : 'Logout'}
            </Button>
        </ConfirmationModal>
    )
}
