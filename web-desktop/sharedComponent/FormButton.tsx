import { Button } from "@piximind/ds-p-23";
import { Size, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { FormEvent } from "react";

export default function FormButton ({text, type, handle, style, size}: 
    {text: string, type: Type,handle: (e: FormEvent<Element>)=> void,style: object, size?: Size}) {
    return (
        <>
        <Button 
                type={type}
                className='ds-w-100 ds-mb-10' 
                size={size}
                onClick={(e: FormEvent<Element>) => handle(e)}
                text={text}
                style={style}
            />
        </>
    )
}