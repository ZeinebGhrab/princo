import { Button } from "@piximind/ds-p-23";
import { Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { Card } from "react-bootstrap";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function ComponentAdd ({title, add, height, width} : {title: string, add: ()=>void, height: string, width: string }) {
    return (
        <>
         <Card 
                className='ds-box-shadow3'
                style=
                {{ 
                width, 
                height,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor : '#eaeeeb'
                }}
                >
                  <Card.Body>
                    <div className="ds-flex ds-justify-center ds-mb-1 ds-mt-5">
                    <Button
                  text={<IoIosAddCircleOutline /> as unknown as string}
                  className="ds-text-size-30"
                  style={{
                    backgroundColor: '#fff',
                    color:'#41448f',
                  }}
                  type={Type.primary}
                  onClick={() => add()}
                />
                    </div>
                    <Card.Title style={{ textAlign: 'center', color: '#41448f'}}>{title}</Card.Title>
                  </Card.Body>
                </Card>
        </>
    )
}