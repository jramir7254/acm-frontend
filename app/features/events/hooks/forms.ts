// event-form.tsx

import { z } from "zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "../lib/schemas";

import type { Event } from "@/features/events/types"


type EventFormValues = z.infer<typeof eventSchema>;

export type EventReactForm = {
    form: UseFormReturn<EventFormValues>; // <-- critical for IntelliSense
};


export function useCreateOrUpdateEventForm(event?: Event) {

    const defaultValues: EventFormValues = event
        ? { ...event, startAt: new Date(event.startAt), endAt: new Date(event.endAt), requireSurvey: Boolean(event.requireSurvey) }
        : {
            title: "",
            host: "",
            imageUrl: "",
            type: 'workshop',
            externalLink: "",
            requirements: "",
            resources: "",
            location: "",
            requireSurvey: true,
            startAt: new Date(),
            endAt: new Date(),
            description: "",
        };

    return useForm<EventFormValues>({
        resolver: zodResolver(eventSchema),
        defaultValues,
        mode: "onChange",
    });
}