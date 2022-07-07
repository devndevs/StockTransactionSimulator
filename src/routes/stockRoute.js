import { once } from 'node:events';
import Stock from '../entities/stock.js';
import { DEFAULT_HEADER } from '../util/util.js';

const routes = ({ stockService }) => ({
    '/stocks:get': async (request, response) => {
        const stocks = await stockService.find();
        response.write(JSON.stringify({ results: stocks }));
        return response.end();
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
        console.log(id);
        return response.end();
    },
    // '/stocks:put': async (request, response) => {
    //     const data = await once(request, 'data');
    //     const item = JSON.parse(data);
    //     const stock = new Stock(item);

    //     const id = await stockService.update(stock);

    //     response.writeHead(201, DEFAULT_HEADER);
    //     response.write(
    //         JSON.stringify({ id, success: 'Stock updated successfully' }),
    //     );

    //     return response.end();
    // },
    //     '/stocks:delete': async (request, response) => {
    //         const stock = await stockService.find(id);
    //         const id = await stockService.delete(stock);

    //         response.writeHead(200, DEFAULT_HEADER);
    //         response.write(
    //             JSON.stringify({ id, success: 'Stock deleted successfully' }),
    //         );

    //         return response.end();
    //     },
});

export { routes };
