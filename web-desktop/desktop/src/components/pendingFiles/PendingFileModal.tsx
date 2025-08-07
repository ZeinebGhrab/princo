import { Modal } from "react-bootstrap";
import { SlPrinter } from "react-icons/sl";
import ComponentButton from "../../../../sharedComponent/ComponentButton";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { printTestPage } from '../../api/reducers/PrinterReducer';
import { setPrintedPendingFile } from "../../api/reducers/PendingFilesReducer";
import { createNotification } from "../../api/reducers/NotificationsReducer";
import { useEffect, useState, useCallback } from "react";
import PendingFiles from "../../interfaces/PendingFiles";

export default function PendingFileModal(
    { impression, show, handleClose }: { impression: PendingFiles, show: boolean, handleClose: () => void }
) {
    const dispatch = useAppDispatch();
    const authData = useAppSelector(state => state.auth.data);
    const [printingInProgress, setPrintingInProgress] = useState(false);
    const [currentFileIndex, setCurrentFileIndex] = useState(0);
    const [, setPrintingSuspended] = useState(false);

    const handleLaunchPrinting = () => {
        setPrintingInProgress(true);
        setPrintingSuspended(false); 
    };

    const handleStopPrinting = () => {
        setPrintingInProgress(false);
        handleClose();
    };

    const handlePrint = useCallback(async (pendingFile: {pdfBase64: string, _id: string,}) => {
            try {
                await dispatch(printTestPage({ printerName: impression.printerName, pdfBase64: pendingFile.pdfBase64 }));
                await dispatch(setPrintedPendingFile({ id: pendingFile._id, token:  authData?.token }));
                await new Promise(resolve => setTimeout(resolve, 3000)); 
            } catch (error) {
                await dispatch(createNotification({
                    token: authData?.token,
                    notification: {
                        connector: impression.connectorId,
                        date: new Date(),
                        message: 'Problème imprimante indisponible',
                        status: 'printer_issue',
                        user: authData?.id,
                    }
                })).unwrap()
                console.error(`L'imprimante ${impression.printerName} n'est pas disponible.`);
            }
    }, [authData?.id, authData?.token, dispatch, impression.connectorId, impression.printerName]);

    useEffect(() => {
        const printNextFile = async () => {
            if (currentFileIndex < impression.pendingFiles.length && printingInProgress) {
                await handlePrint(impression.pendingFiles[currentFileIndex]);
                setCurrentFileIndex(currentFileIndex + 1);
            } else {
                setPrintingInProgress(false);
            }
        };

        printNextFile();
    }, [currentFileIndex, impression.pendingFiles, printingInProgress, handlePrint]);

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className="ds-flex-col ds-center ds-flex">
                    <div className="ds-text-size-55 ds-mb-10" style={{ color: '#41448f' }}>
                        <SlPrinter />
                    </div>
                    <div className="ds-text-size-26" style={{ color: '#41448f' }}>
                        {impression.connectorName}
                    </div>
                    <div className="ds-text-size-20" style={{ color: '#41448f' }}>
                        {impression.printerName}
                    </div>
                    <div className="ds-text-size-18 ds-mt-5" style={{ color: '#195054' }}>
                        {impression.count} impression{impression.count !== 1 ? 's' : ''} en attente
                    </div>
                    <div className="ds-flex ds-justify-center ds-mt-5 ds-text-neutral900">
                        Vous avez {impression.count} impression{impression.count !== 1 ? 's' : ''} en attente sur l'imprimante {impression.printerName} assignée au connecteur {impression.connectorName}.
                    </div>
                </Modal.Body>
                <Modal.Footer className='ds-flex ds-justify-center ds-w-100'>
                    <ComponentButton
                        buttons={[
                            {
                                text: 'Lancer',
                                handleButtonClick: handleLaunchPrinting
                            },
                            {
                                text: 'Arrêter',
                                handleButtonClick: handleStopPrinting
                            },
                        ]}
                        size='medium'
                    />
                </Modal.Footer>
            </Modal>
        </>
    )
}
