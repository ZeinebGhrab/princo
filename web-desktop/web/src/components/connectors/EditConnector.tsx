import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { Input} from '@piximind/ds-p-23';
import { getConnector, updateConnector } from '../../api/reducers/ConnectorsReducer';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../nav/NavApp';
import { SlPrinter } from 'react-icons/sl';
import Connector from '../../interfaces/Connector';
import ComponentTitle from '../../../../sharedComponent/ComponentTitle';
import { connectorValidation } from './helpers/ConnectorValidation';
import { connectorFields } from './helpers/ConnectorFields';
import { FormFooter } from '../../../../sharedComponent/FormFooter';


export default function EditConnector() {

    const navigate = useNavigate();
    const data = useAppSelector(state=>state.connectors.data);
    const [change, setChange] = useState<Connector>(Array.isArray(data) ? {} as Connector: data);

    const dispatch = useAppDispatch();
    const authData= useAppSelector(state=>state.authentication.data);
    const [errors,setErrors]=useState<{ [key: string]: string }>({});
    const  {id} = useParams();
    const fields = connectorFields(change);

    const fetchData = useCallback(async ()=>{
        try {
            await dispatch(getConnector({id, token: authData?.token})).unwrap();
        }
        catch(error){
            console.log(error);
        }
    },[authData?.token, dispatch, id])

    const handleChange = async(e : FormEvent) => {
        e.preventDefault()
        setErrors({});
        
        const validateConnector = connectorValidation(change);

        if (validateConnector !== true) {
            setErrors({ message: validateConnector });
            return;
        }

        try {
            await dispatch(updateConnector({
                id : Array.isArray(data) ? "" : data?._id ,
                updateConnector: {...change, userId: authData?.id},
                token: authData?.token
            })).unwrap();
            navigate(`/connectorDetails/${id}`)
        } catch(error) {
            console.log(error);
            setErrors(error as { [key: string]: string });
        }
    };

    useEffect(()=>{
        fetchData();
    },[fetchData]);

    return (
        <>
        <Navbar/>
            <ComponentTitle title="Modifier connecteur" navigatePage='/'/>  
        <div className="ds-flex ds-justify-center ds-m-50">
        <form className="ds-w-28 ds-flex-col ds-mt-10" onSubmit={(e: FormEvent)=>handleChange(e)}>
            <div className="ds-flex ds-justify-center">
            <SlPrinter className="ds-text-size-60 ds-mb-25 ds-flex ds-justify-center" style={{color: '#41448f'}} />
            </div>
              {
                fields.map((field, index)=>(
                <Input
                key={index}
                label = {field.label}
                containerClassName="ds-mb-20"
                value = {field.value}
                placeholder={`Saisir le ${field.label.toLowerCase()}`}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setChange({...change, [field.name]: e.target.value})}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                />
                ))
               }
                 <FormFooter
                  errors ={errors}
                  buttons={[{text: "Modifier"  , handleButtonClick: (e: FormEvent)=>handleChange(e) }]}
              />
        </form>
        </div>
        </>
    );
}

