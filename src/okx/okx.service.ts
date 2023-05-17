import { Injectable } from '@nestjs/common';
import { okx, Exchange, Ticker} from 'ccxt';

import { onFilterCurrencyPairs } from 'src/utils/helpers';

@Injectable()
export class OkxService {
    private static exchange: Exchange = {} as Exchange;
    constructor() {
      OkxService.exchange = new okx();
    }
  /**
   * getTickets
   */

  public static async getOrderBook(symbol) {
    return await OkxService.exchange.fetchOrderBook(symbol);
  }
  public static async getDepositAddress(currency) {
    return await OkxService.exchange.fetchDepositAddresses([currency]);
  }
  public static async fetchCurrencies() {
    return await OkxService.exchange.fetchCurrencies();;
  }
  public static async getFundingFees() {
    return await OkxService.exchange.fetchTransactionFees();
  }
  public static async getTickets(): Promise<{[key: string]: Ticker}> {
    try {
        const tickers = await OkxService.exchange.fetchTickers();
        return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
    } catch (error) {
        console.log(error)
      return {}
    }
  }
}
