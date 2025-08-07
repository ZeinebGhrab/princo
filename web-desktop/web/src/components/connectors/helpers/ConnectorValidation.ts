import Connector from "../../../interfaces/Connector";
import { Validation } from "@piximind/validation";
import { emptyField, validUrl } from "../../../../../sharedComponent/helpers/ErrorMsg";

const validation = new Validation();

export const connectorValidation = (connector: Connector)=>{
    if (validation.isEmpty(connector.connectorName) || validation.isEmpty(connector.webSite)) {
        return emptyField;
    }
    if(!validation.isUrl(connector.webSite)) {
        return validUrl;
    }
    else {
        return true;
    }
}