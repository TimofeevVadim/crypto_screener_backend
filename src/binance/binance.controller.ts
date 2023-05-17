import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { BinanceService } from './binance.service';

import { timeouts } from 'src/utils/enums';

@Controller('binance')
export class BinanceController implements OnModuleInit {
  public static tickers: object = {}

  constructor(
    private readonly binanceService: BinanceService,
  ) {}
  onModuleInit() {
  }

  private async onStart() {
  }
  public static async getTickets() {
    return await BinanceService.getTickets()
  }
  public static async fetchCurrencies() {
    return await BinanceService.fetchCurrencies()
  }
  public static async getOrderBook(symbol) {
    return await BinanceService.getOrderBook(symbol)
  }
  public static async getDepositAddress(currency) {
    return await BinanceService.getDepositAddress(currency)
  }
  public static async getFundingFees() {
    return await BinanceService.getFundingFees()
  }
}
