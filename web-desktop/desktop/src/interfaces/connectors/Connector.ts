export default interface Connector {
    _id? : string,
    connectorName: string,
    printerName?: string,
    apiKey: string,
    webSite: string,
    active : boolean,
}