import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/primitives/form";
import { DatePickerInput } from "./calendar-input";
import { Textarea } from "@/components/primitives/textarea";

import FormInput from "@/components/input/form-input";
import type { Event } from "@/types";
import { eventSchema } from "../utils/schemas";

type EventFormValues = z.infer<typeof eventSchema>;




export default function EditForm({ event }: { event?: Event }) {

    const form = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: event?.title || "",
            host: event?.host || "",
            imageUrl: event?.imageUrl || "",
            location: event?.location || "",
            date: event?.date || new Date(),
            description: event?.description || ""
        },
        mode: "all"
    })


    const submit = async (values: EventFormValues) => {
        console.log(form.getValues())
    };

    const controller = form.control

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} id="edit-form" className="space-y-6">
                <FormInput control={controller} name="title" label="Title" />
                <FormInput control={controller} name="host" label="Host or Presenter" placeholder="John Doe" />
                <FormInput control={controller} name="date" label="Date">
                    {field => (
                        <DatePickerInput
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                </FormInput>
                <FormInput control={controller} name="location" label="Location" />
                <FormInput control={controller} name="imageUrl" label="Image URL" />
                <FormInput control={controller} name="description" label="Description" >
                    {field => <Textarea {...field} />}
                </FormInput>
            </form>
        </Form>
    )
}
