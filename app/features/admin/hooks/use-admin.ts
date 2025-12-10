import { backend } from "@/lib/backend-api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import pdfMake from "pdfmake/build/pdfmake";
// DO NOT DELETE THIS IMPORT
import pdfFonts from 'pdfmake/build/vfs_fonts';

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

