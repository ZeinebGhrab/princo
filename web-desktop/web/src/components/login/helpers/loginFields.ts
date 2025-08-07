import LoginUser from "../../../interfaces/user/LoginUser";

export const loginFields = (user : LoginUser)=> [
    
    {
        label: 'Adresse Email',
        value: user?.email,
        name: 'email',
    },
    {
        label: 'Mot de passe',
        value: user?.password,
        name: 'password',
    },
    {
        label: 'Se souvenir de moi',
        value: user?.rememberMe,
        name: 'rememberMe',
        type : 'check',
    }

]