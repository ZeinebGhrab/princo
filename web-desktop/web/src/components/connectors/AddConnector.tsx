import { Input } from "@piximind/ds-p-23";
import NavApp from "../nav/NavApp";
import { SlPrinter } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { createConnector } from "../../api/reducers/ConnectorsReducer";
import { FormEvent, useState } from "react";
import Connector from "../../interfaces/Connector";
import ComponentTitle from "../../../../sharedComponent/ComponentTitle";
import { connectorValidation } from "./helpers/ConnectorValidation";
import { connectorFields } from "./helpers/ConnectorFields";
import { FormFooter } from "../../../../sharedComponent/FormFooter";

export default function AddConnector () {

    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authData = useAppSelector(state => state.authentication.data)
    const [connector, setConnector] = useState<Connector>({} as Connector)
    const [errors,setErrors]=useState<{ [key: string]: string }>({});
    const fields = connectorFields(connector);
    

    const handleGenerate = async (e : FormEvent) => {
        setErrors({})
        e.preventDefault();

        const validateConnector = connectorValidation(connector);

        if (validateConnector !== true) {
            setErrors({ message: validateConnector });
            return;
        }
        
        try {
            const response = await dispatch(createConnector(
                {
                 token : authData?.token, 
                 createConnector: {...connector, userId:authData?.id },
                }
                )).unwrap();
            navigate(`/connectorDetails/${response}`);
        }
        catch(error) {
            console.log(error);
            setErrors(error as { [key: string]: string });
        }
    }

    return (
        <>
        <NavApp/>
            <ComponentTitle title="Nouveau connecteur" navigatePage='/'/>
        <div className="ds-flex ds-justify-center ds-m-50">
        <form className="ds-w-28 ds-flex-col ds-mt-10" onSubmit={(e: FormEvent)=>handleGenerate(e)}>
            <div className="ds-flex ds-justify-center">
            <SlPrinter className="ds-text-size-60 ds-mb-25 ds-flex ds-justify-center" style={{color: '#41448f'}}/>
            </div>
               {
                fields.map((field, index)=>(
                <Input
                key={index}
                label = {field.label}
                containerClassName="ds-mb-15"
                value = {field.value}
                placeholder={`Saisir un ${field.label.toLowerCase()}`}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setConnector({...connector, [field.name]: e.target.value})}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                />
                ))
               }
                  <FormFooter
                  errors ={errors}
                  buttons={[{text: "Générer l'API" , handleButtonClick: (e: FormEvent)=>handleGenerate(e) }]}
              />
        </form>
        </div>
        </>
    )
}