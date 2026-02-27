import { fetchKzeeRecords } from "../services/kzee.service.js";
import { askPlayerCode } from "../utils/readline.utils.js";
import { PLAYER_CODE_MESSAGE } from "../config/constants.js";

export const getRecords = async () => {
    try {
        const kzeeRecords = await fetchKzeeRecords();
        const playerCode = await askPlayerCode(PLAYER_CODE_MESSAGE);
    } catch (error) {
        console.log(error);
    }
}
