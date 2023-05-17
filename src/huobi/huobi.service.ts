import { Injectable } from '@nestjs/common';
import { huobi, Exchange, Ticker} from 'ccxt';

import { onFilterCurrencyPairs } from 'src/utils/helpers';

@Injectable()
export class HuobiService {
    private static exchange: Exchange = {} as Exchange;
    constructor() {
      const apiKey = process.env.HUOBI_API_KEY
      const secret = process.env.HUOBI_API_SECRET
      HuobiService.exchange = new huobi({
        apiKey,
        secret,
        enableRateLimit: true
      });
    }
    /**
     * getTickets
     */

    public static async getOrderBook(symbol) {
      return await HuobiService.exchange.fetchOrderBook(symbol);
    }
    public static async getDepositAddress(currency) {
      return await HuobiService.exchange.fetchDepositAddresses([currency]);
    }
    public static async fetchCurrencies() {
      return await HuobiService.exchange.fetchCurrencies();;
    }
    public static async getFundingFees() {
      return await HuobiService.exchange.fetchTransactionFees();
    }
    public static async getTickets(): Promise<{[key: string]: Ticker}> {
      try {
        const tickers = await HuobiService.exchange.fetchTickers();
        return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
      } catch (error) {
        console.log(error)
        return {}
      }
    }
}
