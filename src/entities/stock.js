import { randomUUID } from 'node:crypto';
export default class Stock {
    constructor({
        symbol,
        date,
        hour,
        year,
        quarter,
        epsEstimate,
        epsActual,
        revenueEstimate,
        revenueActual,
    }) {
        this.id = randomUUID();
        this.symbol = symbol;
        this.date = date;
        this.hour = hour;
        this.year = year;
        this.quarter = quarter;
        this.epsEstimate = epsEstimate;
        this.epsActual = epsActual;
        this.revenueEstimate = revenueEstimate;
        this.revenueActual = revenueActual;
    }
}
