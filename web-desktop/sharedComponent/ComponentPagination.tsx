import { Pagination} from "react-bootstrap";
import { Button, Container,Text, TextType, TypeButton } from "@piximind/ds-p-23";
import { LuCircleOff } from "react-icons/lu";
import { Size } from "@piximind/ds-p-23/lib/esn/Interfaces";


export default function ComponentPagination({ currentPage, totalPages, text,length, handlePageChange, handleClick, buttonTitle }: 
  {
    currentPage: number;
    totalPages: number;
    length: number;
    text?: string;
    handlePageChange: (pageNumber: number) => void;
    handleClick?: () => void;
     buttonTitle?: string;
  }
) {

    return(
      <>
      {length!== 0 && (
        <Pagination className="ds-mb-10 ds-flex ds-justify-center ds-text-neutral800 fixed-bottom">
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          <Pagination.Item>{currentPage}</Pagination.Item>
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
        </Pagination>
      )}
      {
        length === 0 && (
                <div className="ds-mt-100 ds-flex ds-center">
                  <Container
                  className="ds-justify-center"
                  children = {
                    <>
                    <div className='ds-text-size-90 ds-flex ds-justify-center' style = {{color : '#2D5F63'}}>
                    <LuCircleOff />
                    </div>
                    <Text
                    text={text}
                    type={TextType["type-4"]}
                    style = {{color : '#2D5F63'}}
                    className='ds-flex ds-justify-center'
                    onPointerEnterCapture={undefined} 
                    onPointerLeaveCapture={undefined} 
                    />
                        {
                          buttonTitle && handleClick && (
                            <div className="ds-flex ds-justify-center">
                           <Button
                           text = {buttonTitle}
                           className="ds-mb-12"
                           onClick={()=>handleClick()}
                           type={TypeButton.secondary}
                           size={Size.large} 
                           style = {{
                             fontSize: '16px',
                             borderColor : '#41448f',
                             color : '#41448f'
                           }}
                           />
                           </div>
                          )
                        }
                    </>                
        }
                  />
                </div>
        )
      }
    </>
    )
}