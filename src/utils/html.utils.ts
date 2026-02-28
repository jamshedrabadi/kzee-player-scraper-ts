import { JSDOM } from "jsdom";

import { delay } from "../utils/delay.js";
import { API_DELAY } from "../config/constants.js";

export const fetchHtml = async (url: URL | string): Promise<Document> => {
    await delay(API_DELAY); // Safe delay to prevent server overloads and rate limits

    const response = await fetch(url);
    const html = await response.text();

    const dom = new JSDOM(html);
    const document = dom.window.document;

    return document;
}