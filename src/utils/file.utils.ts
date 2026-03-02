import * as fs from "fs";
import * as path from "path";
import open from "open";

import { OUTPUT_FILE } from "../config/constants.js";

export const writeFile = (html: string) => {
    fs.writeFileSync(
        path.resolve(import.meta.dirname, OUTPUT_FILE),
        html
    );
}

export const openFile = async () => {
    await open(path.resolve(import.meta.dirname, OUTPUT_FILE), { wait: true });
}
