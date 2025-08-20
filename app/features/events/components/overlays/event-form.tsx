import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/primitives/form";
import { DatePickerInput } from "@/components/input/calendar-input";
import { Textarea } from "@/components/primitives/textarea";
import { useEditEvent, useCreateEvent } from "../../hooks/use-events";
import FormInput from "@/components/input/form-input";
import { eventSchema } from "../../types/schemas";

type EventFormValues = z.infer<typeof eventSchema>;
import { useEventContext } from "../cards";




export default function EventForm() {
    const event = useEventContext()
    const insideEvent = event !== null

    const defaultValues = insideEvent ? event : {
        title: "",
        host: "",
        imageUrl: "",
        location: "",
        date: new Date(),
        time: "",
        description: ""
    }


    const form = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues,
        mode: "onChange"
    })


    const submit = async (values: EventFormValues) => {
        if (insideEvent) {
            const updateEvent = useEditEvent(event?.id)
            await updateEvent.mutate(values)
            return
        }

        const createEvent = useCreateEvent()
        await createEvent.mutate(values)
        // console.log(form.getValues())
    };

    const imgUrl = form.watch('imageUrl')


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} id="event-form" className=" grid grid-cols-2 grid-rows-5">
                <FormInput name="title" label="Title" />
                <div className="col-span-1 row-span-3 border border-white/50 rounded">
                    <img className="cover" src={imgUrl}></img>
                </div>
                <FormInput name="host" label="Host or Presenter" placeholder="John Doe" />
                <FormInput name="location" label="Location" />

                <div className="col-span-1 flex">

                    <FormInput name="date" label="Date">
                        {field => (
                            <DatePickerInput
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    </FormInput>
                    <FormInput name="time" type="time" label="Time" />
                </div>
                <FormInput name="imageUrl" label="Image URL" />



                <FormInput name="description" className="col-span-2" label="Description" >
                    {field => <Textarea className="resize-none h-[10vh]" {...field} />}
                </FormInput>
            </form>
        </Form>
    )
}
