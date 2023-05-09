import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { BybitService } from './bybit.service';

import { timeouts } from 'src/utils/enums';

@Controller('bybit')
export class BybitController implements OnModuleInit {
  private static tickers: object = {}

  constructor(
    private readonly bybitService: BybitService,
  ) {}

  private async onStart() {
    setInterval(async () => {
      console.log('onStart Bybit')
      BybitController.tickers = await this.bybitService.getTickets()
    }, timeouts.tickersTimeout)
  }

  public static getTickers() {
    return this.tickers
  }
  public static async getOrderBook(symbol) {
    return await BybitService.getOrderBook(symbol)
  }
  public static async getDepositAddress(currency) {
    return await BybitService.getDepositAddress(currency)
  }
  async onModuleInit() {
    this.onStart()
  }
  @Get('/get-market-data')
  async getMarketData(): Promise<any> {
    return BybitController.tickers
  }
}
