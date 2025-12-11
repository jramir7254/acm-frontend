
import { Button } from "@/components/primitives/button"
import ConfirmationModal from "@/components/ui/confirmation"
import { useCancelRsvp } from "@/features/events/hooks/event/mutations";
export function CancelRsvpButton({ eventId }: { eventId: string | number }) {

    const cancelRsvpMutation = useCancelRsvp(eventId);

    return (
        <ConfirmationModal title="Are you sure you want to cancel your RSVP?" onConfirm={() => cancelRsvpMutation.mutate()}>
            <Button variant="outline">Cancel</Button>
        </ConfirmationModal>

    )
}
