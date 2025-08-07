import ProfileField from "../../../../interfaces/ProfileFields";
import EditUser from "../../../../interfaces/user/EditUser";
import moment from 'moment';

export const profileDetailsFields = (data: EditUser | undefined, edit: boolean): ProfileField[] => {
  let profileFields: ProfileField[] = [
    {
      label: 'Adresse mail',
      value: data?.email ? data?.email : "",
      name:'email',
      className: data?.email  ? 'ds-text-size-15':'ds-text-size-14',
      style: data?.email ? {color: '#41448f'} : {color: '#8e98a4'},
    },
    {
      label: 'Identité de genre',
      type: 'radio',
      name:'gender',
      value: data?.gender || edit ? data?.gender : "Veillez ajouter votre identité de genre",
      options: [
        { label: 'Homme', value: 'Homme' },
        { label: 'Femme', value: 'Femme' }
      ],
      className:  data?.gender ? 'ds-text-size-15':'ds-text-size-14',
      style: data?.gender ? {color: '#41448f'} : {color: '#8e98a4'},
    },
    {
      label: 'Date de naissance',
      type: 'date',
      name:'birthDate',
      value: data?.birthDate || edit ? moment(data?.birthDate as Date).format("DD/MM/YYYY") : "Veillez ajouter votre date de naissance",
      className: data?.birthDate ? 'ds-text-size-15':'ds-text-size-14',
      style: data?.birthDate ? {color: '#41448f'} : {color: '#8e98a4'},
    },
    {
      label: 'N° de téléphone',
      type: 'number',
      name:'tel',
      value: data?.tel || edit ? data?.tel : "Veillez ajouter votre numéro de téléphone",
      className: data?.tel ? 'ds-text-size-15':'ds-text-size-14',
      style: data?.tel ? {color: '#41448f'} : {color: '#8e98a4'},
    },
    {
      label: 'Pays / Région',
      value: data?.country || edit ? data?.country : "Veuillez ajouter votre Pays/Région",
      name:'country',
      className: data?.country ? 'ds-text-size-15':'ds-text-size-14',
      style: data?.country ? {color: '#41448f'} : {color: '#8e98a4'},
    },
    {
      label: 'Profil',
      value: data?.profile || edit ? data?.profile : "Veuillez ajouter votre profil",
      name:'profile',
      className: data?.profile? 'ds-text-size-15' :'ds-text-size-14',
      style: data?.profile ? {color: '#41448f'} : {color: '#8e98a4'},
    }
  ];

  const nameFields = [
    {
      label: 'Prénom',
      value: data?.firstName ? data?.firstName : "",
      name: 'firstName',
      className: 'ds-text-size-15',
      style: {color: '#41448f'},
    },
    {
      label: 'Nom',
      value: data?.lastName ? data?.lastName : "",
      name :'lastName',
      className: 'ds-text-size-15',
      style: {color: '#41448f'},
    }
  ];

  const fullNameField = [
    {
      label: 'Nom et prénom',
      value: data?.firstName ? `${data.firstName} ${data.lastName || ''}` : '',
      className: 'ds-text-size-15',
      style: {color: '#41448f'}
    }
  ];

  if (edit) {
    profileFields = [...nameFields, ...profileFields];
  } else {
    profileFields = [...fullNameField, ...profileFields];
  }

  return profileFields;
};

