import { Injectable } from '@nestjs/common';
import { bitget, Exchange, Ticker} from 'ccxt';

import { onFilterCurrencyPairs } from 'src/utils/helpers';


@Injectable()
export class BitgetService {
    private exchange: Exchange = {} as Exchange;
    constructor() {
    
      this.exchange = new bitget();
    }
    /**
     * getTickets
     */
    public async getTickets(): Promise<{[key: string]: Ticker}> {
      const tickers = await this.exchange.fetchTickers();
      return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
    }
}
