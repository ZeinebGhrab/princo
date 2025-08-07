import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import ComponentTitle from "../../../../sharedComponent/ComponentTitle";
import { getOffer, updateOffer } from "../../api/reducers/OfferReducer";
import { useNavigate, useParams } from 'react-router-dom';
import { ETypesInput, Input, NumberInput, EDisplayType, TextArea, Datepicker, Text, ESizeInput } from "@piximind/ds-p-23";
import { Offer } from "../../interfaces/Offer";
import { emptyField } from "../../../../sharedComponent/helpers/ErrorMsg";
import { offerFields } from './helpers/offerFields';
import NavApp from "../nav/NavApp";
import { validationOffer } from "./helpers/ValidationOffer";
import { FormFooter } from "../../../../sharedComponent/FormFooter";
import { IChangeDatePicker } from "@piximind/ds-p-23/lib/esn/Interfaces/Molecule/IMoleculeDatepicker/IMoleculeDatepicker";


export default function EditOffer () {

    const offerData = useAppSelector(state=>state.offers.data);
    const authData = useAppSelector(state => state.authentication.data);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [errors,setErrors]=useState<{ [key: string]: string }>({});
    const  {id} = useParams();
    const [change, setChange] = useState<Offer>(Array.isArray(offerData) ? {} as Offer : offerData );
    const fields = offerFields(change);

    const handleChange = async(e : FormEvent) => {
        e.preventDefault()
        setErrors({});
        if(validationOffer(change)){
            setErrors({ message: emptyField });
            return;
        }

        try {
            await dispatch(updateOffer({
                offer: {
                    ...change,
                    admin: authData?.id,
                },
                token: authData?.token,
                id,
            })).unwrap();
            navigate(`/offers`);
        } catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchOffer = async (): Promise<void> => {
            try {
                await dispatch(getOffer({ id, token: authData?.token })).unwrap();
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchOffer();
    }, [authData?.token, dispatch, id]);
    
    useEffect(() => {
        if (!Array.isArray(offerData) && offerData) {
            setChange(offerData);
        }
    }, [offerData]);
    

    
    return (
        <>
         <NavApp/>
            <ComponentTitle title="Modifier offre" navigatePage='/offers'/>
       <div className="ds-flex ds-justify-center ds-m-10">
       <form className="ds-w-28 ds-flex-col" onSubmit={(e)=>handleChange(e)}>
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
        allowLeadingZeros={false}
        placeholder={`Saisir un ${field.label.toLowerCase()} de l'offre`}
        displayType={EDisplayType.input}
        onChange={(e: { value: number }) => setChange({ ...change, [field.name]: Number(e.value) })}
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
        placeholder="Saisir une date d'expiration"
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
        name={field.name}
        placeholder={`Saisir un ${field.label.toLowerCase()} de l'offre`}
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
                  buttons={[{text: "Modifier" , handleButtonClick: (e: FormEvent)=>handleChange(e) }]}
              />
        </form>
        </div>
        </>
    )
}