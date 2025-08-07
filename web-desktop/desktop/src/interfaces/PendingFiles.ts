export default interface PendingFiles {
    _id: string,
    user: string,
    connectorName: string,
    connectorId: string,
    printerName: string,
    pendingFiles: [{
        pdfBase64: string,
        _id: string,
    }],
    count: number,
}