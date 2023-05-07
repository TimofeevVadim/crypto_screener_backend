import { Injectable } from '@nestjs/common';
import { kucoin, Exchange, Ticker} from 'ccxt';

import { onFilterCurrencyPairs } from 'src/utils/helpers';

@Injectable()
export class KukoinService {
    private exchange: Exchange = {} as Exchange;
    constructor() {
        this.exchange = new kucoin();
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
