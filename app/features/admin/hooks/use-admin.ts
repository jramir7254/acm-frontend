import { backend } from "@/lib/backend-api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { saveAs } from "file-saver";
import pdfMake from "pdfmake/build/pdfmake";
// DO NOT DELETE THIS IMPORT
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { queryKeys } from "@/lib/query-keys";

export function useEventsReportExcel() {
    return useMutation({
        mutationFn: () => backend.get(
            '/admin/events/report',
            { responseType: 'blob', params: { type: 'excel' } }
        ),
        onSuccess: (data) => {
            toast.success("Excel Downloaded")
            const blob = data
            saveAs(blob, "epcc-2025-workshop-data.xlsx");
            // pdfMake.createPdf(data).open()
        }
    })
}
export function useEventsReportPdf() {
    return useMutation({
        mutationFn: () => backend.get(
            '/admin/events/report',
            { params: { type: 'pdf' } }
        ),
        onSuccess: (data) => {
            toast.success("PDF Generated")
            pdfMake.createPdf(data).open()
        }
    })
}



export function useAssignRole(epccId: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (roleData: { id: number, name: Role }) => backend.put(
            `/admin/users/${epccId}/role`,
            roleData
        ),
        onSuccess: () => {
            toast.success("Role applied")
            // Option A: immediate UI update
            // qc.setQueryData(userKeys.me, (prev: any) => ({ ...prev, ...data }));
            // Option B (or in addition): refetch fresh data
            qc.invalidateQueries({ queryKey: usersKeys.one(epccId) })
        },
        onError: () => {
            toast.error('Could not change role')
        }
    });
}

export function useAddAttendance(epccId: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (events: number[]) => backend.put(
            `/admin/users/${epccId}/attendance`,

            events),
        onSuccess: () => {
            toast.success("Added to events")
            // Option A: immediate UI update
            // qc.setQueryData(userKeys.me, (prev: any) => ({ ...prev, ...data }));
            // Option B (or in addition): refetch fresh data
            qc.invalidateQueries({ queryKey: queryKeys.users.detail.base(epccId) })
        },
        onError: () => {
            toast.error('Could not add to events')
        }
    });
}
