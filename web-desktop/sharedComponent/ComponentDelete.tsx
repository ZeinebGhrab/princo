import { Modal } from "react-bootstrap";
import { Text } from "@piximind/ds-p-23";
import { GiCheckMark } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import PropsDelete from "../web/src/interfaces/props/PropsDelete";
import ComponentButton from "./ComponentButton";


export default function ComponentDelete({show, handleClose, handleDelete, title}: PropsDelete){
    return(
        <>
         <Modal
        show={show}
        onHide={handleClose}
        centered>
       <Modal.Header closeButton>
       </Modal.Header>
        <Modal.Body>
            <b className="ds-flex ds-center ds-text-size-21 ds-mb-20" style ={{color: '#41448f'}}>
                Confirmez-vous la suppression ?
            </b>
            <Text
            text={`Si vous confirmez, ${title} sera définitivement effacé`}
            className="ds-flex ds-center ds-text-size-17"
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
            />
        </Modal.Body>
        <Modal.Footer className="ds-flex ds-justify-center ds-w-99">
        <ComponentButton
          buttons ={
            [
              {
                text: <><GiCheckMark className="ds-mr-3 ds-text-size-20"/>Confirmer</> as unknown as string,
                handleButtonClick: ()=>handleDelete()
        
              },
              {
                text: <><IoMdClose className="ds-mr-3 ds-text-size-20"/> Annuler</> as unknown as string,
                handleButtonClick: handleClose
        
              },
        
            ]
          }
          size= 'meduim'
          />     
        </Modal.Footer>
      </Modal>
        </>
    ) 
}