import Nav from 'react-bootstrap/Nav';
import NavApp from '../nav/NavApp';
import { FaPencilAlt } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { useCallback, useEffect } from 'react';
import { getUser } from '../../api/reducers/ProfileReducer';
import ComponentTitle from '../../../../sharedComponent/ComponentTitle';
import { Link } from 'react-router-dom';
import TitleButton from '../../../../sharedComponent/TitleButton';

export default function ProfileNav({handleModify} :{handleModify: () => void}) {

    const dispatch = useAppDispatch();
    const dataAuth = useAppSelector(state=>state.authentication.data);

    const fetchData =useCallback(()=> {
      try{
          dispatch(getUser({id: dataAuth?.id , token: dataAuth?.token})).unwrap();
      }
      catch(error) {
          console.log(error);
      }
  },[dataAuth?.id, dataAuth?.token, dispatch]);

  const tabs =[
    {
      title: "Informations du profil",
      to:"/profileDetails",
      className:'ds-mr-20'
    },
    {
      title: "Informations de facturation",
      to:"/invoiceDetails",
    }
  ]

  useEffect(()=>{
      fetchData()
  },[fetchData])
    
  return (
    <>
    <NavApp/>
           <div className="ds-flex ds-justify-between">
           <ComponentTitle title="Mon profil" navigatePage='/'/>
           <TitleButton
            text={<><FaPencilAlt className="ds-mr-2" /> Modifier</>}
            handle={handleModify}
            className="ds-mr-160 ds-text-size-15 ds-mt-40"
           />
            </div>
    <Nav variant="tabs" className="ds-ml-80 ds-text-size-18 ds-mt-11 ds-mr-150">
      {
        tabs.map((tab,index)=>(
          <Nav.Item key={index}>
            <Nav.Link as={Link} to={tab.to} className={tab.className} style={{ color: '#567388' }}>{tab.title}</Nav.Link>
          </Nav.Item>
        ))
      }
    </Nav>
    </>
  );
}
