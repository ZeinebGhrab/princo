export default interface ImpressionNotif {
    date: string;
    message: string;
    status: string;
    impression: boolean;
    printerName: string;
    pdfBase64: string,
    index: number;
    connectorId: string,
}