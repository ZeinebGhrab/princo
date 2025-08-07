import { Modal } from "react-bootstrap";
import { Text } from "@piximind/ds-p-23";
import { IoMdClose } from "react-icons/io";
import ComponentButton from "../../../../sharedComponent/ComponentButton";
import { MdOutlineFileDownload } from "react-icons/md";
import { useAppDispatch } from "../../api/hooks";
import { downloadPage } from "../../api/reducers/PrinterReducer";

export default function CancelNotificationModal(
    {show, handleClose, pdfBase64}: {show: boolean, handleClose: ()=> void, pdfBase64: string}
) {
    
    const dispatch = useAppDispatch();

    const download = ()=> {
        console.log(pdfBase64);
        dispatch(downloadPage({pdfBase64})).unwrap();
        //handleClose();
    }

    return (
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
            text="L'impression de votre PDF a été annulée. Voulez-vous le télécharger ?"
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
                text: <><MdOutlineFileDownload className="ds-mr-3 ds-text-size-20"/> Télécharger</> as unknown as string,
                handleButtonClick: download 
            
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