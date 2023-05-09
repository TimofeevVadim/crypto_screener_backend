import { Injectable } from '@nestjs/common';
import { bitget, Exchange, Ticker} from 'ccxt';

import { onFilterCurrencyPairs } from 'src/utils/helpers';


@Injectable()
export class BitgetService {
    private static exchange: Exchange = {} as Exchange;
    constructor() {
    
      BitgetService.exchange = new bitget();
    }
    /**
     * getTickets
     */
    public static async getOrderBook(symbol) {
      return await BitgetService.exchange.fetchOrderBook(symbol);
    }
    public static async getDepositAddress(currency) {
      return await BitgetService.exchange.fetchDepositAddress(currency);
    }
    public async getTickets(): Promise<{[key: string]: Ticker}> {
      try {
        const tickers = await BitgetService.exchange.fetchTickers();
        return onFilterCurrencyPairs({ tickers: Object.values(tickers) });
      } catch (error) {
        console.log(error)
        return {}
      }
    }
}
