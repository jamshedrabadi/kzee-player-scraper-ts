import { fetchHtml } from "../utils/html.utils.js";
import { parsePlayer, mergeRecords } from "../parsers/player.parser.js";
import { PLAYER_RECORDS_URL } from "../config/constants.js";
import type { PlayerData } from "../types/player.data.js";
import type { KzeeRecord } from "../types/kzee.record.js";
import type { PlayerRecord } from "../types/player.record.js";
import type { MergedRecord } from "../types/merged.record.js";

export const fetchPlayerRecords = async (playerCode: number): Promise<PlayerData> => {
    const document = await fetchHtml(`${PLAYER_RECORDS_URL}/${playerCode}`);
    const parsedPlayer = parsePlayer(document);

    return parsedPlayer;
}

export const mergePlayerRecords = (kzeeRecords: KzeeRecord[], playerRecords: PlayerRecord[]): MergedRecord[] => {
    return mergeRecords(kzeeRecords, playerRecords);
}
