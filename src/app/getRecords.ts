import { fetchKzeeRecords } from "../services/kzee.service.js";
import { askPlayerCode } from "../utils/readline.utils.js";
import { PLAYER_CODE_MESSAGE } from "../config/constants.js";
import { fetchPlayerRecords } from "../services/player.service.js";

export const getRecords = async () => {
    try {
        const kzeeRecords = await fetchKzeeRecords();
        const playerCode = await askPlayerCode(PLAYER_CODE_MESSAGE);
        const playerData = await fetchPlayerRecords(playerCode);
        console.log('kzeeRecords --- ', kzeeRecords);
        console.log('playerData --- ', playerData);
    } catch (error) {
        console.log(error);
    }
}
