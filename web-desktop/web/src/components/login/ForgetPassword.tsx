import { TextType, Text, Input, Container } from "@piximind/ds-p-23";
import { ESizeInput, ETypesInput} from "@piximind/ds-p-23/lib/esn/Interfaces";
import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "../../api/hooks";
import { forgetPassword } from "../../api/reducers/AuthReducer";
import { Validation } from "@piximind/validation";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FormFooter } from "../../../../sharedComponent/FormFooter";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

export default function ForgetPassword() {

    const [email, setEmail]= useState<string>('');
    const [errors, setErrors]= useState<{ [key: string]: string }>({});
    const [send, setSend] = useState<boolean>(false);
    const validation = new Validation()
    const dispatch = useAppDispatch();

    const handleSend = async(e: FormEvent) =>{
        try {
            e.preventDefault();
            if(!validation.isMail(email)) {
                setErrors({message : 'Veuillez saisir une adresse email valide'})
                return;
            }
            await dispatch(forgetPassword({email})).unwrap();
            setSend(true);
            
        }
        catch(error){
            setErrors(error as { [key: string]: string });
        }
    }

    return(
        <div className='ds-flex-col ds-center'>
            { send ? (
             <div className="ds-m-100 ds-p-100">
                    <div className='ds-flex ds-justify-center ds-text-size-80 ds-mb-20'>
                    <MdOutlineMarkEmailRead className='ds-text-success700' />
                    </div>
                    
            <Text
               text="Un email de réinitialisation a été envoyé à votre adresse e-mail."
               className="ds-text-success800 ds-text-size-27 ds-flex ds-justify-center"
               onPointerEnterCapture={undefined} 
               onPointerLeaveCapture={undefined}
            /> 
            <Text
               text="Veuillez le consulter pour réinitialiser votre mot de passe."
               className="ds-text-neutral700 ds-text-size-23 ds-flex ds-justify-center"
               onPointerEnterCapture={undefined} 
               onPointerLeaveCapture={undefined}
            />    
            <Text
               text="Cet email va expirer dans 10 minutes."
               className="ds-text-neutral500 ds-text-size-22 ds-flex ds-justify-center"
               onPointerEnterCapture={undefined} 
               onPointerLeaveCapture={undefined}
               />
            </div>
            )
            :
            (
         <form className='ds-blur4 ds-p-30 border rounded ds-w-37 ds-m-100'>
            <div className='ds-flex ds-center ds-mb-10'>
            <RiLockPasswordLine  className="ds-text-size-80 ds-flex ds-justify-center" style={{color: '#41448f'}}/>
            </div>
                <Text 
                    text='Mot de passe oublié'
                    className='ds-flex ds-mb-40 ds-justify-center'
                    style={{color: '#41448f', fontWeight: 'bold'}}
                    type={TextType['type-4']}
                    onPointerEnterCapture={undefined} 
                    onPointerLeaveCapture={undefined}
                    />
                    <Container
                    children = {
                        <>
                        <Input 
                    label='Adresse Email'
                    className='ds-m-100 ds-bg-neutral50'
                    inputSize={ ESizeInput.medium}
                    type = {ETypesInput.text} 
                    value={email} 
                    name='email' 
                    autoComplete='current-email'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail( e.target.value)}
                    onPointerEnterCapture={undefined} 
                    onPointerLeaveCapture={undefined}
                />
                <Text
                text='Un lien de réinitialisation sera envoyé à cette adresse email'
                className="ds-mb-20 ds-text-neutral800 ds-mt-3 ds-ml-2"
                type={TextType.caption}
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
                  />
                        </>
                    }
                     />
           
                <Container
                children = {
                    <>
                     <FormFooter
                     text = {<Link to='/login' style={{color: '#41448f', marginTop:'5px'}}>Retourner à la page Connexion</Link> as unknown as string}
                errors ={errors}
                buttons ={[
                    {
                        handleButtonClick : (e: FormEvent) =>handleSend(e),
                        text: 'Réinitialiser mon mot de passe'
                    }
                ]}
              />
                    </>
                }
                />  
            </form>
            )
            }
        </div>
    )
}