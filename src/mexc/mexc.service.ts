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
        try {
            const tickers = await this.exchange.fetchTickers();
            return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
          } catch (error) {
            console.log(error)
            return {}
          }
    }
}
