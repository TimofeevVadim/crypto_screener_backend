import { Injectable } from '@nestjs/common';
import { mexc, Exchange, Ticker} from 'ccxt';

import { onFilterCurrencyPairs } from 'src/utils/helpers';

@Injectable()
export class MexcService {
    private static exchange: Exchange = {} as Exchange;
    constructor() {
      const apiKey = process.env.MEXC_API_KEY
      const secret = process.env.MEXC_API_SECRET
      MexcService.exchange = new mexc({
        apiKey,
        secret,
        enableRateLimit: true
      });
    }
    /**
     * getTickets
     */

    public static async getOrderBook(symbol) {
      return await MexcService.exchange.fetchOrderBook(symbol);
    }
    public static async getDepositAddress(currency) {
      return await MexcService.exchange.fetchDepositAddresses([currency]);
    }
    public static async fetchCurrencies() {
      return await MexcService.exchange.fetchCurrencies();;
    }
    public static async getFundingFees() {
      return await MexcService.exchange.fetchTransactionFees();
    }
    public static async getTickets(): Promise<{[key: string]: Ticker}> {
        try {
            const tickers = await MexcService.exchange.fetchTickers();
            return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
          } catch (error) {
            console.log(error)
            return {}
          }
    }
}
