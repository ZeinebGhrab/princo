export default interface Invoice {
    _id: string,
    ref: string,
    premiumPack: string,
    date: Date, 
    amount:number,
    invoicePath: string,
}