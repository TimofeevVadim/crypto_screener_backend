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
    try {
      const tickers = await this.exchange.fetchTickers();
      return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
    } catch (error) {
      console.log(error)
      return {}
    }
  }
}
