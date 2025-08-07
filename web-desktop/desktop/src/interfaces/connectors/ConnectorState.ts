import Connector from "./Connector";

export default interface ConnectorAuth {
    apiKey: string | undefined;
    count: number;
    connectors: Connector[] | Connector;
}
