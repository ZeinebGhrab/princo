import { Button } from "@piximind/ds-p-23";
import { RiEdit2Fill } from "react-icons/ri";
import { Size } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { TiDeleteOutline } from "react-icons/ti";

export default function EditDeleteButtons ({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void; }) {

    const buttons =[
        {
            text : <TiDeleteOutline/> as unknown as string,
            onclick: onDelete,
            style :{
              backgroundColor: '#F8F8F8',
              borderColor: '#F8F8F8',
              color: '#FF0000',
            },
        },
        {
            text : <RiEdit2Fill/> as unknown as string,
            onclick: onEdit,
            style :{
              backgroundColor: '#F8F8F8',
              borderColor: '#F8F8F8',
              color: '#dedc00',
            },
        }
    ]

    return (
      <div className="ds-justify-between ds-flex">
       
       {
  buttons.map((button, index) => (
    <Button
      key={index}
      text={button.text}
      size={Size.xSmall}
      className="ds-text-size-20 ds-mr-4"
      style={button.style}
      onClick={button.onclick}
    />
  ))
}
      </div>
    );
  }
  
  