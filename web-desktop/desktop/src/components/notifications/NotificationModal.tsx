import { Modal } from "react-bootstrap";
import Props from "../../interfaces/Props";

export default function NotificationModal({notification,show, handleClose}: Props) {

    let description = "";

    switch(notification.status) {
      case 'printer_issue':
        description = "Vérifiez la connexion, vérifiez les câbles, changer l'imprimante provisoirement dans les paramètres de connecteurs.";
        break;
      case 'credit_issue':
        description = "Votre crédit est épuisé, accédez à la plateforme web pour acheter des crédits.";
        break;
      case 'network_issue':
        description = "Vérifiez votre connexion internet.";
        break;
      default:
        description = "";
    }
  


    return (
        <>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className="ds-flex-col ds-center ds-flex">
            <div className="ds-text-size-60"  style={{color: '#41448f'}}>
            {
            notification.icon
            } 
            </div>
                <div className="ds-text-size-25" style={{color: '#41448f'}}>
                {notification.message}
                </div>
                <div className="ds-text-size-16 ds-mt-5">{notification.date}</div>
                <div className="ds-mt-30 ds-m-10 ds-text-size-18">
                <p style={{ margin: 'auto', textAlign: 'center', color: '#195054' }}>{description}</p>
                </div>
            </Modal.Body>
        </Modal>
        </>
    )
}