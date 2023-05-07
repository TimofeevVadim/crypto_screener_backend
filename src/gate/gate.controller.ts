import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { GateService } from './gate.service';

import { timeouts } from 'src/utils/enums';

@Controller('gate')
export class GateController {
    private static tickers: object = {}

  constructor(
    private readonly gateService: GateService,
  ) {}

  private async onStart() {
    setInterval(async () => {
      console.log('onStart Gate')
      GateController.tickers = await this.gateService.getTickets()
    }, timeouts.tickersTimeout)
  }

  public static getTickers() {
    return this.tickers
  }

  async onModuleInit() {
    this.onStart()
  }
}
