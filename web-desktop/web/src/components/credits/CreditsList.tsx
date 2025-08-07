import { Col, Container, Row, Text } from "@piximind/ds-p-23";
import Navbar from "../nav/NavApp";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getOffers } from "../../api/reducers/OfferReducer";
import { Offer } from "../../interfaces/Offer";
import { Card } from "react-bootstrap";
import Payment from "./payment/Payment";
import moment from "moment";
import { getUser } from "../../api/reducers/ProfileReducer";
import ComponentPagination from "../../../../sharedComponent/ComponentPagination";
import ComponentTitle from "../../../../sharedComponent/ComponentTitle";
import { groupDataByRows } from "../../../../sharedComponent/helpers/GroupDataByRows";

export default function CreditsList() {

    const offerData = useAppSelector(state=>state.offers.data);
    const authData = useAppSelector(state => state.authentication.data);
    const userData = useAppSelector(state => state.profile.data);
    const dispatch = useAppDispatch();

    const fetchUser = useCallback(async () : Promise<void> => {
      try {
          await dispatch(getUser({token: authData?.token ,id: authData?.id})).unwrap();
      }
      catch(error) {
          console.log(error);
      }
  },[authData, dispatch])

    const [currentPage, setCurrentPage] = useState(1);
    const limit = 6;
  
    const totalPages = useMemo(() : number =>{ 
    return Math.floor((Array.isArray(offerData) && offerData?.length || 0) / limit) + 1
  },[offerData, limit]);

  const handlePageChange = async (pageNumber: number): Promise<void> => {
    setCurrentPage(pageNumber);
  };

    const fetchOffers = useCallback(async () : Promise<void> => {
        try {
            const skip = limit * (currentPage - 1);
            await dispatch(getOffers({token: authData?.token ,skip,limit})).unwrap()
        }
        catch(error) {
            console.log(error);
        }
    },[authData, currentPage, dispatch]);

    const offers = Array.isArray(offerData) && groupDataByRows(offerData);
    
    useEffect(()=>{
        fetchOffers();
        fetchUser();
    },[fetchOffers, fetchUser])
    
    return(
        <>
         <Navbar/>
        <Container
        children = {
            <div className="ds-flex ds-align-center ds-justify-between ds-mr-30">
              <ComponentTitle title="Achat crédit" navigatePage="/"/>
              <div className="ds-flex ds-justify-between ds-text-size-15 ds-mt-40">
                <div className="ds-flex ds-align-center ds-mr-40 ">
                <Text
                text="Mon crédit actuel : "
                style={{color: '#195054', fontWeight:'600'}}
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
                />
                <Text
                text= {userData?.tickets as unknown as string}
                className="ds-ml-6"
                style={{color: '#195054'}}
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
                />  
                </div>
                <div className="ds-flex ds-align-start">
                <Text
                text="Date d'expiration :"
                style={{color: '#195054', fontWeight:'600'}}
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
                />
                <Text
                text= {moment(userData?.ticketsExpirationDate as Date).format("DD/MM/YYYY")}
                className="ds-ml-6"
                style={{color: '#195054'}}
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
                />
                </div>
                </div>
            </div>
        }
        />
        <div className="ds-justify-start ds-flex ds-mt-25 ds-ml-100">
        <div>

{Array.isArray(offers) && offers.map((rowOffers: Offer[], rowIndex: number) => (
<Row key={rowIndex} className="ds-mb-20">
{rowOffers.map((offer: Offer, colIndex: number) => (
<Col key={colIndex}>
      <Card
        className='ds-box-shadow3'
        style={{
          width: "24rem",
          height: "11rem",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#eaeeeb",
        }}
      >
        <Card.Body>
            <b className='ds-text-size-18' style={{color: '#34475c'}}>{offer.title}</b>
            <div className='ds-mt-3' style={{borderTop: '2px solid #E3E3E6',color: '#195054'}}>
            <div className="ds-mt-6 ds-text-size-14">
            {offer.description}
            </div>
            <b className="ds-mt-7 ds-text-size-15">{offer.unitPrice} Euro</b>
            </div>
            <Payment offerId={offer._id}/>
        </Card.Body>
      </Card>
</Col>
))}
</Row>
))} 
 </div>
 </div>
 {
      <div className="ds-flex ds-center">
      <ComponentPagination 
       currentPage={currentPage}
       totalPages={totalPages} 
       length={Array.isArray(offers) && offers?.length || 0}
       text="Pas d'offres" 
       handlePageChange={handlePageChange}/>
      </div>
 }   
        </>
    )

}