import { IChangeDatePicker } from "@piximind/ds-p-23/lib/esn/Interfaces/Molecule/IMoleculeDatepicker/IMoleculeDatepicker";

export default interface EditUser {
    firstName: string,
    lastName: string,
    email: string,
    gender?: string,
    tel?: string,
    birthDate?: Date | IChangeDatePicker,
    country?: string,
    profile?: string,
    pictureContentType?: string,
}