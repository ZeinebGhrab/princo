import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { deleteConnector } from "../../api/reducers/ConnectorsReducer";
import ComponentDelete from "../../../../sharedComponent/ComponentDelete";

export default function DeleteConnector(
    {show,id,handleClose}: 
    {show: boolean, id: string | undefined, handleClose: ()=> void} ) {


    const dispatch = useAppDispatch();
    const token = useAppSelector(state=>state.auth.data?.token);


    const handleDelete = async() =>{
        try {
            await dispatch(deleteConnector({id, token})).unwrap();
            handleClose();
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