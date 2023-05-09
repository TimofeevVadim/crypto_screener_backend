import { Injectable } from '@nestjs/common';
import { BybitController } from 'src/bybit/bybit.controller';
import { BinanceController} from 'src/binance/binance.controller';
import { GateController } from 'src/gate/gate.controller';
import { OkxController } from 'src/okx/okx.controller';
import { BitgetController}  from 'src/bitget/bitget.controller';
import { HuobiController } from 'src/huobi/huobi.controller';
import { KukoinController } from 'src/kukoin/kukoin.controller';
import { MexcController } from 'src/mexc/mexc.controller';

import { onFindPriceDifference, parseOrderBook } from 'src/utils/helpers';

@Injectable()
export class ScreenerService {
   public controllers = {
      bybit: BybitController,
      binance: BinanceController,
      okx: OkxController,
      gate: GateController,
      bitget: BitgetController,
      huobi: HuobiController,
      mexc: MexcController,
      kukoin: KukoinController
   }
   public async getCompliteInformation(ticker) {
      // const currency = ticker.pair.split('/')[0]
      // const loverAddress = await this.controllers[ticker.lover.exchange].getDepositAddress(currency);
      // const highAddress = await this.controllers[ticker.high.exchange].getDepositAddress(currency);
      // console.log(currency, 'currency')
      // console.log(loverAddress, 'loverAddress')
      // console.log(highAddress, 'highAddress')
      // if(loverAddress && highAddress) {


         const { asks } = await this.controllers[ticker.lover.exchange].getOrderBook(ticker.pair);
         const { bids } = await this.controllers[ticker.high.exchange].getOrderBook(ticker.pair);
         return parseOrderBook(asks, bids, ticker)

         
      // }
      // return null
   }
   public async getFinalyTickers(tickers) {
      const finalyTickers = []
      console.log('start')
      for (let i = 0; i < tickers.length; i++) {
         const ticker = await this.getCompliteInformation(tickers[i]);
         if(ticker) {
            finalyTickers.push(ticker)
         }
      }
      console.log('end')
      return finalyTickers
   }
   public async getTickers() {
        const binanceTickers = this.controllers.binance.getTickers()
        const bybitTickers = this.controllers.bybit.getTickers()
        const gateTickers = this.controllers.gate.getTickers()
        const okxTickers = this.controllers.okx.getTickers()
        const bitgetTickers = this.controllers.bitget.getTickers()
        const huobiTickers = this.controllers.huobi.getTickers()
        const kukoinTickers = this.controllers.kukoin.getTickers()
        const mexcTickers = this.controllers.mexc.getTickers()
        const tickers = onFindPriceDifference({ 
            binance: binanceTickers,
            bybit: bybitTickers,
            gate: gateTickers,
            okx: okxTickers,
            bitget: bitgetTickers,
            huobi: huobiTickers,
            kukoin: kukoinTickers,
            mexc: mexcTickers,
        })

        const finalyTickers = await this.getFinalyTickers(tickers)

        return finalyTickers
   }
}
