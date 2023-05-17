import { Injectable } from '@nestjs/common';
import { bybit, Exchange, Ticker} from 'ccxt';

import { onFilterCurrencyPairs } from 'src/utils/helpers';


@Injectable()
export class BybitService {
    private static exchange: Exchange = {} as Exchange;
    constructor() {
      const apiKey = process.env.BYBIT_API_KEY
      const secret = process.env.BYBIT_API_SECRET
      BybitService.exchange = new bybit({
        apiKey,
        secret,
        enableRateLimit: true
      });
    }
  /**
   * getTickets
   */

  public static async getOrderBook(symbol) {
    return await BybitService.exchange.fetchOrderBook(symbol);
  }
  public static async getDepositAddress(currency) {
    return await BybitService.exchange.fetchDepositAddresses([currency]);
  }
  public static async fetchCurrencies() {
    return await BybitService.exchange.fetchCurrencies();;
  }
  public static async getFundingFees() {
    return await BybitService.exchange.fetchTransactionFees();
  }
  public static async getTickets(): Promise<{[key: string]: Ticker}> {
    try {
      const tickers = await BybitService.exchange.fetchTickers();
      return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
    } catch (error) {
      console.log(error)
      return {}
    }
  }
}
