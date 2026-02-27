import { fetchKzeeRecords } from "../services/kzee.service.js";

export const getRecords = async () => {
    try {
        const kzeeRecords = await fetchKzeeRecords();
        console.log('kzeeRecords --- ', kzeeRecords);
    } catch (error) {
        console.log(error);
    }
}
