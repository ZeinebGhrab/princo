import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../api/hooks";
import ProfileInvoiceDetails from "../../../interfaces/user/InvoiceDetails";
import { updateUser } from "../../../api/reducers/ProfileReducer";
import NavApp from "../../nav/NavApp";
import { Col, Input } from "@piximind/ds-p-23";
import { useNavigate } from "react-router-dom";
import { ETypesInput } from "@piximind/ds-p-23/lib/esn/Interfaces";
import ComponentTitle from "../../../../../sharedComponent/ComponentTitle";
import { InvoiceDetailsFields } from "./helpers/InvoiceDetailsFields";
import { FormFooter } from "../../../../../sharedComponent/FormFooter";

export default function EditInvoice(){

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authData= useAppSelector(state => state.authentication.data);
    const [changeInvoice,setChangeInvoice] = useState<ProfileInvoiceDetails>(useAppSelector(state=>state.profile.data.invoiceDetails)|| {} as ProfileInvoiceDetails);
    const fields = InvoiceDetailsFields(changeInvoice, true);

    const handleModify = async(): Promise<void> =>{
        try {
            await dispatch(updateUser({id: authData?.id ,updateUser : {invoiceDetails : changeInvoice} ,token : authData?.token})).unwrap();
            navigate('/invoiceDetails')
        }
        catch(error){
            console.log(error);
        }

    }
    
    return(
        <>
        <NavApp/>
            <div className="ds-flex ds-align-center">
            <ComponentTitle title="Modifier mes informations de facturation" navigatePage='/invoiceDetails'/>
            </div>
         <Col className="ds-ml-125 ds-mt-30 ds-w-30 ds-mb-15">
         {fields.map((field, index) => (
            <Input
              key={index}
              label={field.label}
              value={field.value}
              type={ETypesInput.text}
              containerClassName= 'ds-mb-15'
              autoComplete={`current-${field.name}`}
              placeholder={`Saisir votre ${field.label.toLowerCase()}`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChangeInvoice({ ...changeInvoice, [field.name]: e.target.value })}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
         ))}
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
          /> 
        </div>
        </Col>
        </>
    )
}