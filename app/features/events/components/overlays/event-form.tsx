// event-form.tsx
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, Textarea, DateTimePickerInput, SelectInput } from "@/components/input";
import { Form } from "@/components/primitives/form";
import { useEditEvent, useCreateEvent } from "../../hooks/event/mutations";
import { eventSchema } from "../../types/schemas"; // assumes schema with startAt/endAt (Date)
import { useEventContext } from "../../context/event-context";
import { buildSelectVals } from "@/lib/utils";
import { Empty } from "@/components/primitives/empty";
import { Image } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/primitives/dialog"
import { Button } from "@/components/primitives/button";

type EventFormValues = z.infer<typeof eventSchema>;

export default function EventForm({ mutateAsync, setOpen }: { mutateAsync: any, setOpen: any }) {
    const event = useEventContext();
    const insideEvent = event !== undefined; // only true if provider gave us an event
    const updateEvent = useEditEvent()

    // Adjust these to your actual event shape
    const defaultValues: Partial<EventFormValues> = insideEvent
        ? event
        : {
            title: "",
            host: "",
            imageUrl: "",
            type: 'workshop',
            externalLink: "",
            requirements: "",
            resources: "",
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
            await updateEvent.mutateAsync({ id: event?.id, form: values });
            return;
        }
        await mutateAsync(values);
        setOpen(false)
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
                    <Empty className="border-2 rounded h-[35vh] max-h-[35vh] overflow-hidden relative ">
                        <Dialog>
                            <DialogTrigger asChild className="cursor-pointer">
                                {imgUrl ? (
                                    <img
                                        src={imgUrl}
                                        alt="Event preview"
                                        className=" absolute inset-0 w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className=" absolute inset-0 w-full h-full flex items-center justify-center">
                                        <Image />

                                    </div>
                                )}
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogDescription>
                                        <FormInput name="imageUrl" label="Image URL" />
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button>Save changes</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </Empty>
                </div>

                <div className="col-span-1">
                    <div className="flex gap-5">
                        <SelectInput
                            label="Type of event"
                            name="type"
                            values={buildSelectVals(['meeting', 'workshop', 'external', 'major', 'recurring', 'hackathon', 'datathon', 'extra_credit'])}
                        />
                        <FormInput name="externalLink" label="External Link" />
                    </div>

                    <FormInput name="resources" label="Resources" />
                    <FormInput name="requirements" label="Requirements" />


                </div>

                <FormInput name="description" className="col-span-1 px-10 mt-5" label="Description">
                    {(field) => <Textarea className="resize-none h-[15vh]" {...field} />}
                </FormInput>
            </form>

        </Form>
    );
}
