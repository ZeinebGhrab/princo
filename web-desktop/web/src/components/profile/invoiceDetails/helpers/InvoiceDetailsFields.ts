import ProfileInvoiceDetails from "../../../../interfaces/user/InvoiceDetails";

export const InvoiceDetailsFields = (data:  ProfileInvoiceDetails | undefined, edit: boolean) => [
    {
        label: 'Raison Sociale',
        value: data?.legalName || edit ? data?.legalName : "Veuillez ajouter votre raison sociale",
        name: 'legalName',
        className: data?.legalName ? 'ds-text-size-15' :'ds-text-size-14',
        style: data?.legalName ? {color: '#41448f'} : {color: '#8e98a4'},
      },
      {
        label: 'Matricule fiscale',
        value: data?.fiscalId || edit ? data?.fiscalId : "Veuillez ajouter votre matricule fiscale",
        name:'fiscalId',
        className: data?.fiscalId ? 'ds-text-size-15' :'ds-text-size-14',
        style: data?.fiscalId ? {color: '#41448f'} : {color: '#8e98a4'},
      },
      {
        label: 'Adresse du siège social',
        value: data?.adress || edit ? data?.adress :"Veuillez ajouter votre adresse du siège social",
        name: 'adress',
        className:  data?.adress ? 'ds-text-size-15' :'ds-text-size-14',
        style: data?.adress ? {color: '#41448f'} : {color: '#8e98a4'},
      },
      {
        label: 'Pays',
        value: data?.country || edit ? data?.country : "Veuillez ajouter votre pays",
        name: 'country',
        className:  data?.country ? 'ds-text-size-15' :'ds-text-size-14',
        style: data?.country ? {color: '#41448f'} : {color: '#8e98a4'},
      },
      {
        label: 'Ville',
        value: data?.city || edit ? data?.city :"Veuillez ajouter votre ville",
        name: 'city',
        className:  data?.city ? 'ds-text-size-15' :'ds-text-size-14',
        style: data?.city ? {color: '#41448f'} : {color: '#8e98a4'},
      },
      {
        label: 'Code Postal',
        value: data?.postalCode || edit ? data?.postalCode : "Veuillez ajouter votre code postal",
        name: 'postalCode',
        className:  data?.postalCode ? 'ds-text-size-15' :'ds-text-size-14',
        style: data?.postalCode ? {color: '#41448f'} : {color: '#8e98a4'},
      },
]