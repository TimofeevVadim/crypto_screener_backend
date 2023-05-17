import { Injectable } from '@nestjs/common';
import { bitget, Exchange, Ticker} from 'ccxt';

import { onFilterCurrencyPairs } from 'src/utils/helpers';


@Injectable()
export class BitgetService {
    private static exchange: Exchange = {} as Exchange;
    constructor() {
      const apiKey = process.env.BITGET_API_KEY
      const secret = process.env.BITGET_API_SECRET
      BitgetService.exchange = new bitget({apiKey, secret, enableRateLimit: true});
    }
    /**
     * getTickets
     */
    public static async getOrderBook(symbol) {
      return await BitgetService.exchange.fetchOrderBook(symbol);
    }
    public static async fetchCurrencies() {
      return await BitgetService.exchange.fetchCurrencies();;
    }
    public static async getDepositAddress(currency) {
      return await BitgetService.exchange.fetchDepositAddresses([currency]);
    }
    public static async getFundingFees() {
      return await BitgetService.exchange.fetchTransactionFees();
    }
    public static async getTickets(): Promise<{[key: string]: Ticker}> {
      try {
        const tickers = await BitgetService.exchange.fetchTickers();
        return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
      } catch (error) {
        console.log(error)
        return {}
      }
    }
}
