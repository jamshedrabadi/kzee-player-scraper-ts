import { fetchHtml } from "../utils/html.utils.js";
import { parseKzee } from "../parsers/kzee.parser.js";
import { KZEE_RECORDS_URL } from "../config/constants.js";
import type { KzeeRecord } from "../types/kzee.record.js";

export const fetchKzeeRecords = async (): Promise<KzeeRecord[]> => {
    const document = await fetchHtml(KZEE_RECORDS_URL);
    const parsedKzee = parseKzee(document);

    return parsedKzee;
}