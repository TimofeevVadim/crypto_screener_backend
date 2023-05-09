import { Injectable } from '@nestjs/common';
import { bybit, Exchange, Ticker} from 'ccxt';

import { onFilterCurrencyPairs } from 'src/utils/helpers';


@Injectable()
export class BybitService {
    private static exchange: Exchange = {} as Exchange;
    constructor() {
      BybitService.exchange = new bybit();
    }
  /**
   * getTickets
   */

  public static async getOrderBook(symbol) {
    return await BybitService.exchange.fetchOrderBook(symbol);
  }
  public static async getDepositAddress(currency) {
    return await BybitService.exchange.fetchDepositAddress(currency);
  }
  public async getTickets(): Promise<{[key: string]: Ticker}> {
    try {
      const tickers = await BybitService.exchange.fetchTickers();
      return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
    } catch (error) {
      console.log(error)
      return {}
    }
  }
}
