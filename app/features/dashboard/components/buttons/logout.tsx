import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/primitives/alert-dialog"
import { Button } from "@/components/primitives/button"
import { useAuthActions } from "@/features/auth/context/AuthP"
export function LogoutButton() {
    const { logout } = useAuthActions()

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
