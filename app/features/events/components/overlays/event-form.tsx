// event-form.tsx
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, Textarea, DateTimePickerInput } from "@/components/input";
import { Form } from "@/components/primitives/form";
import { useEditEvent, useCreateEvent } from "../../hooks/use-events";
import { eventSchema } from "../../types/schemas"; // assumes schema with startAt/endAt (Date)
import { useEventContext } from "../../context/event-context";

type EventFormValues = z.infer<typeof eventSchema>;

export default function EventForm() {
    const event = useEventContext();
    const insideEvent = event !== undefined; // only true if provider gave us an event
    const updateEvent = useEditEvent()
    const createEvent = useCreateEvent();

    // Adjust these to your actual event shape
    const defaultValues: Partial<EventFormValues> = insideEvent
        ? {
            ...event,
            startAt: new Date(event?.startAt), // migrate if needed
            endAt: new Date(event?.endAt),
        }
        : {
            title: "",
            host: "",
            imageUrl: "",
            location: "",
            startAt: new Date(),
            endAt: new Date(),
            description: "",
        };

    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventSchema),
        defaultValues,
        mode: "onChange",
    });

    const submit = async (values: EventFormValues) => {
        if (insideEvent) {
            await updateEvent.mutate({ id: event?.id, form: values });
            return;
        }
        await createEvent.mutate(values);
    };

    const imgUrl = form.watch("imageUrl");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} id="event-form" className="grid grid-cols-2">
                <div className="col-span-1">
                    <FormInput name="title" label="Title" />
                    <FormInput name="host" label="Host or Presenter" placeholder="John Doe" />
                    <FormInput name="location" label="Location" />

                    <div className="flex gap-3">
                        <FormInput name="startAt" label="Start Date">
                            {(field) => (
                                <DateTimePickerInput
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        </FormInput>

                        <FormInput name="endAt" label="End Date">
                            {(field) => (
                                <DateTimePickerInput
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        </FormInput>
                    </div>
                </div>

                <div className="col-span-1 px-10">
                    <div className="border border-white/50 rounded h-[35vh] max-h-[35vh] overflow-hidden">
                        {/* add alt for a11y */}
                        <img className="object-cover" src={imgUrl || '#'} alt="Event preview" />
                    </div>
                    <FormInput name="imageUrl" label="Image URL" />
                </div>

                <FormInput name="description" className="col-span-2" label="Description">
                    {(field) => <Textarea className="resize-none h-[15vh]" {...field} />}
                </FormInput>
            </form>
        </Form>
    );
}
