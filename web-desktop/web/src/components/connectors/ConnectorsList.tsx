import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { getConnectors } from "../../api/reducers/ConnectorsReducer";
import Connector from "../../interfaces/Connector";
import { Col, Row } from "@piximind/ds-p-23";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavApp from "../nav/NavApp";
import ComponentPagination from "../../../../sharedComponent/ComponentPagination";
import { groupDataByRows } from "../../../../sharedComponent/helpers/GroupDataByRows";
import ComponentAdd from "../../../../sharedComponent/ComponentAdd";
import TitleButton from "../../../../sharedComponent/TitleButton";

export default function ConnectorsList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authData = useAppSelector(state => state.authentication.data);
  const connectorsData = useAppSelector(state => state.connectors.data);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  const totalPages = useMemo(() : number =>{ 
  return Math.floor((Array.isArray(connectorsData) && connectorsData?.length || 0) / limit) + 1
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
  ,[authData?.id, authData?.token, currentPage, dispatch, limit]);

  const connectors = Array.isArray(connectorsData) && groupDataByRows(connectorsData);

 
  const handleClick = (id : string | undefined) => {
    navigate(`/connectorDetails/${id}`);
  };

  useEffect(() => {
    showConnectors();
  }, [showConnectors]);

  return (
    <>
      <NavApp />
      <div>
        <div className="ds-justify-center ds-flex ds-mt-50">
        <div className="ds-mt-35">
        {Array.isArray(connectors) && connectors.map((rowConnectors: Connector[], rowIndex: number) => (
    <Row key={rowIndex} className="ds-mb-20">
      {rowConnectors.map((connector: Connector, colIndex: number) => (
        <Col key={colIndex}>
          <OverlayTrigger
            overlay={
              <Tooltip id="tooltip-disabled">
                Accéder aux détails du connecteur
              </Tooltip>
            }
          >
            <span className="d-inline-block">
              <Card
                onClick={() => handleClick(connector._id)}
                className='ds-box-shadow3'
                style={{
                  width: "20rem",
                  height: "7rem",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  cursor: "pointer",
                  borderColor: "#eaeeeb",
                }}
              >
                <Card.Title
                  style={{
                    display: "flex",
                    color: '#34475c',
                    alignItems: "center",
                    margin: "10px",
                  }}
                >
                  {connector.connectorName}
                </Card.Title>
                <Card.Body>
                  <TitleButton
                  text= {connector.isActive ? "Connecté" : "Déconnecté"}
                  />
                </Card.Body>
              </Card>
            </span>
          </OverlayTrigger>
        </Col>
      ))}
      {rowConnectors.length < 3 && (
        <Col key={rowConnectors.length}>
          <ComponentAdd
              title="Ajouter un connecteur"
              add = {() => navigate('/addConnector')}
              height="7rem"
              width="20rem"
              />
        </Col>
      )}
    </Row>
  ))}
  {Array.isArray(connectors) && connectors.length > 0 && connectors[connectors.length - 1].length === 3 && (
    <Row key="additionalRow" className="ds-mb-20">
      <Col key={connectors[connectors.length - 1].length}>
      <ComponentAdd
              title="Ajouter un connecteur"
              add = {() => navigate('/addConnector')}
              height="7rem"
              width="20rem"
              />
      </Col>
    </Row>
  )}
        </div>
       
       <div>
       {
      <ComponentPagination 
      currentPage={currentPage} 
      totalPages={totalPages} 
      text="Pas de connecteurs"
      length={Array.isArray(connectorsData) && connectorsData.length || 0}
      handlePageChange={handlePageChange}
      buttonTitle="Créer votre premier connecteur"
      handleClick={() => navigate('/addConnector')}
      />
        } 
        {
         Array.isArray(connectorsData) && connectorsData.length ===0 && (
              <span className="ds-flex ds-justify-center ds-text-neutral500 ds-text-size-16">
                Besoin d'aide ? 
                <Link to='/guide'
                 className='ds-ml-7 ds-text-neutral700'>
                    Consultez le guide
                    </Link>
              </span>
          )
        }
         </div>
       </div>
      </div>
    </>
  );
}