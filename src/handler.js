import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node:url';
import { routes } from './routes/stockRoute.js';
import { DEFAULT_HEADER } from './util/util.js';

import { generateInstance } from './factories/stockFactory.js';

const currentDir = dirname(fileURLToPath(import.meta.url));

const filepath = join(currentDir, './../database', '/data.json');

const stockService = generateInstance({ filepath });
const stockRoutes = routes({ stockService });

const allRoutes = {
    ...stockRoutes,
    // 404 routes
    default: (request, response) => {
        response.writeHead(404, DEFAULT_HEADER);
        response.write('(╯°□°)╯︵ ┻━┻ punoɟ ʇou ㄣ0ㄣ');
        response.end();
    },
};
function handler(request, response) {
    const { url, method } = request;
    const { pathname } = parse(url, true);

    const key = `${pathname}:${method.toLowerCase()}`;
    const chosen = allRoutes[key] || allRoutes.default;

    return Promise.resolve(chosen(request, response)).catch(
        handlerError(response),
    );
}

function handlerError(response) {
    return error => {
        console.log('Something has gone terribly wrong', error.stack);
        response.writeHead(500, DEFAULT_HEADER);
        response.write(JSON.stringify({ error: 'internet server error' }));

        return response.end();
    };
}
export default handler;
