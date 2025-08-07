import { Input } from "@piximind/ds-p-23";
import { SlPrinter } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { FormEvent, useState } from "react";
import NavApp from "../nav/NavApp";
import { printTestPage } from "../../api/reducers/PrinterReducer";
import { updateConnector } from "../../api/reducers/ConnectorsReducer";
import UpdateConnector from "../../interfaces/connectors/UpdateConnector";
import ComponentTitle from "../../../../sharedComponent/ComponentTitle";
import { connectorFields } from "./helpers/connectorFields";
import { FormFooter } from "../../../../sharedComponent/FormFooter";
import { connectorValidation } from "./helpers/connectorValidation";

export default function AddConnector () {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authData = useAppSelector(state => state.auth.data)
    const [connector, setConnector] = useState<UpdateConnector>({} as UpdateConnector)
    const [errors,setErrors]=useState<{ [key: string]: string }>({});
  

    const printers= useAppSelector(state=> state.printers.data);
    const validateConnector = connectorValidation(connector);

    const handlePrintTestPage = async (printerName: string) => {
      if (validateConnector !== true) {
        setErrors({ message: validateConnector });
        return;
    }
      try {
        await dispatch(printTestPage({
          printerName,
          pdfBase64: ""
        })).unwrap();
      } catch (error) {
        console.error("Erreur lors l'impression de la page de test", error);
      }
    };

    const fields = connectorFields(connector);
    

    const handleAdd = async (e : FormEvent) => {
        e.preventDefault();
        console.log(connector)
        setErrors({})

        if (validateConnector !== true) {
          setErrors({ message: validateConnector });
          return;
      }

        try {
            await dispatch(updateConnector({
                token: authData?.token, updateConnector: connector,
                id: authData?.id
            })).unwrap();
            navigate('/');
        }
        catch(error) {
            setErrors(error as { [key: string]: string } );
        }

    }

    const buttons =[
        { 
          text: "Tester", 
          handleButtonClick: () => handlePrintTestPage(connector.printerName)
        },
        { 
          text: "Ajouter", 
          handleButtonClick: (e: FormEvent<Element>) => handleAdd(e)
        }
    ]

    return (
        <>
        <NavApp/>
        <ComponentTitle title="Ajouter une imprimante" navigatePage='/'/>
        <div className="ds-flex ds-justify-center ds-m-50">
        <form className="ds-w-28 ds-flex-col" onSubmit={(e: FormEvent)=>e.preventDefault()}>
            <div className="ds-flex ds-justify-center">
            <SlPrinter className="ds-text-size-60 ds-mb-25 ds-flex ds-justify-center" style={{color: '#41448f'}}/>
            </div>
            {
                fields.map((field, index)=>(
               <>
                {
                  field.type === "select" ? (
                    <Input
                label = {field.label}
                containerClassName="ds-mb-24"              
                isSelect={true}
                selectOption={printers}
                selectValue={[field.value]}
                onChangeSelect={(e: unknown[])=>setConnector({...connector, [field.name]: e[0]})}
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}  
                />
                  ) :(
                    <Input
                key={index}
                label = {field.label}
                containerClassName="ds-mb-20"
                value = {field.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setConnector({...connector, [field.name]: e.target.value})}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                />
                  )
                }
               </>
                ))
               }
               <FormFooter
                  errors ={errors}
                  buttons={buttons}
              />
        </form>
        </div>
        </>
    )
}