import { JSDOM } from "jsdom";

export async function fetchHtml(url: string | URL) {
    const response = await fetch(url);
    const html = await response.text();

    const dom = new JSDOM(html);
    const document = dom.window.document;

    return document;
}