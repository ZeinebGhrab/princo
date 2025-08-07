import { IChangeDatePicker } from "@piximind/ds-p-23/lib/esn/Interfaces/Molecule/IMoleculeDatepicker/IMoleculeDatepicker";
import ProfileInvoiceDetails from "./InvoiceDetails";

export default interface User {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    gender?: string,
    tel?: string,
    profileImage? : string,
    birthDate?: Date | IChangeDatePicker,
    country?: string,
    profile?: string,
    password?: string,
    invoiceDetails? : ProfileInvoiceDetails,
    tickets?: number,
    ticketsExpirationDate: Date,
}