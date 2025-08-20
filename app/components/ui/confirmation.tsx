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
            <AlertDialogContent className="w-fit bg-accent">
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-quick font-medium">
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-center gap-5">
                    <AlertDialogCancel className="">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant='destructive' onClick={onConfirm}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}