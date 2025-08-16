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
import { useCancelRsvp } from "@/features/events/useEvents";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function CancelRsvpButton({ eventId }: { eventId: string }) {
    const { user } = useAuth();
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
                    <AlertDialogAction variant='destructive' onClick={() => cancelRsvpMutation.mutate()}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
