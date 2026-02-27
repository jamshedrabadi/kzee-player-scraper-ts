import { fetchHtml } from "../utils/html.utils.js";
import { parsePlayer } from "../parsers/player.parser.js";
import { PLAYER_RECORDS_URL } from "../config/constants.js";

export const fetchPlayerRecords = async (playerCode: number) => {
    const document = await fetchHtml(`${PLAYER_RECORDS_URL}/${playerCode}`);
    const parsedPlayer = parsePlayer(document);

    return parsedPlayer;
}
