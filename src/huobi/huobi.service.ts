import { Injectable } from '@nestjs/common';
import { huobi, Exchange, Ticker} from 'ccxt';

import { onFilterCurrencyPairs } from 'src/utils/helpers';

@Injectable()
export class HuobiService {
    private static exchange: Exchange = {} as Exchange;
    constructor() {
      HuobiService.exchange = new huobi();
    }
    /**
     * getTickets
     */

    public static async getOrderBook(symbol) {
      return await HuobiService.exchange.fetchOrderBook(symbol);
    }
    public static async getDepositAddress(currency) {
      return await HuobiService.exchange.fetchDepositAddress(currency);
    }
    public static async getFundingFees() {
      return await HuobiService.exchange.fetchTransactionFees();
    }
    public async getTickets(): Promise<{[key: string]: Ticker}> {
      try {
        const tickers = await HuobiService.exchange.fetchTickers();
        return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
      } catch (error) {
        console.log(error)
        return {}
      }
    }
}
