import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { HuobiService } from './huobi.service';

import { timeouts } from 'src/utils/enums';

@Controller('huobi')
export class HuobiController {
    public static tickers: object = {}

    constructor(
        private readonly huobiService: HuobiService,
    ) {}

    public static async getTickets() {
        return await HuobiService.getTickets()
    }
    public static async fetchCurrencies() {
        return await HuobiService.fetchCurrencies()
      }
    public static async getOrderBook(symbol) {
        return await HuobiService.getOrderBook(symbol)
    }
    public static async getDepositAddress(currency) {
        return await HuobiService.getDepositAddress(currency)
    }
    public static async getFundingFees() {
        return await HuobiService.getFundingFees()
      }
    async onModuleInit() {
    }
}
