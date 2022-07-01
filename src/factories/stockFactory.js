import StockRepository from '../entities/stock.js';
import StockService from '../services/stockService.js';

const generateInstance = ({ filepath }) => {
    //stock goes all db connections
    const stockRepository = new StockRepository({
        file: filepath,
    });
    const stockService = new StockService({ stockRepository });

    return stockService;
};

export { generateInstance };
