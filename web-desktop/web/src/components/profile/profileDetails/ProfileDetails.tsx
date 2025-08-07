import { Text, Avatar, Col, Row, Radio,  Container} from '@piximind/ds-p-23';
import PasswordModal from "./PasswordModal";
import { useState } from "react";
import ProfileNav from "../ProfileNav";
import { useAppSelector } from "../../../api/hooks";
import userLogo from "../../../assets/user.png";
import { useNavigate } from "react-router-dom";
import { profileDetailsFields } from "./helpers/ProfileDetailsFields";
import ProfileField from "../../../interfaces/ProfileFields";
import ComponentButton from "../../../../../sharedComponent/ComponentButton";


export default function ProfileDetails() {

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const navigate = useNavigate();
    const data = useAppSelector(state => state.profile.data);
    const fields: ProfileField[] = profileDetailsFields(data, false);
   
    return (
        <>
        <ProfileNav handleModify={()=>navigate('/EditProfileDetails')}/>
            <div className="ds-ml-100 ds-mt-50">
                <Row>
                    <Col>
                        <Avatar isActive={true} isImage={true} src={data.profileImage ? data.profileImage : userLogo }/>
                    </Col>
                    <Col className="ds-ml-20">
                {fields.map((field: ProfileField, index: number) => (
                 <Container key={index} className="ds-mb-18">
                     <>
                        <Text
                            text={field.label}
                            className='ds-mb-5 ds-text-size-16'
                            style={{color: '#34475c'}}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                        />
                        {field.type === 'radio' ? (
                          <Radio
                  label={field.label}
                  name='gender'
                  value={field.value as string}
                  className={`ds-ml-5 ${field.className}`}
                  data={field.options}
                  disabled={false}
                />
              ) : (
                <Text
                  text={field.value as string}
                  className={`ds-ml-5 ${field.className}`}
                  style={field.style}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />        
              )}
                     </>
                 </Container>
                ))}
               </Col>
                </Row>
                <Row>
                  <Col>
                  <ComponentButton
          buttons ={
            [
              {
                text:'Changer mon mot de passe',
                handleButtonClick: () => setShowPasswordModal(true),
              },
            ]
          }
          size= 'meduim'
          />
                  </Col>
                </Row>
            </div>
            <PasswordModal 
                show={showPasswordModal} 
                handleClose={() => setShowPasswordModal(false)} 
            />
        </>
    )
}