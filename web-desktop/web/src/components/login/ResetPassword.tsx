import { Container, Input, Row, Text } from "@piximind/ds-p-23";
import { ESizeInput, ETypesInput, TextType } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { Validation } from "@piximind/validation";
import { useAppDispatch } from "../../api/hooks";
import { useEffect, useState } from "react";
import { resetPassword, verifyResetPassword } from "../../api/reducers/AuthReducer";
import { useNavigate } from "react-router-dom";
import { confirmPassword, emptyField } from "../../../../sharedComponent/helpers/ErrorMsg";
import { MdOutlineLockReset } from "react-icons/md";
import { FormFooter } from "../../../../sharedComponent/FormFooter";
import { Form } from "react-bootstrap";
import { FcExpired } from "react-icons/fc";


export default function ResetPassword ({email}: {email?: string | undefined}) {

    const [change, setChange] = useState({
        password:'',
        confirmPass :'',
        confirm: false,
    });

    const [check, setCheck] = useState<boolean>(true);

    const validation = new Validation()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [errors,setErrors]=useState<{ [key: string]: string }>({});


    const handleChange = async (e: React.FormEvent) =>{
        e.preventDefault()
        setErrors({});
        if (validation.isEmpty(change.password) 
        || validation.isEmpty(change.confirmPass) 
        )
         { 
            setErrors({message :  emptyField});
            return;
         }
         if (
        change.confirmPass !== change.password
        || change.password.length < 8
         )
         { 
            setErrors({message : confirmPassword});
            return ; 
         }

         if(!validation.isTrue(change.confirm)){
            setErrors({message : "Veuillez confirmer la réinitialisation de votre mot de passe."});
            return ; 
         }

         try {
            await dispatch(resetPassword({email : email , password: change.password})).unwrap();
            navigate('/');
         }
         catch(error){
            console.log(error);
            setErrors(error as { [key: string]: string });
         }
    }

    useEffect(()=>{
      const verify = async () : Promise<void> => {
        try {
          const response = await dispatch(verifyResetPassword({email})).unwrap();
          setCheck(response);
        }
        catch(error) {
          console.log(error);
        }
      }  
      verify();
    },[dispatch, email])

    const resetFields = [
    
        {
            label: 'Nouveau mot de passe',
            value: change?.password,
            name: 'password',
        },
        {
            label: 'Confirmer le mot de passe',
            value: change?.confirmPass,
            name: 'confirmPass',
        },
        {
            label: 'Valider mon mot de passe',
            value: change?.confirm,
            name: 'confirm',
            type : 'check',
        }
    
    ]


    return (
        <div className='ds-flex-col ds-center ds-p-100'>
           {
            check ? (
              <form className='ds-blur4 ds-p-10 border rounded ds-w-42 '>
              <div className='ds-flex ds-center ds-mb-10 ds-mt-5'>
              <MdOutlineLockReset className="ds-text-size-90 ds-flex ds-justify-center" style={{color: '#41448f'}}/>
              </div>
              <Text
                  text='Réinitialiser mon mot de passe'
                  className='ds-flex ds-mb-35 ds-mt-10 ds-justify-center ds-text-size-32'
                  style={{color: '#41448f', fontWeight: 'bold'}}
                  onPointerEnterCapture={undefined} 
                  onPointerLeaveCapture={undefined}
              />
             {
    resetFields.map((field, index) => {
      return (
        field.type === 'check' ? (
          <Container>
            <Form.Check
              type='checkbox'
              id= 'default-checkbox'
              label={field.label}
              checked={field.value}
              disabled={false}
              className='ds-text-size-17 ds-text-neutral500 ds-mb-20'
              onClick={(e: React.MouseEvent<HTMLInputElement>) => {const target = e.target as HTMLInputElement; setChange({ ...change, [field.name]: target.checked })}}
            />
          </Container>
        ) : (
          <Container key={index}>
            <Input
              label={field.label}
              type={ETypesInput.password}
              value={field.value as string}
              inputSize={ ESizeInput.medium}
              className="ds-bg-neutral50"
              autoComplete={`current-${field.name}`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChange({ ...change, [field.name]: e.target.value })}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            <Text
              text='Minimum 8 caractères'
              className="ds-text-error600"
              type={TextType.caption}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </Container>
        )
      );
    })
  }
  <Container>
  <FormFooter
                  errors ={errors}
                  buttons ={[
                      {
                          handleButtonClick : (e : React.FormEvent)=>handleChange(e),
                          text: 'Enregistrer'
                      }
                  ]}
                />
  </Container>
  
              </form>
            ): (
              <Row className="ds-m-90 ds-flex-col ds-center">
                <FcExpired className="ds-text-size-120 ds-flex ds-justify-center ds-mb-10" />
            <Text
                text= "Votre lien a été expiré"
                className="ds-text-warning500 ds-text-size-40"
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
            />
            </Row>
            )
           }
        </div>
    )
}