import type { KzeeRecord } from "../types/kzee.record.js";
import type { MapInfo } from "../types/map.info.js";
import type { MergedRecord } from "../types/merged.record.js";
import type { PlayerData } from "../types/player.data.js";
import type { PlayerRecord } from "../types/player.record.js";
import { DIFFICULTY_ORDER } from "../config/constants.js";

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
            map: cells[1]?.querySelector("a")?.textContent?.trim() || "",
            time: cells[2]?.textContent?.trim() || "",
            date: cells[3]?.textContent?.trim() || "",
            position: cells[4]?.textContent?.trim() || "",
            average: cells[5]?.textContent?.trim() || ""
        };
    });

    return { playerName, playerData };
}

export const parsePlayerName = (html: Document): string | null => {
    const playerName = html.querySelector(".playername");

    return playerName ? playerName.textContent?.trim() : playerName;
}

export const mergeRecords = (kzeeRecords: KzeeRecord[], playerRecords: PlayerRecord[]): MergedRecord[] => {
    const mapLookup: MapInfo = {}; // Build fast lookup table from kzeeRecords

    kzeeRecords.forEach(record => {
        mapLookup[record.map] = {
            length: record.length,
            difficulty: record.difficulty,
            type: record.type
        };
    });

    // Merge based on map
    const mergedRecords = playerRecords.map(record => {
        const currentMap = mapLookup[record.map];
        if (!currentMap) {
            throw new Error(`Map not found in kzeeRecords: ${record.map}`);
        }

        return {
            map: record.map,
            position: record.position,
            average: record.average,
            time: record.time,
            date: record.date,
            type: currentMap.type,
            length: currentMap.length,
            difficulty: currentMap.difficulty,
        };
    });

    const difficultyMap = new Map(
        DIFFICULTY_ORDER.map((d, i) => ([d, i]))
    );
    mergedRecords.sort((a, b) => 
        difficultyMap.get(a.difficulty)! - difficultyMap.get(b.difficulty)!
    );

    // below is unoptimized O(n), while above is O(1)
    // mergedRecords.sort((a, b) => {
    //     const aIndex = DIFFICULTY_ORDER.indexOf(a.difficulty);
    //     const bIndex = DIFFICULTY_ORDER.indexOf(b.difficulty);

    //     return aIndex - bIndex;
    // });

    return mergedRecords;
}
