import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../api/hooks';
import { Container, ETypesInput, Input, TextType } from '@piximind/ds-p-23';
import {  Text } from '@piximind/ds-p-23';
import { FormEvent, useState} from 'react';
import { useForm } from '@piximind/custom-hook';
import { ValidationList } from './helpers/ValidationList';
import { signup } from '../../api/reducers/AuthReducer';
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FormFooter } from '../../../../sharedComponent/FormFooter';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { confirmPassword, emptyField, confirm, validPassword } from '../../../../sharedComponent/helpers/ErrorMsg';

export default function SignUp() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [send, setSend]=useState<boolean>(false);
    const [errors,setErrors]=useState<{ [key: string]: string }>({});

    const fields = ValidationList;
    const {state,onChange,isFormValid} = useForm({isRealTimeValidation: true, data: fields});
            
    const handleSign = async (e: React.FormEvent) : Promise<void> => {
        e.preventDefault();
        setErrors({});
        
        if (!state.firstName.value || !state.lastName.value || !state.email.value || !state.password.value ) {
            setErrors({message: emptyField});
            return;
        }
        if(!state.confirm.value) {
            setErrors({message: confirm});
        }

        if (state.password.value && state.password.value.toString().length < 8 ) {
            setErrors({message: validPassword});
            return;
        }

        if (state.password.value !== state.confirmPassword.value) {
            setErrors({message: confirmPassword});
            return;
        }

        if(!isFormValid) {
            return;
        }

        try {

           await dispatch(signup({
                firstName: state.firstName.value,
                lastName: state.lastName.value,
                email: state.email.value,
                password: state.password.value,
            })).unwrap();
            setSend(true);
        }
        catch(error){
            console.log(error);
            setErrors(error as { [key: string]: string });
        }
      }

    const handleConnect =(e : React.FormEvent) : void => {
        e.preventDefault();
        navigate('/login');
    }

    const buttons = [
       {
         text: 'S’inscrire',
         handleButtonClick: (e: FormEvent<Element>) => handleSign(e)
       },
        { 
          text: 'Se connecter',
          handleButtonClick: (e: FormEvent<Element>) => handleConnect(e)}
    ]
    
    return(
        <>
        {
            send ? (
                <div className="ds-p-100 ds-m-100">
                    <div className='ds-flex ds-justify-center ds-text-size-80 ds-mb-20'>
                    <MdOutlineMarkEmailRead className='ds-text-success700' />
                    </div>                   
            <Text
               text="Un lien a été envoyé à votre adresse e-mail. Ce lien expirera dans 2 heures."
               className="ds-text-success800 ds-text-size-26 ds-flex ds-justify-center"
               onPointerEnterCapture={undefined} 
               onPointerLeaveCapture={undefined}
            /> 
            <Text
               text="
               Veuillez le consulter pour activer votre compte."
               className="ds-text-neutral700 ds-text-size-23 ds-flex ds-justify-center"
               onPointerEnterCapture={undefined} 
               onPointerLeaveCapture={undefined}
            />    
            <div className='ds-flex ds-justify-center ds-text-size-20'>
                <Link to='/login' className='ds-text-neutral500'>Retourner à la page Connexion</Link>  
            </div>
            </div>
            ):(
        <div className='ds-flex-col ds-center'>
        <form className='ds-blur4 ds-p-20 ds-mt-10 ds-mb-10 ds-border-radius-8 ds-w-35'>
        <Text 
            text='Inscription'
            className='ds-flex ds-mb-20 ds-justify-center ds-text-size-44'
            style={{color: '#41448f', fontWeight: 'bold'}}
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
        />
        {
            fields.map((field, index)=>(
                <Container
                key={index}
                className='ds-mb-15'
                children = {
                    <>
                    {
                        (field.type ==='check' )? (
                            <Form.Check
                            type='checkbox'
                            id= 'default-checkbox'
                            label={field.label}
                            checked={state[field.key].value as boolean}
                            disabled={false}
                            className='ds-text-size-17 ds-text-neutral500'
                            onClick={(e: React.MouseEvent<HTMLInputElement>)=>{const target = e.target as HTMLInputElement; onChange({ key: field.key, value: target.checked})}}
                          />

                        ): (
                            <Input 
                            label={field.label}
                            type = {field.type ==="password"? ETypesInput.password : ETypesInput.text} 
                            value={state[field.key].value as string}
                            autoComplete={`current-${field.key}`}
                            onChange={(e : React.ChangeEvent<HTMLInputElement>)=>onChange({ key: field.key, value: e.target.value })}
                            className='ds-bg-neutral50'
                            onPointerEnterCapture={undefined} 
                            onPointerLeaveCapture={undefined}
                        />
                        )
                    }
                {
                    state[field.key].errorMessage &&                
                    <Text
                    text={state[field.key].errorMessage }
                    className="ds-text-error600"
                    type={TextType.caption} 
                    onPointerEnterCapture={undefined} 
                    onPointerLeaveCapture={undefined}
                />
                }
                    </>
                }
                />
            ))
        }
        <Container>
        <FormFooter
        errors ={errors}
        text = 'Vous avez déjà un compte ?'
        buttons={buttons}
        />
        </Container>
        </form>
        </div>
            )
        }
        </>
)
}
