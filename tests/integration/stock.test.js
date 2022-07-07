import test from 'node:test';
import assert from 'node:assert';
import { promisify } from 'node:util';

test('Stock Simulator Test Suite', async t => {
    const testPort = 9009;

    // this is a bad practice because it mutates the environment
    process.env.PORT = testPort;
    const { server } = await import('../../src/index.js');

    const testServerAddress = `http://localhost:${testPort}/stocks`;

    await t.test('It should create a new stock object', async t => {
        const data = {
            symbol: 'PAYX',
            date: '2022-06-29T00:00:00.000Z',
            hour: 'bmo',
            year: 2022,
            quarter: 4,
            epsEstimate: 0.8107,
            epsActual: 0.81,
            revenueEstimate: 1124377100,
            revenueActual: 1144000000,
        };

        const request = await fetch(testServerAddress, {
            method: 'POST',
            body: JSON.stringify(data),
        });

        assert.deepStrictEqual(
            request.headers.get('content-type'),
            'application/json',
        );

        assert.strictEqual(request.status, 201);

        const result = await request.json();
        assert.deepStrictEqual(
            result.success,
            'Stock created successfully',
            'It should return a success message',
        );

        assert.ok(result.id.length > 30, 'id should be a valid UUID');
    });
    await promisify(server.close.bind(server))();
});
