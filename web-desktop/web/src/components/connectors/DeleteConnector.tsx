import Props from "../../interfaces/props/Props";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { deleteConnector } from "../../api/reducers/ConnectorsReducer";
import { useNavigate } from "react-router-dom";
import ComponentDelete from "../../../../sharedComponent/ComponentDelete";


export default function DeleteConnector({show,data,handleClose}: Props) {


    const dispatch = useAppDispatch();
    const token = useAppSelector(state=>state.authentication.data?.token);
    const navigate = useNavigate();


    const handleDelete = async() =>{
        try {
            await dispatch(deleteConnector({id : data, token})).unwrap()
            navigate('/');
        }
        catch(error){
            console.log(error);
        }

    }

    return (
        <>
         <ComponentDelete
         show={show}
         title="le connecteur"
         handleClose={handleClose}
         handleDelete={handleDelete}
         />
        </>
    )
}