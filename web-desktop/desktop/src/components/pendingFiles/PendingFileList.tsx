import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../api/hooks"
import { getPendingFiles } from "../../api/reducers/PendingFilesReducer";
import NavApp from "../nav/NavApp";
import { Button, Text } from "@piximind/ds-p-23";
import { GrNext } from "react-icons/gr";
import { Card } from "react-bootstrap";
import ComponentPagination from "../../../../sharedComponent/ComponentPagination";
import { SlPrinter } from "react-icons/sl";
import PendingFileModal from "./PendingFileModal";
import Impression from "../../interfaces/PendingFiles";


export default function PendingFileList() {

    const dispatch = useAppDispatch();
    const authData = useAppSelector(state=>state.auth.data);
    const pendingFiles = useAppSelector(state=>state.pendingFiles.data);
    const [showModal, setShowModal]= useState(false);
    const [selectedImpression, setSelectedImpression] = useState<Impression>({} as Impression);

    const [currentPage, setCurrentPage] = useState(1);
    const limit = 6;

    const totalPages = useMemo(() => pendingFiles.length / limit + 1 , [pendingFiles, limit]);

    const handlePageChange = async (pageNumber: number): Promise<void> => {
    setCurrentPage(pageNumber);
  };

    const fetchPendingFiles = useCallback(async(): Promise<void> =>{
        try {
            const skip = limit * (currentPage - 1);
            await dispatch(getPendingFiles({id: authData?.id, token: authData?.token, skip, limit})).unwrap();
        }
        catch(error) {
            console.log(error);
        }
    },[authData?.id, authData?.token, currentPage, dispatch]);

    useEffect(()=>{
        fetchPendingFiles();
    },[fetchPendingFiles, showModal]);
    
    return (
    <>
    <NavApp />
      <div className="ds-mt-30 ds-ml-30 ds-flex ds-flex-col ds-justify-start ds-items-start">
  <Text
    text="Impressions en attente"
    style = {{color : '#41448f', fontWeight: 'bold'}}
    className="ds-text-size-30 ds-mb-20"
    onPointerEnterCapture={undefined} 
    onPointerLeaveCapture={undefined}   
  />
  <div className="ds-justify-start">
  {
    pendingFiles.map((pendingFile, index) => (
        <Card 
            key={index} 
            className='ds-box-shadow1'
            style={{ 
                width: '24rem', 
                height: '5rem',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor : '#eaeeeb',
                margin:'10px'
            }}
        >
             <Card.Body style={{padding:'5px'}} className="ds-flex ds-align-center ds-justify-between">
  <div style={{ color: '#195054', marginLeft:'6px'}} className="ds-flex ds-align-center ds-justify-between">
  <div className="ds-text-size-35 ds-text-neutral500 ds-align-center" >
  {
  <SlPrinter/>
  }
  </div>
    <div className="ds-ml-15 ds-align-center">
      <div><b>{pendingFile.connectorName}</b></div>
      <div className="ds-text-size-16">{pendingFile.printerName}</div>
      <div className="ds-text-size-14">{pendingFile.count}</div>
    </div>
  </div>
  <Button
  text={<GrNext className="ds-text-size-20 ds-flex-end" /> as unknown as string}
  style={{
    backgroundColor: '#fff',
    borderColor: '#fff',
    color: '#195054',
  }}
  onClick={()=>{setShowModal(true); setSelectedImpression(pendingFile);}}
  />
</Card.Body>
        </Card>
    ))
}

<ComponentPagination 
      currentPage={currentPage} 
      totalPages={totalPages} 
      text="Pas des impressions en attente"
      length={Array.isArray(pendingFiles) && pendingFiles?.length || 0}
      handlePageChange={handlePageChange}
 />

  </div>
  </div>
  <PendingFileModal
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        impression={selectedImpression}
        />
    </>
    )
}