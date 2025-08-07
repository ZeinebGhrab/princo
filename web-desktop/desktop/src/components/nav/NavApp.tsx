import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { LuPrinter } from 'react-icons/lu';
import { FiLogOut } from 'react-icons/fi';
import { IoOptions } from "react-icons/io5";
import { Dropdown, NavDropdown, Navbar } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { logout } from '../../api/reducers/AuthReducer';
import princo from "../../../../assets/princoLogo.png";

import ToastNotification from '../notifications/ToastNotification';
import { BsFiles } from 'react-icons/bs';


export default function NavApp() {

  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useAppDispatch();
  const id= useAppSelector(state => state.auth.data?.id);

 
  return (
    <>
      <div className="ds-flex ds-px-12 ds-hp-65 ds-align-center ds-mt-10 ds-justify-between ds-w-100 ds-box-shadow3 ds-bg-neutral50">
      <Navbar.Brand as={Link} to="/"className="ds-ml-20"> <img src={princo} alt=""  height="45" /></Navbar.Brand>
        <div>
        <div className="ds-flex-grow1 ds-flex ds-justify-start">
            <NavDropdown 
              title={
              <IoOptions className='ds-text-size-40 ds-text-neutral500'/>}
              show={showDropdown}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)} id="basic-nav-dropdown"
              >
            <Dropdown.Item eventKey="1" as={Link} to='/'>
                  <LuPrinter/> Mes connecteurs
                </Dropdown.Item>
              <Dropdown.Item eventKey="2"  as={Link}  to='/notifications'> 
              <IoMdNotificationsOutline /> Notifications
              </Dropdown.Item>
              <Dropdown.Item eventKey="3"  as={Link}  to='/pendingFiles'> 
              <BsFiles /> Impressions en attente
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="3" as={Link}  to='/login' onClick={()=>dispatch(logout(id))}>
              <FiLogOut /> Quitter
                 </Dropdown.Item>
            </NavDropdown>  
          </div>
        <ToastNotification />
        </div>
      </div>
    </>
  );
}