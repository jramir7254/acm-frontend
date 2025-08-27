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
import { useCancelRsvp } from "@/features/events/hooks/use-events";
import { useMe } from "@/features/auth/hooks/use-me";
export function CancelRsvpButton({ eventId }: { eventId: string }) {
    const { data: user } = useMe();
    const cancelRsvpMutation = useCancelRsvp(eventId, user?.epccId);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Cancel</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-fit bg-accent">
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-quick font-medium">Are you sure you want to cancel your RSVP?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-center gap-5">
                    <AlertDialogCancel className="">Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button variant='destructive' onClick={() => cancelRsvpMutation.mutate()}>
                            Confirm
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
