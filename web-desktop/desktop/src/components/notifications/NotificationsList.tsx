import NavApp from "../nav/NavApp";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Text } from "@piximind/ds-p-23";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { getNotifications } from "../../api/reducers/NotificationsReducer";
import { Card } from "react-bootstrap";
import moment from "moment";
import { MdOutlineCreditCardOff } from "react-icons/md";
import { TbPrinterOff } from "react-icons/tb";
import { RiErrorWarningLine } from "react-icons/ri";
import { GrNext } from "react-icons/gr";
import NotificationModal from "./NotificationModal";
import ImpressionNotif from "../../interfaces/notifications/ImpressionNotif ";
import ComponentPagination from "../../../../sharedComponent/ComponentPagination";

export default function NotificationsList() {
  
  const dispatch = useAppDispatch();
  const authData = useAppSelector(state => state.auth.data);
  const notifications = useAppSelector(state => state.notifications.data);
  const [showModal, setShowModal]= useState(false);
  const [selectedNotification, setSelectedNotification] = useState< {
    icon: JSX.Element,
    message: string,
    status: string,
    date: string,
}>({icon: <></>,message:"",status:"",date: ""});
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  const totalPages = useMemo(() => notifications.length / limit + 1 , [notifications, limit]);

  const handlePageChange = async (pageNumber: number): Promise<void> => {
    setCurrentPage(pageNumber);
  };

  const showNotifications = useCallback(
    async (): Promise<void> => {
      try {
        const skip = limit * (currentPage - 1);
        await dispatch(getNotifications({ id: authData?.id, token: authData?.token, skip, limit })).unwrap();
      } catch (error) {
        console.log(error);
      }
    },
    [authData?.id, authData?.token, currentPage, dispatch]
  );

  useEffect(() => {
    showNotifications();
  }, [showNotifications]);
  

  return (
    <>
      <NavApp />
      <div className="ds-mt-30 ds-ml-30 ds-flex ds-flex-col ds-justify-start ds-items-start">
  <Text
    text="Notifications"
    style = {{color : '#41448f', fontWeight: 'bold'}}
    className="ds-text-size-30 ds-mb-20"
    onPointerEnterCapture={undefined} 
    onPointerLeaveCapture={undefined}   
  />
  <div className="ds-justify-start">
    {notifications.map((notification: ImpressionNotif , index) => {
    const notificationContent = {
      icon: notification.status === 'credit_issue' ? 
        <MdOutlineCreditCardOff/> : (
      notification.status === 'printer_issue' ? 
        <TbPrinterOff/> :
        <RiErrorWarningLine/>
      ),
      status: notification.status,
      message: notification.message,
      date: moment(notification.date).format('DD/MM/YYYY HH:mm:ss')
    };
    
   return (
      <Card 
        key={index} 
        className='ds-box-shadow1'
        style={{ 
          width: '24rem', 
          height: '4rem',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor : '#eaeeeb',
          margin:'10px'
        }}
      >
       <Card.Body style={{padding:'5px'}} className="ds-flex ds-align-center ds-justify-between">
  <div style={{ color: '#195054', marginLeft:'6px'}} className="ds-flex ds-align-center ds-justify-between">
  <div className="ds-text-size-35 ds-text-error600 ds-align-center" >
  {
   notificationContent.icon
  }
  </div>
    <div className="ds-ml-10 ds-align-center">
      <div><b>{notificationContent.message}</b></div>
      <div className="ds-text-size-14">{notificationContent.date}</div>
    </div>
  </div>
  <Button
  text={<GrNext className="ds-text-size-20 ds-flex-end" /> as unknown as string}
  style={{
    backgroundColor: '#fff',
    borderColor: '#fff',
    color: '#195054',
  }}
  onClick={()=>{setShowModal(true); setSelectedNotification(notificationContent);}}
  />
</Card.Body>
      </Card>
    )})}
  </div>
</div>

      <ComponentPagination 
      currentPage={currentPage} 
      totalPages={totalPages} 
      text="Pas de notifications"
      length={Array.isArray(notifications) && notifications?.length || 0}
      handlePageChange={handlePageChange}
      />

      <NotificationModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        notification={selectedNotification}
        />
    </>
  );
}
