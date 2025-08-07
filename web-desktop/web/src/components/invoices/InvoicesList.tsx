import { Container, Row } from "@piximind/ds-p-23";
import Navbar from "../nav/NavApp";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { downloadInvoice, getInvoices } from "../../api/reducers/InvoiceReducer";
import Invoice from "../../interfaces/Invoice";
import { Card, Col } from "react-bootstrap";
import { MdOpenInNew, MdOutlineFileDownload } from "react-icons/md";
import moment from "moment";
import ComponentPagination from "../../../../sharedComponent/ComponentPagination";
import ComponentTitle from "../../../../sharedComponent/ComponentTitle";
import { groupDataByRows } from "../../../../sharedComponent/helpers/GroupDataByRows";
import ComponentButton from "../../../../sharedComponent/ComponentButton";

export default function InvoicesList (){

    const invoicesData = useAppSelector(state=>state.invoices.data);
    const authData = useAppSelector(state => state.authentication.data);
    const dispatch = useAppDispatch();
    const invoices = Array.isArray(invoicesData) ? groupDataByRows(invoicesData) : [];

    const [currentPage, setCurrentPage] = useState(1);
    const limit = 6;
  
    const totalPages = useMemo(() : number =>{ 
    return Math.floor((invoicesData?.length || 0) / limit) + 1
  },[invoicesData?.length]);

  const handlePageChange = async (pageNumber: number): Promise<void> => {
    setCurrentPage(pageNumber);
  };

    const fetchInvoices = useCallback(async () : Promise<void> => {
        try {
            const skip = limit * (currentPage - 1);
            await dispatch(getInvoices({id: authData?.id , token: authData?.token,skip,limit})).unwrap();
        }
        catch(error) {
            console.log(error);
        }
    },[authData?.id, authData?.token, currentPage, dispatch]);

    const download = async (invoicePath: string | null | undefined, ref: string | null | undefined) =>{
        try {
          await dispatch(downloadInvoice({invoicePath,ref,token: authData?.token})).unwrap();
        }
        catch(error) {
            console.log(error);
        }
    }

    const open = (invoicePath: string | null | undefined) : void =>{
        try {
            window.open(`${import.meta.env.VITE_SERVER_URL}/${invoicePath}`, '_blank');
        }
        catch(error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchInvoices();
    },[fetchInvoices])

    return(
        <>
        <Navbar/>
            <ComponentTitle title="Mes factures" navigatePage='/'/>
            <div className="ds-justify-start ds-flex ds-mt-12 ds-ml-100">
            <div >
            {invoices?.map((rowInvoices: Invoice[], rowIndex: number) => (
              <Row key={rowIndex}>
                  {rowInvoices.map((invoice: Invoice, colIndex: number) => (
                <Col key={colIndex}>
                 <Card
                  key={colIndex}
                  className='ds-box-shadow3'
                  style={{
                  width: "24rem",
                  height: "11rem",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "#eaeeeb",
                  margin:'10px',
                  }}
                >
      <Card.Body>
        <Container
        style={{color: '#34475c'}}
        className="ds-mb-3 ds-text-size-18"
        children ={
          <b>
          Facture {invoice.ref}
          </b>
        }
        />
        <Container
        className="ds-text-size-15"
        style={{
          borderTop: '2px solid #E3E3E6',
          color: '#3f5165'
        }}        
        children = {
            <>
            <div className="ds-mt-2"> Pack Premium : <span style={{fontWeight:'600'}}>{invoice.premiumPack}</span> </div>
            <div>Date : <span style={{fontWeight:'600'}}>{moment(invoice.date).format("DD/MM/YYYY")}</span></div> 
            <div>Montant : <span style={{fontWeight:'600'}}>{invoice.amount} Euro</span></div>
            </>
        }
        />
        
          <ComponentButton
          buttons ={
            [
              {
                text: <><MdOutlineFileDownload className="ds-text-size-17 ds-mr-4"/>Télécharger</> as unknown as string,
                handleButtonClick: ()=> download(invoice.invoicePath,invoice.ref)
        
              },
              {
                text: <><MdOpenInNew className="ds-text-size-17 ds-mr-4" />Aperçu</> as unknown as string,
                handleButtonClick: ()=> open(invoice.invoicePath)
        
              },
        
            ]
          }
          />
       
      </Card.Body>
    </Card>
</Col>
))}
</Row>
))} 
    {
      <ComponentPagination
         currentPage={currentPage}
         totalPages={totalPages}
         length={invoicesData?.length || 0}
         text="Pas de factures" 
         handlePageChange={handlePageChange}
         />
    }  
     </div>        
        </div>
        </>
    )
}