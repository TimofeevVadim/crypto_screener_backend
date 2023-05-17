import { Injectable } from '@nestjs/common';
import { BybitController } from 'src/bybit/bybit.controller';
import { BinanceController} from 'src/binance/binance.controller';
import { GateController } from 'src/gate/gate.controller';
import { OkxController } from 'src/okx/okx.controller';
import { BitgetController}  from 'src/bitget/bitget.controller';
import { HuobiController } from 'src/huobi/huobi.controller';
import { KukoinController } from 'src/kukoin/kukoin.controller';
import { MexcController } from 'src/mexc/mexc.controller';

import { onFindPriceDifference, parseOrderBook, addInformationPossibilityTranslation } from 'src/utils/helpers';

@Injectable()
export class ScreenerService {
   public controllers = {
      bybit: BybitController,
      binance: BinanceController,
      // okx: OkxController,
      // gate: GateController,
      bitget: BitgetController,
      huobi: HuobiController,
      mexc: MexcController,
      // kukoin: KukoinController
   }
   public async getCompliteInformation(ticker) {
      const currency = ticker.pair.split('/')[0]

         try {
            const { asks } = await this.controllers[ticker.lover.exchange].getOrderBook(ticker.pair);
            const { bids } = await this.controllers[ticker.high.exchange].getOrderBook(ticker.pair);


            return parseOrderBook({ asks, bids, ticker })
         } catch (error) {
            console.log(error)
            return null
         }

   }
   public async getFinalyTickers(tickers, currencys) {
      const finalyTickers = []
      for (let i = 0; i < tickers.length; i++) {
         const ticker = await this.getCompliteInformation(tickers[i]);
         if(ticker) {
            finalyTickers.push(addInformationPossibilityTranslation(ticker, currencys))
         }
      }
      return finalyTickers
   }
   public async getCurrencies() {
      const data = {}
      const exchanges = Object.keys(this.controllers)
      for (let i = 0; i < exchanges.length; i++) {
         const currencys = await this.controllers[exchanges[i]].fetchCurrencies();
         data[exchanges[i]] = currencys
      }
      return data
   }
   public async fetchTickers() {
      const data = {}
      const exchanges = Object.keys(this.controllers)
      for (let i = 0; i < exchanges.length; i++) {
         const tickers = await this.controllers[exchanges[i]].getTickets();
         data[exchanges[i]] = tickers
      }
      return data
   }
   public async getTickers() {
      console.log('start')
      const currencys = await this.getCurrencies()
      const currentTickers = await this.fetchTickers()
      const tickers = onFindPriceDifference(currentTickers)

        const finalyTickers = await this.getFinalyTickers(tickers, currencys)
      console.log('end')
      return finalyTickers.filter( ticker => ticker.hasChain )
   }
}
