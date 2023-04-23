import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { BinanceService } from './binance.service';

@Controller('binance')
export class BinanceController implements OnModuleInit {
  private limitOrders: object = {};
  private marketData: object = {}
  private currencyPairs: string[] = ['btcusdt', 'ethusdt', 'bnbusdt'];

  constructor(
    private readonly binanceService: BinanceService,
  ) {}

  async onModuleInit() {
    this.binanceService.marketDataConnect(this.currencyPairs).subscribe((data) => {
        this.marketData[data.data.s] = data.data
        });
    this.binanceService.limitOrdersConnect(this.currencyPairs).subscribe((data) => {
        this.limitOrders[data.s] = data
        });
  }

  @Get('/get-limit-orders')
  async getLimitOrders(): Promise<any> {
    return this.limitOrders
  }
  @Get('/get-market-data')
  async getMarketData(): Promise<any> {
    return this.marketData
  }
}
