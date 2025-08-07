import UpdateConnector from "../../../interfaces/connectors/UpdateConnector";

export const connectorFields = (connector: UpdateConnector) => [
    {
      label: 'API Key',
      value: connector?.apiKey,
      name: 'apiKey',
    },
    {
      label: 'Imprimante',
      value: connector?.printerName,
      name: 'printerName',
      type:'select',
    },
]