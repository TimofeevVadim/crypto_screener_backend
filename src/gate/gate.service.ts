import { Injectable } from '@nestjs/common';
import { gate, Exchange, Ticker} from 'ccxt';
import { onFilterCurrencyPairs } from 'src/utils/helpers';

@Injectable()
export class GateService {
    private static exchange: Exchange = {} as Exchange;
    constructor() {
      GateService.exchange = new gate();
    }
  /**
   * getTickets
   */

  public static async getOrderBook(symbol) {
    return await GateService.exchange.fetchOrderBook(symbol);
  }
  public static async getDepositAddress(currency) {
    return await GateService.exchange.fetchDepositAddresses([currency]);
  }
  public static async fetchCurrencies() {
    return await GateService.exchange.fetchCurrencies();;
  }
  public static async getFundingFees() {
    return await GateService.exchange.fetchTransactionFees();
  }
  public static async getTickets(): Promise<{[key: string]: Ticker}> {
    try {
      const tickers = await GateService.exchange.fetchTickers();
      return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
    } catch (error) {
      console.log(error)
      return {}
    }
  }
}
