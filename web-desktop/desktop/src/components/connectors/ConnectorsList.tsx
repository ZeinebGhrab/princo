import { useCallback, useEffect, useMemo, useState } from "react";
import NavApp from "../nav/NavApp";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { Link, useNavigate } from "react-router-dom";
import { getConnectors } from "../../api/reducers/ConnectorsReducer";
import Connector from "../../interfaces/connectors/Connector";
import { Col, Row } from "@piximind/ds-p-23";
import { Card } from "react-bootstrap";
import DeleteConnector from "./DeleteConnector";
import ComponentPagination from "../../../../sharedComponent/ComponentPagination";
import ComponentAdd from "../../../../sharedComponent/ComponentAdd";
import EditDeleteButtons from "../../../../sharedComponent/EditDeleteButtons";
import { groupDataByRows } from "../../../../sharedComponent/helpers/GroupDataByRows";

export default function ConnectorsList() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authData = useAppSelector(state => state.auth.data);
  const connectorsData = useAppSelector(state => state.connectors.data);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  const totalPages = useMemo(() : number =>{ 
  return Math.floor((Array.isArray(connectorsData.connectors) && connectorsData?.connectors.length || 0) / limit) + 1
},[connectorsData, limit]);

const handlePageChange = async (pageNumber: number): Promise<void> => {
  setCurrentPage(pageNumber);
};
  
  const showConnectors = useCallback(
    async (): Promise<void> => {
      try {
        const skip = limit * (currentPage - 1);
        dispatch(getConnectors({ id: authData?.id, token: authData?.token, skip, limit })).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  ,[authData?.id, authData?.token, currentPage, dispatch])

  const addConnector = async (): Promise<void> => {
    navigate('/addConnector');
  }

  useEffect(() => {
    showConnectors();
  }, [showConnectors,showDeleteModal]);

  const connectors = Array.isArray(connectorsData.connectors) && groupDataByRows(connectorsData.connectors);
    
    return(
        <>
        <NavApp/>
        <div>
        <div className="ds-justify-center ds-flex ds-mt-50">
        <div className="ds-mt-35">
        {Array.isArray(connectors) && connectors.map((rowConnectors: Connector[], rowIndex: number) => (
      <Row key={rowIndex} className="ds-mb-20">
        {rowConnectors.map((connector: Connector, colIndex: number) => (
          <Col key={colIndex}>
            <Card
             className='ds-box-shadow3'
             style={{ 
             width: '23rem', 
             height: '7rem',
             borderWidth: '1px',
             borderStyle: 'solid',
             borderColor : '#eaeeeb'
             }}>
              <Card.Body>
              <div className="ds-flex ds-justify-between ds-align-center ds-mb-7">
    <b className="ds-text-size-17" style = {{color : '#34475c'}}>{connector.connectorName}</b>
      <EditDeleteButtons 
      onEdit={() => navigate(`/editConnector/${connector._id}`)}
      onDelete={() => setShowDeleteModal(true)}   
      />
  </div>
                <div className="ds-text-size-15 ds-text-neutral500">{connector.webSite}</div>
                <div  className="ds-text-size-15 ds-text-neutral500">{connector.printerName}</div>
              </Card.Body>
            </Card>
            <DeleteConnector show={showDeleteModal} handleClose={()=>setShowDeleteModal(false)} id={connector._id}/>
          </Col>
        ))}
        {rowConnectors.length < 3  && (
          <Col key={rowConnectors.length}>
              <ComponentAdd
              title="Ajouter une imprimante"
              add = {() => addConnector()}
              height="7rem"
              width="23rem"
              />
          </Col>
        )}
      </Row>
    ))}

          {Array.isArray(connectors) && connectors.length > 0 && connectors[connectors.length - 1].length === 3 && (
            <Row key="connector" className="ds-mb-20">
              <Col>
              <ComponentAdd
              title="Ajouter une imprimante"
              add = {() => addConnector()}
              height="7rem"
              width="23rem"
              />
              </Col>
            </Row>
          )}
        </div>
      </div>
        </div>
      <div>
      <ComponentPagination 
      currentPage={currentPage} 
      totalPages={totalPages} 
      text="Pas de connecteurs"
      length={Array.isArray(connectorsData.connectors) && connectorsData.connectors.length || 0}
      handlePageChange={handlePageChange}
      buttonTitle="Créer votre premier imprimante"
      handleClick={()=>navigate(`/addConnector`)}
      />
        {
          Array.isArray(connectors) && connectors.length === 0 && (
              <span className="ds-text-neutral500 ds-text-size-16 ds-flex ds-center">
                Besoin d'aide ? <Link to={`${import.meta.env.VITE_WEB}/guide`} className='ds-ml-7 ds-text-neutral700' > Consultez le guide</Link>
              </span>
          )
        }     
      </div>
        </>
    )
}