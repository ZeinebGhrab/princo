import NavApp from "../nav/NavApp";
import { Col, Row } from "@piximind/ds-p-23";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getAdminOffers } from "../../api/reducers/OfferReducer";
import { Offer } from "../../interfaces/Offer";
import { Card } from "react-bootstrap";
import ComponentPagination from "../../../../sharedComponent/ComponentPagination";
import DeleteOffer from "./DeleteOffer";
import ComponentTitle from "../../../../sharedComponent/ComponentTitle";
import { groupDataByRows } from "../../../../sharedComponent/helpers/GroupDataByRows";
import EditDeleteButtons from "../../../../sharedComponent/EditDeleteButtons";
import ComponentAdd from "../../../../sharedComponent/ComponentAdd";

export default function OffersList() {

    const navigate = useNavigate();
    const offerData = useAppSelector(state=>state.offers.data);
    const authData = useAppSelector(state => state.authentication.data);
    const dispatch = useAppDispatch();
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [idOffer, setIdOffer] = useState<string | undefined>(undefined);

    const [currentPage, setCurrentPage] = useState(1);
    const limit = 8;
  
    const totalPages = useMemo(() : number =>{ 
    return Math.floor((Array.isArray(offerData) && offerData?.length || 0) / limit) + 1
  },[offerData, limit]);

  const handlePageChange = async (pageNumber: number): Promise<void> => {
    setCurrentPage(pageNumber);
  };

    const fetchOffers = useCallback(async () : Promise<void> => {
        try {
            const skip = limit * (currentPage - 1);
            await dispatch(getAdminOffers({id: authData?.id, token: authData?.token ,skip,limit})).unwrap()
        }
        catch(error) {
            console.log(error);
        }
    },[authData, currentPage, dispatch]);

    const offers = Array.isArray(offerData) && groupDataByRows(offerData);
    
    useEffect(()=>{
        fetchOffers();
    },[fetchOffers, showModalDelete]);
    
    return(
        <>
        <NavApp/>
           <ComponentTitle title="Mes offres" navigatePage='/'/>
        <div className="ds-justify-center ds-flex ds-mt-12 ds-ml-45">
        <div>
{Array.isArray(offers) && offers?.map((rowOffers: Offer[], rowIndex: number) => (
<Row key={rowIndex} className="ds-mb-20">
{rowOffers.map((offer: Offer, colIndex: number) => (
<Col key={colIndex}>
      <Card
        className='ds-box-shadow3'
        style={{
          width: "25rem",
          height: "8rem",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#eaeeeb",
        }}
      >
        <Card.Body>
          <div  className="ds-flex ds-justify-between" style={{ width: "100%" }}>
            <div>
            <b className='ds-text-size-17' style ={{color: '#34475c'}}>{offer.title}</b>
            </div>
            <EditDeleteButtons 
      onEdit={()=>navigate(`/editOffer/${offer._id}`)}
      onDelete={()=>{if (offer._id) {setShowModalDelete(true); setIdOffer(offer._id);}}}
      />
          </div>
            <div className='ds-mt-3' style={{borderTop: '2px solid #E3E3E6',color: '#195054'}}>
            <div className="ds-mt-6 ds-text-size-14">
            {offer.description}
            </div>
            <div className="ds-mt-4">
            <b className="ds-text-size-14">{offer.unitPrice} Euro</b>
            </div>
            </div>
        </Card.Body>
      </Card>
</Col>
))}
      {rowOffers.length < 3 && (
        <Col key={rowOffers.length}>
        <ComponentAdd
              title="Ajouter une offre"
              add = {() => navigate('/addOffer')}
              height="8rem"
              width="25rem"
              />
        </Col>
      )}
</Row>
))} 
  {Array.isArray(offers) && offers.length > 0 && offers[offers.length - 1].length === 3 && (
    <Row key="additionalRow" className="ds-mb-20">
      <Col key={offers[offers.length - 1].length}>
      <ComponentAdd
              title="Ajouter une offre"
              add = {() => navigate('/addOffer')}
              height="8rem"
              width="25rem"
              />
      </Col>
    </Row>
  )}
 {
      <ComponentPagination 
       currentPage={currentPage}
       totalPages={totalPages} 
       length={Array.isArray(offers) && offers?.length || 0}
       text="Pas d'offres" 
       handlePageChange={handlePageChange}
       buttonTitle="Créer votre premier offre"
       handleClick={()=>navigate('/addOffer')}
       />
 }  
 </div>
 </div>  
 <DeleteOffer data={idOffer} show={showModalDelete} handleClose={()=>setShowModalDelete(false)} />
 </>
    )

}