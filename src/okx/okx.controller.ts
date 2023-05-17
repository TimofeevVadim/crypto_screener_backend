import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { OkxService } from './okx.service';

import { timeouts } from 'src/utils/enums';

@Controller('okx')
export class OkxController {
    private static tickers: object = {}

  constructor(
    private readonly okxService: OkxService,
  ) {}

  public static async getTickets() {
    return await OkxService.getTickets()
  }
  public static async fetchCurrencies() {
    return await OkxService.fetchCurrencies()
  }
  public static async getOrderBook(symbol) {
    return await OkxService.getOrderBook(symbol)
  }
  public static async getDepositAddress(currency) {
    return await OkxService.getDepositAddress(currency)
  }
  public static async getFundingFees() {
    return await OkxService.getFundingFees()
  }
  public static getTickers() {
    return this.tickers
  }

  async onModuleInit() {
  }
}
