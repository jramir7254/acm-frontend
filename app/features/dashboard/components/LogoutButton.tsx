import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth/context/AuthContext"

export default function LogoutButton() {
    const { logout } = useAuth()

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Logout</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-fit bg-accent">
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-monts font-medium">Are you sure you want to logout?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-center gap-5">
                    <AlertDialogCancel className="">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={logout}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
