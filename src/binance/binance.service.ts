import { Injectable } from '@nestjs/common';
import { binance, Exchange, Ticker} from 'ccxt';

import { onFilterCurrencyPairs } from 'src/utils/helpers';

@Injectable()
export class BinanceService {
  private exchange: Exchange = {} as Exchange;
  constructor() {
    const apiKey = process.env.BINANCE_API_KEY
    const apiSecret = process.env.BINANCE_API_SECRET
    this.exchange = new binance({
      apiKey: apiKey,
      secret: apiSecret
    });
  }
  /**
   * getTickets
   */
  public async getTickets(): Promise<{[key: string]: Ticker}> {
    const tickers = await this.exchange.fetchTickers();
    return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
  }
}
