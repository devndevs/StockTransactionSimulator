import { readFile, writeFile } from 'node:fs/promises';
export default class StockRepository {
    constructor({ file }) {
        this.file = file;
    }

    async #currentFileContent() {
        return JSON.parse(await readFile(this.file));
    }

    find() {
        return this.#currentFileContent();
    }

    create(data) {
        const currentFile = await this.#currentFileContent();
        currentFile.push(data);

        await writeFile(this.file, JSON.stringify(currentFile));

        return data.id;
    }
}

/*
const stockRepository = new StockRepository({
    file: './../database/data.json',
});


console.log(
    await stockRepository.create({
        symbol: 'AAPL',
        name: 'Apple',
    }),
);
console.log(await stockRepository.find());
*/
