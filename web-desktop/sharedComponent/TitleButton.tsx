import { SizeButton, TypeButton, Button } from "@piximind/ds-p-23";
import { ReactElement } from "react";

export default function TitleButton({text,className,handle }:{text: ReactElement | string ,className?: string,handle?: ()=>void }) {
   return(
    <>
    <Button
      text ={text as unknown as string}
      type={TypeButton.secondary}
      size={SizeButton.medium}
      style={{
        backgroundColor: '#fff',
        borderColor: '#41448f',
        color: '#41448f',
      }}  
      className={className}
      onClick={handle}
      />
    </>
   )
}