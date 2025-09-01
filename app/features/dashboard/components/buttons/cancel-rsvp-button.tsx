
import { Button } from "@/components/primitives/button"
import { useCancelRsvp } from "@/features/events/hooks/use-events";
import ConfirmationModal from "@/components/ui/confirmation"

export function CancelRsvpButton({ eventId }: { eventId: string | number }) {

    const cancelRsvpMutation = useCancelRsvp();

    return (
        <ConfirmationModal title="Are you sure you want to cancel your RSVP?" onConfirm={() => cancelRsvpMutation.mutate(eventId)}>
            <Button variant="outline">Cancel</Button>
        </ConfirmationModal>

    )
}
