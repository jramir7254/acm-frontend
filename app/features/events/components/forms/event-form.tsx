// event-form.tsx

import { z } from "zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { Button } from "@/components/primitives/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "../../types/schemas"; // assumes schema with startAt/endAt (Date)
import { useIsMobile } from '@/hooks'

import type { Event } from "../../types/event";

import { ImageField } from "./event-form/image-field";
import { DatetimeFields } from "./event-form/datetime-fields";
import { BaseFields } from "./event-form/base-fields";
import { SelectTypeField } from "./event-form/select-type-field";
import { ScrollArea } from "@/components/primitives/scroll-area";
import { DescriptionField } from "./event-form/description-field";
import { ExtraFields } from "./event-form/extra-fields";

type EventFormValues = z.infer<typeof eventSchema>;

export type EventReactForm = {
    form: UseFormReturn<EventFormValues>; // <-- critical for IntelliSense
};


export function EventForm({
    handleSubmit,
    event
}: {
    handleSubmit: (form: EventFormValues) => void,
    event?: Event | null
}) {
    const isMobile = useIsMobile()

    const defaultValues: EventFormValues = event
        ? { ...event, startAt: new Date(event.startAt), endAt: new Date(event.endAt) }
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


    return (
        <ScrollArea>
            <form
                id="event-form"
                onSubmit={form.handleSubmit(handleSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 max-h-[60vh] md:max-h-none"
            >

                {isMobile ? (
                    <div className=" space-y-5">
                        <ImageField form={form} />
                        <BaseFields form={form} />
                        <div className="flex flex-col gap-3">
                            <DatetimeFields form={form} />
                        </div>

                        <DescriptionField form={form} />

                        <SelectTypeField form={form} />
                        <ExtraFields name="externalLink" form={form} />

                        <ExtraFields name="resources" form={form} />
                        <ExtraFields name="requirements" form={form} />
                    </div>

                ) : (

                    <>

                        <div className="flex flex-col space-y-5 pr-5">
                            <BaseFields form={form} />
                            <div className="flex  gap-3">
                                <DatetimeFields form={form} />
                            </div>
                            <DescriptionField form={form} />
                        </div>



                        <div className="pl-5 flex flex-col gap-5">
                            <ImageField form={form} />

                            <div className="flex flex-col justify-between flex-1">
                                <div className="flex gap-5">
                                    <SelectTypeField form={form} />
                                    <ExtraFields name="externalLink" form={form} />
                                </div>

                                <ExtraFields name="resources" form={form} />
                                <ExtraFields name="requirements" form={form} />
                            </div>
                        </div>
                    </>
                )}


            </form>
        </ScrollArea>

    );
}
