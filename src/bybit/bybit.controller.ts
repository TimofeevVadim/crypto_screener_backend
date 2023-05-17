import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { BybitService } from './bybit.service';


@Controller('bybit')
export class BybitController implements OnModuleInit {
  private static tickers: object = {}

  constructor(
    private readonly bybitService: BybitService,
  ) {}

  public static async getTickets() {
    return await BybitService.getTickets()
  }
  public static async fetchCurrencies() {
    return await BybitService.fetchCurrencies()
  }
  public static async getOrderBook(symbol) {
    return await BybitService.getOrderBook(symbol)
  }
  public static async getDepositAddress(currency) {
    return await BybitService.getDepositAddress(currency)
  }
  public static async getFundingFees() {
    return await BybitService.getFundingFees()
  }
  async onModuleInit() {
    // this.onStart()
  }
  @Get('/get-market-data')
  async getMarketData(): Promise<any> {
    return BybitController.tickers
  }
}
