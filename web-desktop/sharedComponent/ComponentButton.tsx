import {Size, TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import FormButton from "./FormButton";
import { Container, Text } from "@piximind/ds-p-23";


export default function ComponentButton (
    {size,buttons, errors}: {size?: string,errors?: { [key: string]: string },buttons: { text: string; handleButtonClick: () => void }[];}) {
    return (
        <>
        {errors && errors['message'] && (
            <Container>
              <Text
                text={errors['message']}
                className="ds-text-error600 ds-ml-3 ds-mt-20"
                type={TextType['subtitle-2']}
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
              />
            </Container>
          )}
    
        <div className="ds-flex ds-mt-10 ds-w-100">
        {buttons.map((button, index) => (
          <div key={index} className={`ds-w-100${index !== buttons.length - 1 ? ' ds-mr-10' : ''}`}>
            <FormButton
              handle={() => button.handleButtonClick()}
              size={size? Size.medium : Size.small}
              text={button.text}
              type={index %2 == 0 ? Type.primary : Type.secondary}
              style={index %2 == 0 ? { backgroundColor: '#41448f',borderColor:'#41448f'}: {color: '#41448f', borderColor: '#41448f'}}
            />
           </div>
        ))}
        </div>
        </>
    )
}