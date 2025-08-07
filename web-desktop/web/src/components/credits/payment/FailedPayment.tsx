import { FcCancel } from "react-icons/fc";
import Navbar from "../../nav/NavApp";
import { Container, Text } from "@piximind/ds-p-23";
import { Link } from "react-router-dom";

export default function FailedPayment () {
    return (
        <>
        <Navbar/>
        <div className='ds-flex ds-center'>
            <div className="ds-m-100">
            <Container>
            <div className="ds-justify-center ds-flex">
            <FcCancel className="ds-text-size-100"/>
            </div>
                <Text
                className="ds-text-error700 ds-text-size-40 ds-justify-center ds-flex"
                text = "Le paiement est échoué."
                />
            </Container>

            <div className="ds-flex ds-justify-center">
            <Container className="ds-mt-10 ds-text-size-20 ds-text-neutral700">
            Vous pouvez retourner à <Link to='/credit' style={{color: '#35C2CC', fontWeight:'500'}}>la page d'achat de crédits </Link>
            pour effectuer une nouvelle tentative, ou bien revenir à 
            <Link to='/' style={{color: '#35C2CC', fontWeight:'500'}}> la page d'accueil.</Link>
            </Container>
            </div>
            </div>
        </div>
        </>
    )
}