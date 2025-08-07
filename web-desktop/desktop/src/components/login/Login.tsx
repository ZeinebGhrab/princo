import { useNavigate } from 'react-router-dom';
import { Validation } from '@piximind/validation';
import { FormEvent, useState } from 'react';
import LoginUser from '../../interfaces/user/LoginUser';
import { useAppDispatch } from '../../api/hooks';
import { authenticateUser } from '../../api/reducers/AuthReducer';
import { Input, ETypesInput, Container } from '@piximind/ds-p-23';
import {  ESizeInput } from '@piximind/ds-p-23/lib/esn/Interfaces';
import Cookies from 'js-cookie';
import { FormFooter } from '../../../../sharedComponent/FormFooter';
import { validLogin } from '../../../../sharedComponent/helpers/ErrorMsg';
import princo from "../../../../assets/princoLogo.png";
import { Form } from 'react-bootstrap';

export default function Login() {

    const navigate = useNavigate();
    const [user, setUser] = useState<LoginUser>({
        email: Cookies.get('rememberedEmail') || '',
        password: Cookies.get('rememberedPassword') || '',
        rememberMe: Cookies.get('rememberedMe') === 'true',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const validation = new Validation();
    const dispatch = useAppDispatch();

    const cookieProperties = [
        {
            name: 'rememberedEmail',
            value: user.email
        }, 
        {
            name: 'rememberedPassword',
            value: user.password
        }, 
        {
            name: 'rememberedMe',
            value: 'true'
        }];

    const handleConnect = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if (!validation.isMail(user.email) || validation.isEmpty(user.password)) {
            setErrors({ message: validLogin });
            return;
        }
        
        try {
            await dispatch(authenticateUser({ email: user.email, password: user.password, rememberMe: user.rememberMe })).unwrap();
            if (user.rememberMe) {
                cookieProperties.map((cookie)=>{
                    Cookies.set(cookie.name, cookie.value, { expires: 30 });
                });
            } else {
                cookieProperties.map((cookie)=>{
                    Cookies.remove(cookie.name);
                });
            }     
            navigate('/');
        } catch (error) {
            console.log(error);
            setErrors(error as { [key: string]: string });
        }
    };

    const fields =[
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

    return (
        <div className='ds-flex ds-justify-center ds-p-30'>
            <form className='ds-blur4 ds-p-20 ds-border-radius-8 ds-w-35 ds-m-100 ds-box-shadow2' onSubmit={(e: FormEvent)=>e.preventDefault()}>
            <fieldset>
        <legend>
            <div className='ds-flex ds-center ds-mb-20'>
                <img src={princo} alt="" />
            </div>
        </legend>
                
{
  fields.map((field, index) => (
    <>
      {
        field.type === "check" ? (
          <>
            <Container>
              <Form.Check
                type='checkbox'
                id= 'default-checkbox'
                label={field.label}
                checked={field.value}
                disabled={false}
                className='ds-text-size-17 ds-text-neutral500'
                onClick={(e: React.MouseEvent<HTMLInputElement>) => {const target = e.target as HTMLInputElement; setUser({...user,[field.name]: target.checked})}}
                />
            </Container>
          </>
        ) : (
          <Container key={index}>
            <Input 
              label={field.label}
              containerClassName='ds-mb-13'
              className='ds-bg-neutral50'
              type={field.name ==='password' ?  ETypesInput.password : ETypesInput.text}
              inputSize={ESizeInput.large}
              value={field.value as string}
              autoComplete={`current-${field.name}`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setUser({...user,[field.name]: e.target.value})}}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </Container>
        )
      }
    </>
  ))
}
            <Container className="ds-mt-15">
             <FormFooter
                errors ={errors}
                buttons ={[{
                    text: 'Se connecter',
                    handleButtonClick: (e: React.FormEvent) => handleConnect(e)
                }]}
              />
            </Container>
             </fieldset>
            </form>
        </div>
    );
}


       