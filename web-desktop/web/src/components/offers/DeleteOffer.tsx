import Props from "../../interfaces/props/Props";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { deleteOffer } from "../../api/reducers/OfferReducer";
import ComponentDelete from "../../../../sharedComponent/ComponentDelete";

export default function DeleteOffer({show,data,handleClose}: Props) {


    const dispatch = useAppDispatch();
    const token = useAppSelector(state=>state.authentication.data?.token);


    const handleDelete = async() =>{
        try {
            await dispatch(deleteOffer({id: data, token})).unwrap()
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
         title="l'offre"
         handleClose={handleClose}
         handleDelete={handleDelete}
         />
        </>
    )
}