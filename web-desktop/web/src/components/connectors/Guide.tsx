import { Button, Container, Text, TypeButton } from "@piximind/ds-p-23"
import { Size, TextType } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { useRef, useState } from "react";
import { Card } from "react-bootstrap";
import NavApp from "../nav/NavApp";
import ComponentTitle from "../../../../sharedComponent/ComponentTitle";
import { Etapes } from "./helpers/Etapes";
import { Documentation } from "./helpers/Documentation";
import { useAppSelector } from "../../api/hooks";
import CopyButton from "../../../../sharedComponent/CopyButton";


export default function Guide({ exportGuide, apiKey }: { exportGuide: boolean, apiKey?: string }) {
  
    const authData = useAppSelector(state => state.authentication.data)
    const codeRef = useRef(null);
    const [copy, setCopy] = useState(false);
    const etapes = Etapes();
 
      const handleCopy = () => {
        const cardContent =  (codeRef?.current as unknown as HTMLElement)?.innerText;
        navigator.clipboard.writeText(cardContent);
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 3000);
      };
    
    return(
        <>
       {
        exportGuide ? (
            
            <Container className="ds-mt-30">
              <b>
                <Text
                text="Guide de mise en marche : "
                className="ds-text-size-23" 
                style ={{color:'#195054'}}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                />
              </b>
            </Container>
        ) :
        (  
            <>
            <NavApp />
            <ComponentTitle title="Guide de mise en marche" navigatePage='/'/>
            </>
        )
       }
       <div className={exportGuide ?  "" : "ds-ml-80 ds-w-50"}>
       {etapes.map((etape, index) => (
                <Container key={index} className={index === 0 ? "ds-mt-25" : "ds-mt-10 ds-mb-25"}>
                    <b style={{color: '#41448F'}}>{etape.title} : </b>
                    <span className="ds-text-neutral700">{etape.description}</span>
                    {Array.isArray(etape.details) ? (
                        <div className="ds-flex ds-align-center ds-mt-13">
                            {etape.details.map((detail, i) => (
                                <div key={i}>
                                    <Button
                                        text={detail.icon as unknown as string}
                                        type={TypeButton.primary}
                                        style={{
                                            backgroundColor: '#eaeeeb',
                                            color: (i=== 0 )? '#0073CD' : '#000',
                                            borderColor: '#eaeeeb'
                                        }}
                                        size={Size.large}
                                        className="ds-text-size-30 ds-mr-25"
                                    />
                                    <Text 
                                    text={detail.label} 
                                    type={TextType.caption}
                                    className="ds-ml-13 ds-text-neutral500"
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                     />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Text
                            text={etape.details}
                            type={TextType["body-2"]}
                            className="ds-mt-5 ds-text-neutral800"
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                        />
                    )}
                </Container>
            ))}

    <Container className="ds-mt-27 ds-mb-25"> 
        <div className="ds-mb-8">
          <b className="ds-text-neutral900">
          Vous êtes dans le cas d'un développement spécifique ? Vous pouvez utiliser directement l'API suivant :
          </b>
        </div>
      <Card style={{ width: '40rem', height:'15rem', background: '#eaeeeb', color:'#195054' }}>
      <div  className="ds-flex ds-justify-end ds-m-3">
      <CopyButton
      copy={copy}
      className="ds-flex ds-justify-end"
      handleCopy={handleCopy}
      />
      </div>
                <Card.Body>
                  <div className = "ds-text-size-12" ref={codeRef}>
                  <Documentation
                  user={authData?.id}
                  apiKey={apiKey}
                  />
                  </div>
                </Card.Body>
              </Card>
    </Container>
       </div>
        </>
    )
}