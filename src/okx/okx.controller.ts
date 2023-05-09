import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { OkxService } from './okx.service';

import { timeouts } from 'src/utils/enums';

@Controller('okx')
export class OkxController {
    private static tickers: object = {}

  constructor(
    private readonly okxService: OkxService,
  ) {}

  private async onStart() {
    setInterval(async () => {
      console.log('onStart okx')
      OkxController.tickers = await this.okxService.getTickets()
    }, timeouts.tickersTimeout)
  }
  public static async getOrderBook(symbol) {
    return await OkxService.getOrderBook(symbol)
  }
  public static async getDepositAddress(currency) {
    return await OkxService.getDepositAddress(currency)
  }
  public static getTickers() {
    return this.tickers
  }

  async onModuleInit() {
    this.onStart()
  }
}
