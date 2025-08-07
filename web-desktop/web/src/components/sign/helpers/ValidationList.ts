import { EListFunction } from "@piximind/custom-hook";

export const ValidationList = [
  {
    label: 'Prénom',
    key: 'firstName',
    value: '',
    isRealTimeValidation: true,
    rules: [
      {
        priority: 1,
        function: EListFunction.isNotEmpty,
        messageError: 'Veuillez saisir un prénom.'
      },
    ],
  },
  {
    label: 'Nom',
    key: 'lastName',
    value: '',
    isRealTimeValidation: true,
    rules: [
      {
        priority: 1,
        function: EListFunction.isNotEmpty,
        messageError: 'Veuillez saisir un nom.'
      },
    ],
  },
  {
    label: 'Adresse email',
    key: 'email',
    value: '',
    isRealTimeValidation: true,
    rules: [
      {
        priority: 1,
        function: EListFunction.isMail,
        messageError: 'Veuillez saisir un adresse email valide.'
      },
    ],
  },
  {
    label:'Mot de passe',
    type : 'password',
    key: 'password',
    value: '',
    isRealTimeValidation: true,
    rules: [
      {
        priority: 1,
        function: EListFunction.isNotEmpty,
        messageError: 'Veuillez saisir un mot de passe.'
      },
    ],
  },
  {
    label:'Confirmation de Mot de passe',
    type : 'password',
    key: 'confirmPassword',
    value: '',
    isRealTimeValidation: true,
    rules: [
      {
        priority: 1,
        function: EListFunction.isNotEmpty,
        messageError: ''
      },
    ],
  },
  {
    label: "J'accepte les conditions d'utilisation",
    type:'check',
    key: 'confirm',
    value: '',
    isRealTimeValidation: false,
    rules: [
      {
        priority: 1,
        function: EListFunction.isTrue,
        messageError: ''
      },
    ],
  },
];

