import test from 'node:test';
import assert from 'node:assert';

const callTracker = new assert.CallTracker();
process.on('exit', () => callTracker.verify());

import { routes } from '../../../src/routes/stockRoute.js';
import { DEFAULT_HEADER } from '../../../src/util/util.js';

test('Stock Routes - endpoints test suite', async t => {
    await t.test('it should call /stocks:get route', async t => {
        const databaseMock = [
            {
                id: '191f6e3e-68af-4bce-a24e-714e35cf01fe',
                symbol: 'PAYX',
                date: '2022-06-29T00:00:00.000Z',
                hour: 'bmo',
                year: 2022,
                quarter: 4,
                epsEstimate: 0.8107,
                epsActual: 0.81,
                revenueEstimate: 1124377100,
                revenueActual: 1144000000,
            },
        ];

        const stockServiceStub = {
            find: async () => databaseMock,
        };

        const endpoints = routes({ stockService: stockServiceStub });

        const endpoint = '/stocks:get';
        const request = {};
        const response = {
            write: callTracker.calls(item => {
                const expected = JSON.stringify({ results: databaseMock });
                assert.strictEqual(
                    item,
                    expected,
                    'write should be called with the correct payload',
                );
            }),
            end: callTracker.calls(item => {
                assert.strictEqual(
                    item,
                    undefined,
                    'end should be called without params',
                );
            }),
        };
        const route = endpoints[endpoint];
        await route(request, response);
    });

    await t.test('it should call /stocks:post route', async t => {
        const databaseMock = [];

        const mockData = {
            body: JSON.stringify({
                symbol: 'PAYX',
                date: '2022-06-29T00:00:00.000Z',
                hour: 'bmo',
                year: 2022,
                quarter: 4,
                epsEstimate: 0.8107,
                epsActual: 0.81,
                revenueEstimate: 1124377100,
                revenueActual: 1144000000,
            }),
        };

        const stockServiceStub = {
            create: async () => {
                mockData;
            },
        };

        const endpoints = routes({ stockService: stockServiceStub });
        const endpoint = '/stocks:post';
        const request = {
            data: await once(request, 'data'),
            item: JSON.parse(data),
            stock: new Stock(item),
        };
        const response = {};
        const route = endpoints[endpoint];
        await route(request, response);
    });
});
