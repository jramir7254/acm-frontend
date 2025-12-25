import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/primitives/alert-dialog"
import { Button } from "../primitives/button"

type Props = {
    children: React.ReactNode,
    title: string,
    description?: string,
    onConfirm: () => void
}

export default function ConfirmationModal({ children, title, description, onConfirm }: Props) {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="w-fit ">
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-osans tracking-wide font-medium">
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-center gap-5">
                    <AlertDialogCancel className="">Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button variant='default' className="text-shadow-amber-50!" onClick={onConfirm}>
                            Confirm
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}