import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { MexcService } from './mexc.service';

import { timeouts } from 'src/utils/enums';

@Controller('mexc')
export class MexcController {
    private static tickers: object = {}

    constructor(
        private readonly mexcService: MexcService,
    ) {}
    
    public static async getTickets() {
        return await MexcService.getTickets()
    }
    public static async getOrderBook(symbol) {
        return await MexcService.getOrderBook(symbol)
    }
    public static async fetchCurrencies() {
        return await MexcService.fetchCurrencies()
      }
    public static async getDepositAddress(currency) {
        return await MexcService.getDepositAddress(currency)
    }
    public static async getFundingFees() {
        return await MexcService.getFundingFees()
    }
    public static getTickers() {
        return this.tickers
    }

    async onModuleInit() {
    }
}
