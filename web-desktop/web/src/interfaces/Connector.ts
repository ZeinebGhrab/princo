export default interface Connector {
    _id? : string,
    connectorName: string,
    webSite : string,
    apiKey ?: string,
    userId? : string | null ,
    isActive: boolean,
}