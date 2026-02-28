import { fetchHtml } from "../utils/html.utils.js";
import { parsePlayer } from "../parsers/player.parser.js";
import { PLAYER_RECORDS_URL } from "../config/constants.js";
import type { PlayerData } from "../types/player.data.js";

export const fetchPlayerRecords = async (playerCode: number): Promise<PlayerData> => {
    const document = await fetchHtml(`${PLAYER_RECORDS_URL}/${playerCode}`);
    const parsedPlayer = parsePlayer(document);

    return parsedPlayer;
}
