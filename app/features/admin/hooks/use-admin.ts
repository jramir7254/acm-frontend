import { backend } from "@/lib/api/client";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import pdfMake from "pdfmake/build/pdfmake";


export function useEventsReport() {
    return useMutation({
        mutationFn: () => backend.get(
            '/admin/events/report'
        ),
        onSuccess: (data) => {
            toast.success("Report Generated")
            pdfMake.createPdf(data).open()
        }
    })
}