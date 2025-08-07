import Connector from "../../../interfaces/Connector";

export const connectorFields = (connector: Connector) => [
    {
      label: 'Nom du connecteur',
      value: connector?.connectorName,
      name: 'connectorName',
    },
    {
      label: 'Site web',
      value: connector?.webSite,
      name: 'webSite',
      type:'text',
    },
]