import { Button, TypeButton, Avatar } from '@piximind/ds-p-23';
import { Size, SizeAvatar } from '@piximind/ds-p-23/lib/esn/Interfaces';
import { useState } from 'react';
import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { MdOutlineLocalOffer } from "react-icons/md";
import { TbLogout } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import userLogo from '../../assets/user.png';
import { Dropdown,  NavDropdown, Navbar } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { logout } from '../../api/reducers/AuthReducer';
import princo from "../../../../assets/princoLogo.png";

export default function NavApp() {

   const dispatch = useAppDispatch();
   const [showDropdown, setShowDropdown] = useState(false);
   const navigate = useNavigate();
   const roles = useAppSelector(state => state.authentication.data?.roles);
   const isAdmin = roles?.includes('admin');
   const profileImage = useAppSelector(state => state.profile.data.profileImage);

  return (
    <>
      <div className="ds-flex ds-px-12 ds-hp-70 ds-align-center ds-justify-between ds-w-100 ds-box-shadow3 ds-bg-neutral50">
        <Navbar.Brand as={Link} to="/"className="ds-ml-20"> <img src={princo} alt=""  height="45" /></Navbar.Brand>
        <div className="ds-flex ds-align-center">
          <Button text="Acheter Crédit"
           type={TypeButton.primary} 
           style={{ backgroundColor: '#41448f'}}
           className="ds-mr-20" 
           size={Size.medium} 
           onClick={()=>navigate('/credit')}
           />
          <div className="ds-flex-grow1 ds-flex ds-justify-start">
            <NavDropdown 
              title={
              <Avatar  src= {profileImage ? profileImage : userLogo}
              isImage={true}
              size={SizeAvatar.large}
              />}
              show={showDropdown}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)} 
              id="basic-nav-dropdown"
              >
            <Dropdown.Item eventKey="1" as={Link} to='/profileDetails'>
                <CgProfile className="ds-mr-3" /> Mon Profil
                </Dropdown.Item>
              <Dropdown.Item eventKey="2"  as={Link}  to='/credit'> 
                <BsFillCreditCard2BackFill className="ds-mr-3" /> Mon crédit</Dropdown.Item>
              <Dropdown.Item eventKey="3" as={Link}  to='/invoices'>
                <LiaFileInvoiceDollarSolid className="ds-mr-3" /> Mes factures
                </Dropdown.Item>
                {
                  isAdmin && (
                    <Dropdown.Item eventKey="4" as={Link}  to='/offers'>
                       <MdOutlineLocalOffer className="ds-mr-3" /> Mes offres
                    </Dropdown.Item>
                  )
                }
              <Dropdown.Divider />
              <Dropdown.Item eventKey={isAdmin ? "5" : "4"} as={Link}  to='/login' onClick={()=>dispatch(logout())}>
                <TbLogout className="ds-mr-3" /> Déconnexion
                 </Dropdown.Item>
            </NavDropdown>  
          </div>
        </div>
      </div>
    </>
  );
}
