export default interface PropsDelete {
    data? : string;
    show : boolean;
    title : string;
    handleClose: () => void;
    handleDelete: () => void;
}