import { Button, TypeButton } from "@piximind/ds-p-23";
import { Size } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { LuCopyCheck } from "react-icons/lu";
import { MdCopyAll } from "react-icons/md";

export default  function CopyButton ({copy,className,handleCopy}:{copy: boolean,className: string,handleCopy: () => void}) {
    return(
        <Button 
        text={<>{copy ? <LuCopyCheck className="ds-text-size-19 ds-mr-3" /> :<MdCopyAll className="ds-text-size-19 ds-mr-3" />} Copier</> as unknown as string}
        size = {Size.medium}
        type = {TypeButton.secondary}
        style ={{color: '#536375', borderColor: '#536375'}}
        className={className}
        onClick={handleCopy}
        />
    )
}