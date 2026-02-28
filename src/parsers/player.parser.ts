import type { PlayerData } from "../types/player.data.js";

export const parsePlayer = (html: Document): PlayerData => {
    const playerName = parsePlayerName(html);
    if (!playerName) {
        throw new Error("Player not found")
    }

    const table = html.querySelector("table");
    if (!table) {
        throw new Error("Player records list not found");
    }

    const rows = [...table.querySelectorAll("tbody tr")];
    const playerData = rows.map(row => {
        const cells = [...row.querySelectorAll("td")];

        return {
            map: cells[1]?.querySelector("a")?.textContent.trim() || "",
            time: cells[2]?.textContent.trim() || "",
            date: cells[3]?.textContent.trim() || "",
            position: cells[4]?.textContent.trim() || "",
            average: cells[5]?.textContent.trim() || ""
        };
    });

    return { playerName, playerData };
}

export const parsePlayerName = (html: Document): string | null => {
    const playerName = html.querySelector(".playername");

    return playerName ? playerName.textContent.trim() : playerName;
}
