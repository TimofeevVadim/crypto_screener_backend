import { Injectable } from '@nestjs/common';
import { BybitController } from 'src/bybit/bybit.controller';
import { BinanceController } from 'src/binance/binance.controller';
import { GateController } from 'src/gate/gate.controller';
import { OkxController } from 'src/okx/okx.controller';
import { BitgetController } from 'src/bitget/bitget.controller';
import { HuobiController } from 'src/huobi/huobi.controller';
import { KukoinController } from 'src/kukoin/kukoin.controller';
import { MexcController } from 'src/mexc/mexc.controller';

import { onFindPriceDifference } from 'src/utils/helpers';

@Injectable()
export class ScreenerService {
   public getTickers() {
        const binanceTickers = BinanceController.getTickers()
        const bybitTickers = BybitController.getTickers()
        const gateTickers = GateController.getTickers()
      //   const okxTickers = OkxController.getTickers()
        const bitgetTickers = BitgetController.getTickers()
        const huobiTickers = HuobiController.getTickers()
        const kukoinTickers = KukoinController.getTickers()
        const mexcTickers = MexcController.getTickers()
        return onFindPriceDifference({ 
            binance: binanceTickers,
            bybit: bybitTickers,
            gate: gateTickers,
            // okx: okxTickers,
            bitget: bitgetTickers,
            huobi: huobiTickers,
            kukoin: kukoinTickers,
            mexc: mexcTickers,
      })
   }
}
