import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { GateService } from './gate.service';

import { timeouts } from 'src/utils/enums';

@Controller('gate')
export class GateController {
    private static tickers: object = {}

  constructor(
    private readonly gateService: GateService,
  ) {}
  
  public static async getTickets() {
    return await GateService.getTickets()
  }
  public static async fetchCurrencies() {
    return await GateService.fetchCurrencies()
  }
  public static async getOrderBook(symbol) {
    return await GateService.getOrderBook(symbol)
  }
  public static async getDepositAddress(currency) {
    return await GateService.getDepositAddress(currency)
  }
  public static async getFundingFees() {
    return await GateService.getFundingFees()
  }
  public static getTickers() {
    return this.tickers
  }

  async onModuleInit() {
  }
}
