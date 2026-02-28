import * as readline from 'readline';

export const askPlayerCode = async (query: string): Promise<number> => {
    while (true) {
        try {
            const input = await askQuestion(query);

            // Check if input is a number
            if (!input || isNaN(Number(input))) {
                console.log("Please enter a valid player code.");
                continue; // re-ask
            }

            return Number(input); // valid number, return it
        } catch (err) {
            console.error("Error in getPlayerCode:", err);
        }
    }
}

const askQuestion = async (query: string): Promise<string> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(query, answer => {
            rl.close();
            resolve(answer.trim()); // trim spaces
        });
    });
}