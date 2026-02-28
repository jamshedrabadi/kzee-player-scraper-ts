import type { KzeeRecord } from "../types/kzee.record.js";

export const parseKzee = (html: Document): KzeeRecord[] => {
    const table = html.querySelector("table");
    if (!table) {
        throw new Error("KZEE records list not found");
    }

    const rows = [...table.querySelectorAll("tbody tr")];
    const kzeeData = rows.map(row => {
        const cells = [...row.querySelectorAll("td")];

        return {
            map: cells[0]?.querySelector("a")?.textContent.trim() || "",
            player: cells[1]?.querySelector(".playerlink")?.textContent.trim() || "",
            time: cells[2]?.textContent.trim() || "",
            date: cells[3]?.textContent.trim() || "",
            difficulty: cells[4]?.textContent.trim() || "",
            length: cells[5]?.textContent.trim() || "",
            type: cells[6]?.textContent.trim() || ""
        };
    });

    return kzeeData;
}