import { Injectable } from '@nestjs/common';
import { binance, Exchange, Ticker} from 'ccxt';

import { onFilterCurrencyPairs } from 'src/utils/helpers';

@Injectable()
export class BinanceService {
  private static exchange: Exchange = {} as Exchange;
  constructor() {
    const apiKey = process.env.BINANCE_API_KEY
    const secret = process.env.BINANCE_API_SECRET
    BinanceService.exchange = new binance({
      apiKey: apiKey,
      secret: secret,
      enableRateLimit: true
    });
  }
  /**
   * getTickets
   */
  public static async getOrderBook(symbol) {
    return await BinanceService.exchange.fetchOrderBook(symbol);
  }
  public static async getDepositAddress(currency) {
    return await BinanceService.exchange.fetchDepositAddresses([currency]);;
  }
  public static async fetchCurrencies() {
    return await BinanceService.exchange.fetchCurrencies();;
  }
  public static async getFundingFees() {
    return await BinanceService.exchange.fetchTransactionFees();
  }
  public static async getTickets(): Promise<{[key: string]: Ticker}> {
    try {
      const tickers = await BinanceService.exchange.fetchTickers();
      return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
    } catch (error) {
      console.log(error)
      return {}
    }
  }
}
