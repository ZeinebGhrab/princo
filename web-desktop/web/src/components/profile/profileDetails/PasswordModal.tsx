import React, { useState } from 'react';
import {  Form, Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../api/hooks';
import { updateUser } from '../../../api/reducers/ProfileReducer';
import { Validation } from '@piximind/validation';
import { ETypesInput, TextType } from '@piximind/ds-p-23/lib/esn/Interfaces';
import { Container, Input, Text } from '@piximind/ds-p-23';
import Props from '../../../interfaces/props/Props';
import ComponentButton from '../../../../../sharedComponent/ComponentButton';
import { confirmPassword, emptyField, validPassword } from '../../../../../sharedComponent/helpers/ErrorMsg';
import randomstring from 'crypto-random-string';

export default function PasswordModal({ show, handleClose }: Props) {

    const [change, setChange] = useState({
        password:'',
        confirmPass :'',
        confirm: false,
    });

    const validation = new Validation();
    const dispatch = useAppDispatch();
    const data = useAppSelector(state=>state.authentication.data);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const fields = [
        {
            label: 'Nouveau mot de passe',
            name: 'password',
            value: change.password
        },
        {
            label : 'Confirmer le mot de passe',
            name : 'confirmPass',
            value: change.confirmPass

        }
    ]

    const handleCancel = () => {
        handleClose();
        setChange({} as { password: string; confirmPass: string; confirm: boolean; });
        setErrors({});
    }
    const handleChange = async() => {
        if ( validation.isEmpty(change.password) || validation.isEmpty(change.confirmPass) ) {
                setErrors({message: emptyField});
                return;
            }

            if ( change.password !== change.confirmPass ) {
                setErrors({message: confirmPassword});
                return;
            }
            if (change.password.length < 8) {
                setErrors({messagePass: validPassword});
                return;
            }

        try {
            await dispatch(updateUser({id: data?.id , updateUser: {password : change.password} , token : data?.token})).unwrap();
            setChange({} as { password: string; confirmPass: string; confirm: boolean; });
            handleCancel();
        } catch(error) {
            console.log(error);
        }
    };

    const generatePassword = (verify: boolean) => {
            if(verify) {
                const password = randomstring({ length: 12 });
            setChange({
                confirm: true,
                password: password,
                confirmPass: password,
    
            });
            }else {
                setChange({
                    password:'',
                    confirmPass :'',
                    confirm: false,
                });
            }
          
      };

    return (
        <Modal show={show} onHide={handleCancel} centered>
            <Modal.Header closeButton>
                <Modal.Title >
                <Text
                text='Changer mon mot de passe'
                className='ds-flex ds-mb-1 ds-text-size-26 ds-ml-14'
                style = {{color: '#41448f'}}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    fields.map((field, index)=>{
                        return(
                            <Container key={index} className="ds-mb-15">
               <Input
                label= {field.label}
                type={change.confirm ? ETypesInput.text : ETypesInput.password}
                value={field.value}
                name= {field.name}
                autoComplete={`current-${field.name}`}
                onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChange({...change, [field.name]: e.target.value})}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            {errors && errors['messagePass'] && (
                <Text
                text='Minimum 8 caractères'
                className="ds-text-error600"
                type={TextType['subtitle-1']}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            )}
            </Container>
                        )
                    })
                }
        {errors && errors['message'] && (
        <Container>
          <Text
            text={errors['message']}
            className="ds-text-error600 ds-ml-3 ds-mt-15"
            type={TextType['subtitle-1']}
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          />
        </Container>
      )}
            <Container
            children ={
                <>
        <Form.Check
            type='checkbox'
            id= 'default-checkbox'
            label='Générer un mot de passe'
            checked ={change.confirm}
            disabled={false}
            className='ds-text-size-17 ds-text-neutral500'
            onClick={(e:  React.MouseEvent<HTMLInputElement>) =>  { const target = e.target as HTMLInputElement;generatePassword(target.checked)} }
          />
                </>  
            }
            />
            </Modal.Body>
            <Modal.Footer className='ds-flex ds-justify-center ds-w-100'>
            <ComponentButton
            buttons ={
            [
              {
                text: 'Enregistrer',
                handleButtonClick: ()=>handleChange()
        
              },
              {
                text: 'Annuler',
                handleButtonClick: ()=> handleCancel()
              },
        
            ]
          }
          size= 'meduim'
          />      
            </Modal.Footer>
        </Modal>
    );
}

