export default interface CreateNotification {
        date: Date;
        message: string;
        status: string;
        connector: string;
        user: string | null | undefined;
}