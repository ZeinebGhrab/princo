import { Validation } from "@piximind/validation";
import { emptyField } from "../../../../../sharedComponent/helpers/ErrorMsg";
import UpdateConnector from "../../../interfaces/connectors/UpdateConnector";

const validation = new Validation();

export const connectorValidation = (connector: UpdateConnector)=>{
    if (validation.isEmpty(connector.apiKey) || validation.isEmpty(connector.printerName)) {
        return emptyField;
    }
    else {
        return true;
    }
}