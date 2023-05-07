import { Injectable } from '@nestjs/common';
import { okx, Exchange, Ticker} from 'ccxt';

import { onFilterCurrencyPairs } from 'src/utils/helpers';

@Injectable()
export class OkxService {
    private exchange: Exchange = {} as Exchange;
    constructor() {
        this.exchange = new okx();
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
