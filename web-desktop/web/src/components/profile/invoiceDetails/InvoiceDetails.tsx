import { Text, Col, Container } from "@piximind/ds-p-23";
import { useAppSelector } from "../../../api/hooks";
import ProfileNav from "../ProfileNav";
import { useNavigate } from "react-router-dom";
import { InvoiceDetailsFields } from "./helpers/InvoiceDetailsFields";

export default function InvoiceDetails ()  {
    
    const data = useAppSelector(state => state.profile.data.invoiceDetails);
    const navigate = useNavigate();
    const fields = InvoiceDetailsFields(data, false);

    return (
        <>
        <ProfileNav handleModify={()=>navigate('/editInvoiceDetails')}/>
        <Col className="ds-ml-125 ds-mt-50">
        {fields.map((field, index) => (
          <Container key={index} className="ds-mb-18">
            <>
              <Text
                text={field.label}
                className='ds-mb-5 ds-text-size-16'
                style={{ color: '#34475c' }}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <Text
                text={field.value}
                className={`ds-ml-5 ${field.className}`}
                style={field.style}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </>
          </Container>
        ))}
        </Col>
        </>
    )
}