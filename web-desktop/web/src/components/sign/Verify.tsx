import { Button, Row, Text,  } from "@piximind/ds-p-23";
import { Size, TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../api/hooks";
import { validate, verifyActiveAccount } from "../../api/reducers/AuthReducer";
import { FaUserCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FcExpired } from "react-icons/fc";

export default function Verify({ token, initMail, email, newEmail }: { token?: string | undefined, initMail?: boolean | undefined, email?: string | null, newEmail?: string | null }) {

    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [errors,setErrors] = useState<{ [key: string]: string }>({});
    const [check, setCheck] = useState<boolean>(false);

    const verify=async()=>{
        try {
            initMail? await dispatch(validate({token, email, newEmail})).unwrap() :await dispatch(validate({token, email})).unwrap();
            navigate('/');
        }
        catch(error) {
            console.log(error);
            setErrors(error as { [key: string]: string } );
        }
    }

    useEffect(()=>{
        const verifyActive = async () => {
           try {
            const response = await dispatch(verifyActiveAccount({email})).unwrap();
            setCheck(response);
           } catch(error) {
            console.log(error);
           }
        }   
        verifyActive(); 
    })

    return(
        <>
            <div className='ds-m-100 ds-p-100'>
           {
            !check ? (
                <>
                 <div className='ds-flex ds-justify-center ds-text-size-80 ds-mb-20'>
            <FaUserCheck className='ds-text-success700'/>
            </div>
            <Row className="ds-justify-center">
            <Text
               text={initMail ? "Votre adresse e-mail a été vérifiée." : "Votre compte a été créé avec succès et votre adresse e-mail a été vérifiée."}
               className="ds-text-success700 ds-text-size-26 ds-mb-20"
               onPointerEnterCapture={undefined} 
               onPointerLeaveCapture={undefined}
            />      
            </Row>
            <Row className="ds-justify-center">
            <Text
                text= {initMail ? "Veuillez cliquer sur le bouton ci-dessous pour réinitialiser votre adresse e-mail." : "Veuillez cliquer sur le bouton ci-dessous pour valider votre compte et accéder à l'application."}
                className="ds-text-neutral700 ds-text-size-20 ds-mb-20"
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
            />
            </Row>
            <Row className="ds-justify-center">
            {errors && errors['message'] && (
              <Text
                text={errors['message']}
                className="ds-text-error600 ds-ml-3 ds-mt-20"
                type={TextType["body-1"]}
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
              />
          )}
            </Row>
            <Row className="ds-justify-center">
            <Button
                text= {initMail ? "Réinitialiser mon email" : "Activer mon compte" }
                type={Type.primary}
                size={Size.medium}
                onClick={()=>verify()}
                style={{
                backgroundColor : '#15803d'
                }}
              />
            </Row>  
                </>
            ) : (
                <Row className="ds-flex-col ds-center">
                <FcExpired className="ds-text-size-120 ds-flex ds-justify-center ds-mb-10" />
            <Text
                text= "Votre compte est déjà activé."
                className="ds-text-warning500 ds-text-size-40"
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
            />
            </Row>
            )
           }
        </div>
        </>
    )
}