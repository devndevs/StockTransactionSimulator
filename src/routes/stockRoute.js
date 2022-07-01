import { once } from 'node:events';
import Stock from '../entities/stock.js';
import { DEFAULT_HEADER } from '../util/util.js';

const routes = ({ stockService }) => ({
    '/stocks:get': async (request, response) => {
        response.write('GET');
        response.end();
    },
    '/stocks:post': async (request, response) => {
        const data = await once(request, 'data');
        const item = JSON.parse(data);
        const stock = new Stock(item);

        const id = await stockService.create(stock);

        response.writeHead(201, DEFAULT_HEADER);
        response.write(
            JSON.stringify({ id, success: 'Stock created successfully' }),
        );

        return response.end();
    },
});

export { routes };
