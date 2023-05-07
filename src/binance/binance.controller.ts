import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { BinanceService } from './binance.service';

import { timeouts } from 'src/utils/enums';

@Controller('binance')
export class BinanceController implements OnModuleInit {
  public static tickers: object = {}

  constructor(
    private readonly binanceService: BinanceService,
  ) {}

  private async onStart() {
    setInterval(async () => {
      console.log('onStart Binance')
      BinanceController.tickers = await this.binanceService.getTickets()
    }, timeouts.tickersTimeout)
  }

  public static getTickers() {
    return this.tickers
  }

  async onModuleInit() {
    this.onStart()
  }
  // @Get('/get-market-data')
  // async getMarketData(): Promise<any> {
  //   return this.tickers
  // }
}
