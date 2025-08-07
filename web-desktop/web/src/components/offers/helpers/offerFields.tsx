import { Offer } from "../../../interfaces/Offer";

export const offerFields = (change: Offer) => [
    {
      label: 'Titre',
      value: change?.title,
      name: 'title',
    },
    {
      label: 'Description',
      value: change?.description,
      name: 'description',
      type:'text',
    },
    {
        label: 'Nombre de tickets',
        value: change?.ticketsNumber,
        name: 'ticketsNumber',
        type: 'number',
      },
    {
        label: "Date d'expiration",
        value: change?.expirationDate,
        name: 'expirationDate',
        type: 'date',
      },
    {
      label: 'Prix unitaire',
      value: change?.unitPrice,
      name: 'unitPrice',
      type: 'number',
    },
    {
      label: 'Remise',
      value: change?.discount,
      name: 'discount',
      type: 'number',
    },
    {
      label: 'TVA',
      value: change?.tva,
      name: 'tva',
      type: 'number',
    },
];
