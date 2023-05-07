import { Injectable } from '@nestjs/common';
import { huobi, Exchange, Ticker} from 'ccxt';

import { onFilterCurrencyPairs } from 'src/utils/helpers';

@Injectable()
export class HuobiService {
    private exchange: Exchange = {} as Exchange;
    constructor() {
      this.exchange = new huobi();
    }
    /**
     * getTickets
     */
    public async getTickets(): Promise<{[key: string]: Ticker}> {
      const tickers = await this.exchange.fetchTickers();
      return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
    }
}
