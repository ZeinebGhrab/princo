import { Row, Text } from '@piximind/ds-p-23';
import { TextType } from '@piximind/ds-p-23/lib/esn/Interfaces';
import { TbError404 } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';

export default function PageNotFound() {
    const navigate = useNavigate();


    return (
        <div className='ds-m-50'>
            <Row className='ds-justify-center'>
                <Text 
                    text={<TbError404 /> as unknown as string} 
                    className='ds-text-error700 ds-text-size-100' 
                    onPointerEnterCapture={undefined} 
                    onPointerLeaveCapture={undefined} 
                    />
            </Row>
            <Row className='ds-justify-center'>
                <Text 
                    text='Page non trouvée !' 
                    className="ds-text-neutral700" 
                    type={TextType['type-4']} 
                    onPointerEnterCapture={undefined} 
                    onPointerLeaveCapture={undefined}
                    />
            </Row>
            <Row className='ds-justify-center ds-mt-4'>
                <Text
                    text="La page que vous tentez d'afficher n'existe pas ou un autre erreur s'est produite"
                    className="ds-text-neutral800"
                    type={TextType['type-5']} 
                    onPointerEnterCapture={undefined} 
                    onPointerLeaveCapture={undefined}
                    />
                    <div className='ds-text-size-17 ds-text-neutral900'>
                        Vous pouvez revenir à  
                    <Link onClick={() => navigate(-1)} to={''} style={{color: '#35C2CC', fontWeight:'bold'}}> la page précédente </Link> 
                        ou aller à <Link to='/' style={{color: '#35C2CC', fontWeight:'bold'}}>la page d'acceuil</Link>.
                    </div>
            </Row>
        </div>
    )
}
