import { Injectable } from '@nestjs/common';
import { kucoin, Exchange, Ticker} from 'ccxt';

import { onFilterCurrencyPairs } from 'src/utils/helpers';

@Injectable()
export class KukoinService {
    private static exchange: Exchange = {} as Exchange;
    constructor() {
      const apiKey = process.env.KUKOIN_API_KEY
      const secret = process.env.KUKOIN_API_SECRET
      KukoinService.exchange = new kucoin({
        apiKey,
        secret,
        password: 'qpdury5d6seb',
        enableRateLimit: true
      });
    }
    /**
     * getTickets
     */

    public static async getOrderBook(symbol) {
      return await KukoinService.exchange.fetchOrderBook(symbol);
    }
    public static async getDepositAddress(currency) {
      return await KukoinService.exchange.fetchDepositAddresses([currency]);
    }
    public static async fetchCurrencies() {
      return await KukoinService.exchange.fetchMarkets();
    }
    public static async getFundingFees() {
      return await KukoinService.exchange.fetchTransactionFees();
    }
    public static async getTickets(): Promise<{[key: string]: Ticker}> {
        try {
            const tickers = await KukoinService.exchange.fetchTickers();
            return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
          } catch (error) {
            console.log(error)
            return {}
          }
    }
}
