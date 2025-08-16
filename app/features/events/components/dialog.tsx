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

type Props = {
    children: React.ReactNode,
    title: string,
    description?: string,
    onConfirm: () => void
}

export default function Dialog({ children, title, description, onConfirm }: Props) {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="w-fit bg-accent">
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-quick font-medium">{title}</AlertDialogTitle>
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