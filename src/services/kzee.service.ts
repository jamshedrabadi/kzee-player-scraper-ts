import { fetchHtml } from "../utils/html.utils.js";
import { parseKzee } from "../parsers/kzee.parser.js";
import { KZEE_RECORDS_URL } from "../config/constants.js";

export const fetchKzeeRecords = async () => {
    const document = await fetchHtml(KZEE_RECORDS_URL);
    const parsedKzee = parseKzee(document);
    
    return parsedKzee;
}