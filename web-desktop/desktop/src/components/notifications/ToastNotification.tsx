import { useCallback, useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';
import { io } from 'socket.io-client';
import { printTestPage } from '../../api/reducers/PrinterReducer';
import { useAppSelector, useAppDispatch } from '../../api/hooks';
import Printer from '../../interfaces/Printer';
import ImpressionNotif from '../../interfaces/notifications/ImpressionNotif ';
import { activeConnector } from '../../api/reducers/ConnectorsReducer';
import { createNotification } from '../../api/reducers/NotificationsReducer';
import { Button, SizeButton, TypeButton } from '@piximind/ds-p-23';
import { MdOutlineCancel } from 'react-icons/md';
import CancelNotificationModal from './CancelNotificationModal';

export default function ToastNotification() {

  const [showToast, setShowToast] = useState(false);
  const [notifications, setNotifications] = useState<ImpressionNotif[]>([]);
  const [cancelPrint, setCancelPrint] = useState(false);
  const [notificationToPrint, setNotificationToPrint] = useState<ImpressionNotif | null>(null); 
  const printers = useAppSelector(state => state.printers.data);
  const dispatch = useAppDispatch();
  const authData = useAppSelector(state => state.auth.data);
  const [showModalCancelNotif, setShowModalCancelNotif] = useState(false);
  const [pdfBase64,setPdfBase64] = useState<string>("");

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL);

    socket.on('connect', () => {});

    socket.on('notification', (notification: ImpressionNotif) => {
      setNotifications((prevNotif) => [...prevNotif, notification]);
      setShowToast(true);
      setNotificationToPrint(notification); 
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClose = (index: number) => {
    setNotifications((prevNotifications) => 
      prevNotifications.filter((_, idx) => idx !== index)
    );
  };

  const handleCancel = () => {
    setCancelPrint(true);
    setShowToast(false);
    setShowModalCancelNotif(true);
  };

  const handlePrint = useCallback( async (notification: ImpressionNotif) => {
    const printerName = notification.printerName;
    const selectedPrinter : Printer | undefined = printers.find(printer => printer.value === printerName);
    if (selectedPrinter && notification.impression) {
      try {
        await dispatch(printTestPage({printerName: selectedPrinter.value, pdfBase64:  notification.pdfBase64})); 
      } catch(error){
        await dispatch(activeConnector({id: notification.connectorId,active: false,token: authData?.token})).unwrap();  
        await dispatch(createNotification({token: authData?.token, 
          notification: {
            connector: notification.connectorId, 
            date: new Date(),
            message : 'Problème imprimante indisponible',
            status :'printer_issue',
            user: authData?.id,
          }})).unwrap()
      
        console.error(`L'imprimante ${printerName} n'est pas disponible.`);
      }
    }
  },[authData?.id, authData?.token, dispatch, printers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (notificationToPrint && !cancelPrint) {
        handlePrint(notificationToPrint);
      }
      setNotificationToPrint(null);
      setCancelPrint(false);
      setShowToast(false);
    }, 5000);

    return () => clearTimeout(timer); 
  }, [notificationToPrint, cancelPrint, handlePrint]);

  return (
    <>
      {notifications.map((notification, index) => (
        <Toast 
          key={index}
          onClose={() => handleClose(index)}
          show={showToast}
          className="ds-toast"
          style={{
            position: 'fixed',
            bottom: '1rem',
            right: '1rem',
            width: '300px',
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto" style={{color: '#41448f'}}>Princo</strong>
            <small>{notification.date}</small>
          </Toast.Header>
          <Toast.Body>
              <b>{notification.message}</b>
            <Button
            text = {<><MdOutlineCancel style = { {color: '#41448f', marginRight: '2px'}} /> Annuler</> as unknown as string }
            onClick = {() => {
              handleCancel();
              setPdfBase64(notification.pdfBase64);
            }}
            size = {SizeButton.xSmall}
            type = {TypeButton.secondary}
            className='ds-mt-5'
            style = { {color: '#41448f', borderColor: '#41448f'} }
            />
          </Toast.Body>
        </Toast>
      ))}
      <CancelNotificationModal show={showModalCancelNotif} handleClose ={()=>setShowModalCancelNotif(false)} pdfBase64={pdfBase64}/>
    </>
  );
}
