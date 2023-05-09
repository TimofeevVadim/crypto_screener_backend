import { Injectable } from '@nestjs/common';
import { kucoin, Exchange, Ticker} from 'ccxt';

import { onFilterCurrencyPairs } from 'src/utils/helpers';

@Injectable()
export class KukoinService {
    private static exchange: Exchange = {} as Exchange;
    constructor() {
      KukoinService.exchange = new kucoin();
    }
    /**
     * getTickets
     */

    public static async getOrderBook(symbol) {
      return await KukoinService.exchange.fetchOrderBook(symbol);
    }
    public static async getDepositAddress(currency) {
      return await KukoinService.exchange.fetchDepositAddress(currency);
    }
    public async getTickets(): Promise<{[key: string]: Ticker}> {
        try {
            const tickers = await KukoinService.exchange.fetchTickers();
            return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
          } catch (error) {
            console.log(error)
            return {}
          }
    }
}
