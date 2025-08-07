import { Button, Text } from "@piximind/ds-p-23";
import { Type, Size } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function ComponentTitle({title, navigatePage}: {title: string, navigatePage: string}){

    const navigate = useNavigate();

    return (
        <>
        <div className="ds-flex ds-align-center ds-ml-58 ds-mt-40">
     <Button
      text={<IoIosArrowRoundBack /> as unknown as string}
      type={Type.tertiary}
      className="ds-text-size-55"
      style = {{color : '#41448f'}}
      size={Size.small}
      onClick={() => navigate(navigatePage)}
    />
    <Text
      text= {title}
      className="ds-text-size-30"
      style = {{color : '#41448f', fontWeight: 'bold'}}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    />
    </div>
        </>
    )
}