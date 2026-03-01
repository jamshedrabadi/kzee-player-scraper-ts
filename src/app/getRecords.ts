import { fetchKzeeRecords } from "../services/kzee.service.js";
import { askPlayerCode } from "../utils/readline.utils.js";
import { PLAYER_CODE_MESSAGE } from "../config/constants.js";
import { fetchPlayerRecords, mergePlayerRecords } from "../services/player.service.js";
import { generateHtml } from "../templates/player.template.js";
import { writeFile, openFile } from "../utils/file.utils.js";

export const getRecords = async (): Promise<void> => {
    try {
        const kzeeRecords = await fetchKzeeRecords();
        const playerCode = await askPlayerCode(PLAYER_CODE_MESSAGE);
        const { playerName, playerData } = await fetchPlayerRecords(playerCode);
        const mergedRecords = mergePlayerRecords(kzeeRecords, playerData);
        const generatedHtml = generateHtml(playerName, mergedRecords);
        writeFile(generatedHtml);
        await openFile();
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
}
