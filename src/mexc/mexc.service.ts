import { Injectable } from '@nestjs/common';
import { mexc, Exchange, Ticker} from 'ccxt';

import { onFilterCurrencyPairs } from 'src/utils/helpers';

@Injectable()
export class MexcService {
    private static exchange: Exchange = {} as Exchange;
    constructor() {
      MexcService.exchange = new mexc();
    }
    /**
     * getTickets
     */

    public static async getOrderBook(symbol) {
      return await MexcService.exchange.fetchOrderBook(symbol);
    }
    public static async getDepositAddress(currency) {
      return await MexcService.exchange.fetchDepositAddress(currency);
    }
    public async getTickets(): Promise<{[key: string]: Ticker}> {
        try {
            const tickers = await MexcService.exchange.fetchTickers();
            return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
          } catch (error) {
            console.log(error)
            return {}
          }
    }
}
