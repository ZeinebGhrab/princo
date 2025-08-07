import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import ComponentTitle from "../../../../sharedComponent/ComponentTitle";
import { createOffer } from "../../api/reducers/OfferReducer";
import { useNavigate } from 'react-router-dom';
import { ETypesInput, Input, NumberInput, EDisplayType, TextArea, ESizeInput, Datepicker, Text } from "@piximind/ds-p-23";
import { Offer } from "../../interfaces/Offer";
import { emptyField } from "../../../../sharedComponent/helpers/ErrorMsg";
import { offerFields } from './helpers/offerFields';
import NavApp from "../nav/NavApp";
import { validationOffer } from "./helpers/ValidationOffer";
import { FormFooter } from "../../../../sharedComponent/FormFooter";
import { IChangeDatePicker } from "@piximind/ds-p-23/lib/esn/Interfaces/Molecule/IMoleculeDatepicker/IMoleculeDatepicker";


export default function AddOffer () {

    const authData = useAppSelector(state => state.authentication.data);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [errors,setErrors]=useState<{ [key: string]: string }>({});
    const [change, setChange] = useState<Offer>({} as Offer);
    const fields = offerFields(change);
    

    const handleChange = async(e : FormEvent) => {
        e.preventDefault()
        setErrors({});
        if(validationOffer(change)){
            setErrors({ message: emptyField });
            return;
        }
       
        try {
            await dispatch(createOffer({offer:{
                ...change,
                admin: authData?.id,
            }, token: authData?.token})).unwrap();
            navigate('/offers');
            
        } catch(error) {
            console.log(error);
        }
    };

    
    return (
        <>
        <NavApp/>
           <ComponentTitle title="Ajouter un offre" navigatePage='/offers'/>
       <div className="ds-flex ds-justify-center ds-m-10">
       <form className="ds-w-28 ds-flex-col">
       {
  fields.map((field, index) => (
    field.type === "number" ? (
      <NumberInput
        key={index}
        label={field.label}
        value={field.value as number}
        className='ds-w-100 ds-h-80'
        containerClassName='ds-w-100 ds-mb-15'
        allowNegative={false}
        placeholder={`Saisir un ${field.label.toLowerCase()} de l'offre`}
        allowLeadingZeros={false}
        displayType={EDisplayType.input}
        onChange={(e: { value: number }) => setChange({ ...change, [field.name]: e.value })}
      />
    ) : field.type === 'date' ? (
       <>
        <Text
        text="Date d'expiration"
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined} 
        className="ds-mb-2 ds-mt-15"
        />
      <Datepicker
        key={index}
        placeholder="Saisir une date d'expiration de l'offre"
        containerClassName='ds-mb-15'
        inputSize={ESizeInput.medium}
        isRange={false}
        minDate={new Date()}
        value={typeof field.value === 'string' ? new Date(field.value) : null}
        onChange={(e: Date | IChangeDatePicker) => setChange({ ...change, [field.name]: e })}
      />
       </>
    ) : field.type === 'text' ? (
      <TextArea
        key={index}
        label={field.label}
        value={field.value as string}
        type={ETypesInput.text}
        name={field.name}
        placeholder={`Saisir une ${field.label.toLowerCase()} de l'offre`}
        autoComplete={`current-${field.name}`}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setChange({ ...change, [field.name]: e.target.value })}
        rows={3}
        containerClassName='ds-w-100 ds-mb-10'
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
      />
    ) : (
      <Input
        key={index}
        label={field.label}
        value={field.value as string}
        type={ETypesInput.text}
        placeholder={`Saisir un ${field.label.toLowerCase()} de l'offre`}
        name={field.name}
        autoComplete={`current-${field.name}`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChange({ ...change, [field.name]: e.target.value })}
        containerClassName='ds-w-100 ds-mb-10'
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
      />
    )
  ))
}

                <FormFooter
                  errors ={errors}
                  buttons={[{text: "Ajouter"   , handleButtonClick: (e: FormEvent)=>handleChange(e) }]}
              />
        </form>
        </div>
        </>
    )
}