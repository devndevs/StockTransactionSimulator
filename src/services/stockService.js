export default class StockService {
    constructor({ stockRepository }) {
        this.stockRepository = stockRepository;
    }

    find() {
        return this.stockRepository.find();
    }

    create(data) {
        return this.stockRepository.create(data);
    }
}
