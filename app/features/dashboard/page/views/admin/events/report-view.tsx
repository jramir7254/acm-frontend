import React, { useRef } from 'react'
import { useReactToPrint } from "react-to-print";
import html2canvas from 'html2canvas-pro'
import { jsPDF } from 'jspdf'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font, } from '@react-pdf/renderer';
import { ScrollArea } from '@/components/primitives/scroll-area';
import { Centered } from '@/components/layout';
import { Button } from '@/components/primitives/button';


Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
    heading: {
        fontSize: 14,
        // fontStyle: 'oblique'

    },
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald'
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'Oswald'
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

export default function ReportView() {
    const printRef = useRef(null);

    const print = useReactToPrint({
        contentRef: printRef,
        documentTitle: "Report",
    });

    const p = () => {
        const pdf = new jsPDF({
            unit: 'in',
            format: [8.5, 11]
        })



        pdf.text("text", 10, 10)

        pdf.save('t.pdf')
    }

    return (
        <div className="size-full space-y-4">
            <Button onClick={p}>Print</Button>

            {/* SCREEN PREVIEW — scrollable */}
            <ScrollArea className="h-[500px] border p-4 bg-gray-100 print:hidden">
                <div className="space-y-4">
                    <div className="w-letter h-letter bg-accent p-6 shadow">
                        <h1>Page 1 preview</h1>
                    </div>
                    <div className="w-letter h-letter bg-accent p-6 shadow">
                        <h1>Page 2 preview</h1>
                    </div>
                </div>
            </ScrollArea>

            {/* ACTUAL PRINT CONTENT — NOT SCROLLABLE */}
            <div className="hidden print:block" ref={printRef}>
                <div className="print-page">
                    <h1>Page 1 actual content</h1>
                </div>

                <div className="print-page break-before-page">
                    <h1>Page 2 actual content</h1>
                </div>
            </div>
        </div>
    );
}
