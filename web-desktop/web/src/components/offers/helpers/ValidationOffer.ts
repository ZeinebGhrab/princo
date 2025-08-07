import { Offer } from "../../../interfaces/Offer";
import { Validation } from "@piximind/validation";
const validation = new Validation();

export const validationOffer = (offer: Offer) =>{
    if(
        validation.isEmpty(offer.description) 
        || validation.isEmpty(offer.title) 
        || validation.isEmpty(offer.discount as unknown as string) 
        || validation.isEmpty(offer.ticketsNumber as unknown as string) 
        || validation.isEmpty(offer.tva as unknown as string) 
        || validation.isEmpty(offer.unitPrice as unknown as string) || validation.isEmpty(offer.expirationDate as unknown as string)
     )
     return true;
}