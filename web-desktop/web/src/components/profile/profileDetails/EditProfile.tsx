import { Col, Datepicker, EDisplayType, EInputAccept, Input,  InputFile,  NumberInput, Radio, Row, Text, TypeInputFile } from "@piximind/ds-p-23";
import { ESizeInput, ETypesInput } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { useAppDispatch, useAppSelector } from "../../../api/hooks";
import { SetStateAction, useState } from "react";
import { Validation } from "@piximind/validation";
import { updateProfileImage, updateUser } from "../../../api/reducers/ProfileReducer";
import { IChangeDatePicker } from "@piximind/ds-p-23/lib/esn/Interfaces/Molecule/IMoleculeDatepicker/IMoleculeDatepicker";
import { useNavigate } from "react-router-dom";
import { existName, validEmail } from "../../../../../sharedComponent/helpers/ErrorMsg";
import ComponentTitle from "../../../../../sharedComponent/ComponentTitle";
import { profileDetailsFields } from "./helpers/ProfileDetailsFields";
import NavApp from "../../nav/NavApp";
import ProfileField from "../../../interfaces/ProfileFields";
import EditUser from "../../../interfaces/user/EditUser";
import { FormFooter } from "../../../../../sharedComponent/FormFooter";


export default function EditProfile(){

    const navigate = useNavigate();
    const [changeUser,setChangeUser] = useState<EditUser>(useAppSelector(state => state.profile.data) || {} as EditUser);
    const [errors,setErrors]=useState<{ [key: string]: string }>({});
    const dispatch = useAppDispatch();
    const dataAuth = useAppSelector(state => state.authentication.data);
    const validation = new Validation();
    const fields : ProfileField[] = profileDetailsFields(changeUser, true);
    const [profileImage, setProfileImage] = useState();

    const handleModify = async() =>{

        if (validation.isEmpty(changeUser.firstName) || validation.isEmpty(changeUser.lastName)) {
            setErrors({message : existName});
            return;
        }
        
        if(!validation.isMail(changeUser.email))
        {
           
            setErrors({message : validEmail});
            return;
        }
        try {  
            await dispatch(updateUser({id : dataAuth?.id , updateUser: changeUser, token : dataAuth?.token})).unwrap();
            if(profileImage) {
                await dispatch(updateProfileImage({id : dataAuth?.id ,file: profileImage, token : dataAuth?.token})).unwrap();
            }
            navigate('/profileDetails');
        }
        catch(error) {
            console.log(error);
            setErrors(error as { [key: string]: string });
        }
     }
    return(
        <>
        <NavApp/>
            <ComponentTitle title="Modifier mes informations du profil" navigatePage='/profileDetails'/>
        <div className="ds-ml-100 ds-mt-30 ds-mb-20">
                <Row>
                    <Col className="ds-justify-center">
                        <InputFile
                         accept ={[EInputAccept.jpeg, EInputAccept.jpg, EInputAccept.png, EInputAccept.svg]}
                         type ={TypeInputFile.type2}
                         className = 'border border-blue p-3 text-secondary'
                         text ='Charger une photo de profil'
                         onChange ={(e: SetStateAction<undefined>[])=> {setProfileImage(e[0])}}
                        />
                    </Col>
                    <Col className="ds-ml-20 ds-w-30">
                 { 
           fields.map((field: ProfileField, index) => (
            field.type === "number" ? (
             <NumberInput 
                key={index}
                label={field.label}
                value={field.value}
                placeholder={`Saisir votre ${field.label.toLowerCase()}`}
                className='ds-w-100 ds-h-80'
                containerClassName='ds-w-100 ds-mb-25 ds-h-7'
                allowNegative={false}
                allowLeadingZeros={true}
                displayType={EDisplayType.input}
                onChange={(e: { value: number }) => setChangeUser({ ...changeUser, [field.name as string]: e.value.toString()})}
            /> 
        ) : (
            field.type === 'date' ? (
                <>
                <Text
                text="Date de naissance"
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined} 
                placeholder={`Saisir votre ${field.label}`}
                className="ds-mb-2 ds-mt-15 ds-text-neutral700"
                />
                <Datepicker
                placeholder="Date de naissance"
                containerClassName= 'ds-mb-15'
                inputSize={ESizeInput.medium}
                isRange={false}
                value={typeof changeUser.birthDate === 'string' ? new Date(changeUser.birthDate) : null }
                onChange={(e : Date | IChangeDatePicker)=>setChangeUser({...changeUser,  [field.name as string]: e})}
               />
                </>
            ) : (
                 field.type ==='radio' ? (
                   <>
                    <Text
                    text="Genre"
                    onPointerEnterCapture={undefined} 
                    onPointerLeaveCapture={undefined} 
                    className="ds-mb-2 ds-mt-15 ds-text-neutral700"
                   />
                    <Radio
                    key={index}
                    label={field.label}
                    value={field.value as string}
                    disabled={false}
                    data={field.options}
                    onClick={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, [field.name as string] : e.target.value})}
                  />
                   </>
                 ): (
                    <Input
                    key={index}
                    label={field.label}
                    value={field.value as string}
                    type={ETypesInput.text}
                    placeholder={`Saisir votre ${field.label.toLowerCase()}`}
                    autoComplete={`current-${field.name}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChangeUser({ ...changeUser, [field.name as string]: e.target.value })}
                    containerClassName='ds-w-100 ds-mb-10'    
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />
                 )
            )
        )
    ))
}
        <div className="ds-mt-25">
        <FormFooter
          buttons ={
            [
              {
                text: 'Enregistrer',
                handleButtonClick: () => handleModify()
        
              },
              
            ]
          }
          errors={errors}
          /> 
        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}