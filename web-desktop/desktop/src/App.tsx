import { Route, Routes } from 'react-router';
import RequireAuthentication from './routes/RequireAuthentication';
import AddConnector from './components/connectors/AddConnector';
import EditConnector from './components/connectors/EditConnector';
import NotificationsList from './components/notifications/NotificationsList';
import ConnectorsList from './components/connectors/ConnectorsList';
import Login from './components/login/Login';
import { useEffect } from 'react';
import { detectPrinters } from './api/reducers/PrinterReducer';
import { useAppDispatch, useAppSelector } from './api/hooks';
import { io } from 'socket.io-client';
import PendingFileList from './components/pendingFiles/PendingFileList';

function App() {

  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.data?.id);

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_SERVER_URL}`);

    socket.emit('desktopAppConnected', userId);

    window.addEventListener('beforeunload', () => {
      socket.emit('desktopAppDisconnected', userId);
    });
  }, [userId]);

  useEffect(() => {  
    const fetchPrinters = async () => {
      try {
        await dispatch(detectPrinters()).unwrap();
     
      } catch (error) {
        console.error(error);
      }
    };
    fetchPrinters();
  }, [dispatch]);

  return (
    <>
        <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route element={<RequireAuthentication/>}>
            <Route path='/' element={<ConnectorsList/>}/>
            <Route path='/addConnector' element={<AddConnector/>}/>
            <Route path='/editConnector/:id' element={<EditConnector/>}/>
            <Route path='/notifications' element={<NotificationsList/>}/>
            <Route path='/pendingFiles' element={<PendingFileList/>}/>
        </Route>
    </Routes>   
    </>
  )
}

export default App;
