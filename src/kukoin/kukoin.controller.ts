import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { KukoinService } from './kukoin.service';

import { timeouts } from 'src/utils/enums';

@Controller('kukoin')
export class KukoinController {
    private static tickers: object = {}

    constructor(
        private readonly kukoinService: KukoinService,
    ) {}
    
    public static async getTickets() {
        return await KukoinService.getTickets()
    }
    public static async getOrderBook(symbol) {
        return await KukoinService.getOrderBook(symbol)
    }
    public static async fetchCurrencies() {
        return await KukoinService.fetchCurrencies()
      }
    public static async getDepositAddress(currency) {
        return await KukoinService.getDepositAddress(currency)
    }
    public static async getFundingFees() {
        return await KukoinService.getFundingFees()
    }
    public static getTickers() {
        return this.tickers
    }

    async onModuleInit() {
        // this.onStart()
    }
}
