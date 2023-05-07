import { Injectable } from '@nestjs/common';
import { mexc, Exchange, Ticker} from 'ccxt';

import { onFilterCurrencyPairs } from 'src/utils/helpers';

@Injectable()
export class MexcService {
    private exchange: Exchange = {} as Exchange;
    constructor() {
        this.exchange = new mexc();
    }
    /**
     * getTickets
     */
    public async getTickets(): Promise<{[key: string]: Ticker}> {
        const tickers = await this.exchange.fetchTickers();
        // return tickers
        return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
    }
}
