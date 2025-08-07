import { Input } from "@piximind/ds-p-23";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { getConnector, updateConnector } from "../../api/reducers/ConnectorsReducer";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Validation } from "@piximind/validation";
import NavApp from "../nav/NavApp";
import { printTestPage } from "../../api/reducers/PrinterReducer";
import UpdateConnector from "../../interfaces/connectors/UpdateConnector";
import { FormFooter } from "../../../../sharedComponent/FormFooter";
import ComponentTitle from "../../../../sharedComponent/ComponentTitle";
import { connectorFields } from "./helpers/connectorFields";
import { emptyField } from "../../../../sharedComponent/helpers/ErrorMsg";

export default function EditConnector () {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authData= useAppSelector(state => state.auth.data)
    const data = useAppSelector(state=>state.connectors.data.connectors);
    const [connector, setConnector] = useState<UpdateConnector>({
      apiKey: Array.isArray(data) ? "" : data.apiKey,
      printerName: Array.isArray(data) ? "" : data.printerName,
    } as UpdateConnector);
    const [errors,setErrors]=useState<{ [key: string]: string }>({});
    const validation = new Validation();
    const printers= useAppSelector(state=> state.printers.data);
    const fields = connectorFields(connector);

    const {id} = useParams();

    const fetchData = useCallback(async () => {
        try {
          await dispatch(getConnector({ id, token: authData?.token })).unwrap();
        } catch (error) {
          console.log(error);
        }
    },[authData?.token, dispatch, id])
      
      const handlePrintTestPage = async (printerName: string) => {
        if (validation.isEmpty(connector.printerName)) {
            setErrors({message : emptyField});
            return;
        }
      try {
        await dispatch(printTestPage({
          printerName,
          pdfBase64: ""
        })).unwrap();
      } catch (error) {
        console.log(error);
      }
    };
      
      
    const handleUpdate = async (e : FormEvent) => {
        e.preventDefault();
        setErrors({});
        setConnector({...connector, apiKey: Array.isArray(data) ? data[0]?.apiKey : data?.apiKey});
        if (validation.isEmpty(connector.apiKey) || validation.isEmpty(connector.printerName)) {
            setErrors({message : emptyField});
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
            console.log(error);
            setErrors(error as { [key: string]: string } );
        }

    }

    const handleDissociate= async (e : FormEvent) => {
      e.preventDefault();
      try {
          await dispatch(updateConnector({
              token: authData?.token, updateConnector: {
                printerName:"", 
                apiKey: Array.isArray(data) ? "": data?.apiKey,
              },
              id: authData?.id
          })).unwrap();
          navigate('/');
      }
      catch(error) {
          console.log(error);
          setErrors(error as { [key: string]: string } );
      }
  }

    useEffect(() => {
        fetchData();
      }, [fetchData]);

      useEffect(()=>{
        if (!Array.isArray(data)) {
          setConnector(data as UpdateConnector);
      }
      },[data]);

      const buttons = [
        {
          text: "Tester"  ,
          handleButtonClick:()=>handlePrintTestPage(connector.printerName)
        },
        {
          text: "Valider" ,
          handleButtonClick: (e: FormEvent)=>handleUpdate(e)
        },
        {
          text: "Dissocier" ,
          handleButtonClick: (e: FormEvent)=>handleDissociate(e)
        },
      ]

    return (
        <>
        <NavApp/>
        <ComponentTitle 
        title={"Modifier / " + (!Array.isArray(data) ? data?.connectorName : "")} 
        navigatePage='/'
        />
        <div className="ds-flex ds-justify-center ds-mt-10 ds-m-40">
        <div className="ds-w-30 ds-flex-col">
          <div className="ds-mb-30">
            <div className="ds-text-size-25">
            {
             Array.isArray(data) ? "" :  data?.connectorName
            }
            </div>
            <div>
            {
             Array.isArray(data) ?  "" : data?.webSite 
            }
            </div>

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
        </div>
        </div>
        </>
    )
}