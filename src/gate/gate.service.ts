import { Injectable } from '@nestjs/common';
import { gate, Exchange, Ticker} from 'ccxt';
import { onFilterCurrencyPairs } from 'src/utils/helpers';

@Injectable()
export class GateService {
    private exchange: Exchange = {} as Exchange;
    constructor() {
        this.exchange = new gate();
    }
  /**
   * getTickets
   */
  public async getTickets(): Promise<{[key: string]: Ticker}> {
    const tickers = await this.exchange.fetchTickers();
    // console.log(tickers, 'tickers gate')
    // return tickers
    return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
  }
}
