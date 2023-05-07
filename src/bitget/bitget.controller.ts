import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { BitgetService } from './bitget.service';

import { timeouts } from 'src/utils/enums';

@Controller('bitget')
export class BitgetController {
    public static tickers: object = {}

  constructor(
    private readonly bitgetService: BitgetService,
  ) {}

  private async onStart() {
    setInterval(async () => {
      console.log('onStart Bitget')
      BitgetController.tickers = await this.bitgetService.getTickets()
    }, timeouts.tickersTimeout)
  }

  public static getTickers() {
    return this.tickers
  }

  async onModuleInit() {
    this.onStart()
  }
}
