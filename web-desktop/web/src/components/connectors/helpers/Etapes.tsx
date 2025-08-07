import { FcLinux } from "react-icons/fc";
import { SiApple, SiWindows10 } from "react-icons/si";


export const Etapes = () => [
    {
        title : "Etape 1",
        description : "Télécharger l'application desktop de votre imprimante",
        details : [
            {
                label: 'Windows',
                icon:  <SiWindows10/>
                ,
            },
            {
                label: 'MacOs',
                icon: <SiApple/>
            },
            {
                label: 'Linux',
                icon: <FcLinux/>,
            }
        ]
    },
    {
        title : "Etape 2",
        description : "Connectez l'imprimante à votre ordinateur",
        details : "Assurez-vous que l'imprimante est connectée à votre ordinateur. L'application peut utiliser plusieurs imprimantes à la fois.",
    },
    {
        title : "Etape 3",
        description : "Associer le site à votre ordinateur",
        details : "Copier le token du connecteur dans votre espace manager et mettez le dans l'application. Choisissez l'imprimante dans laquelle vous allez imprimer votre ticket de caisse ou vos factures.",
    }
]