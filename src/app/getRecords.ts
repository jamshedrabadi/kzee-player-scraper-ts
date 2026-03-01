import { fetchKzeeRecords } from "../services/kzee.service.js";
import { askPlayerCode } from "../utils/readline.utils.js";
import { PLAYER_CODE_MESSAGE } from "../config/constants.js";
import { fetchPlayerRecords, mergePlayerRecords } from "../services/player.service.js";

export const getRecords = async () => {
    try {
        const kzeeRecords = await fetchKzeeRecords();
        const playerCode = await askPlayerCode(PLAYER_CODE_MESSAGE);
        const playerData = await fetchPlayerRecords(playerCode);
        const mergedRecords = mergePlayerRecords(kzeeRecords, playerData.playerData);
        console.log('mergedRecords --- ', mergedRecords);
    } catch (error) {
        console.log(error);
    }
}
