import { Container, Text } from "@piximind/ds-p-23";
import Navbar from "../../nav/NavApp";
import { Link } from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";

export default function SuccessfulPayment () {
    return (
        <>
        <Navbar/>
        <div className='ds-flex ds-center'>
            <div className="ds-m-100">
            <Container>
            <div className="ds-justify-center ds-flex ds-text-success500">
            <GiConfirmed className="ds-text-size-90"/>
            </div>
                <Text
                className="ds-text-success600 ds-text-size-40 ds-justify-center ds-flex"
                text = "Le paiement a confirmé "
                />
            </Container>

            <div className="ds-flex ds-justify-center">
            <Container className="ds-mt-10 ds-text-size-20 ds-text-neutral700">
            Vous pouvez accéder à <Link to='/invoices' style={{color: '#35C2CC', fontWeight:'500'}}>liste des factures </Link>
            pour télécharger ou prévisualiser la factures générée, ou bien revenir à 
            <Link to='/' style={{color: '#35C2CC', fontWeight:'500'}}> la page d'accueil.</Link>
            </Container>
            </div>
            </div>
        </div>
        </>
    )
}