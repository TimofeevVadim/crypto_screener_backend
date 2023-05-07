import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { HuobiService } from './huobi.service';

import { timeouts } from 'src/utils/enums';

@Controller('huobi')
export class HuobiController {
    public static tickers: object = {}

    constructor(
        private readonly huobiService: HuobiService,
    ) {}

    private async onStart() {
        setInterval(async () => {
        console.log('onStart Huobi')
        HuobiController.tickers = await this.huobiService.getTickets()
        }, timeouts.tickersTimeout)
    }

    public static getTickers() {
        return this.tickers
    }

    async onModuleInit() {
        this.onStart()
    }
}
