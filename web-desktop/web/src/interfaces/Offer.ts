import { IChangeDatePicker } from "@piximind/ds-p-23/lib/esn/Interfaces/Molecule/IMoleculeDatepicker/IMoleculeDatepicker";

export interface Offer {
    _id?: string,
    title: string,
    description: string,
    unitPrice: number,
    tva: number,
    discount: number,
    ticketsNumber: number,
    expirationDate: Date | IChangeDatePicker,
    admin: string | null | undefined,
}