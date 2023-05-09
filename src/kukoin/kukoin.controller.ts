import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { KukoinService } from './kukoin.service';

import { timeouts } from 'src/utils/enums';

@Controller('kukoin')
export class KukoinController {
    private static tickers: object = {}

    constructor(
        private readonly kukoinService: KukoinService,
    ) {}

    private async onStart() {
        setInterval(async () => {
            console.log('onStart Kukoin')
            KukoinController.tickers = await this.kukoinService.getTickets()
        }, timeouts.tickersTimeout)
    }
    public static async getOrderBook(symbol) {
        return await KukoinService.getOrderBook(symbol)
    }
    public static async getDepositAddress(currency) {
        return await KukoinService.getDepositAddress(currency)
      }
    public static getTickers() {
        return this.tickers
    }

    async onModuleInit() {
        this.onStart()
    }
}
