export default interface Props {
    notification: {
        icon: JSX.Element,
        message: string,
        status:string,
        date: string,
    };
    show : boolean;
    handleClose: () => void;
}