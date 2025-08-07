import { TextType, Text  } from "@piximind/ds-p-23";
import { FormEvent } from "react";
import FormButton from "./FormButton";
import { Size, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";

export function FormFooter({
  errors,
  text,
  buttons,
}: {
  errors?: { [key: string]: string };
  text?: string;
  buttons: { text: string; handleButtonClick: (e: FormEvent<Element>) => void }[];
}) {
  return (
    <>
      {errors && errors['message'] && (
          <Text
            text={errors['message']}
            className="ds-text-error600 ds-ml-3 ds-mt-20"
            type={TextType['subtitle-2']}
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          />
      )}

      <div>
        {buttons.map((button, index) => (
          <div key={index} className={index !=0 ? 'ds-mt-20' :'ds-mt-5'}>
            <FormButton
              handle={(e: FormEvent<Element>) => button.handleButtonClick(e)}
              text={button.text}
              type={index %2 == 0 ? Type.primary : Type.secondary}
              style={index %2 == 0 ? { backgroundColor: '#41448f',borderColor:'#41448f'}: {color: '#41448f', borderColor: '#41448f'}}
              size={Size.large}
            />
            {index === 0 && text && (
              <Text
                text={text}
                className="ds-mb-13 ds-mt-13 ds-w-100 ds-text-secondaryDarker ds-flex ds-justify-center ds-align-center"
                type={TextType['body-1']}
                style={{color: '#41448f', borderColor:'#41448f'}}
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
