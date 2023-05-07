import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { MexcService } from './mexc.service';

import { timeouts } from 'src/utils/enums';

@Controller('mexc')
export class MexcController {
    private static tickers: object = {}

    constructor(
        private readonly mexcService: MexcService,
    ) {}

    private async onStart() {
        setInterval(async () => {
        console.log('onStart Mexc')
        MexcController.tickers = await this.mexcService.getTickets()
        }, timeouts.tickersTimeout)
    }

    public static getTickers() {
        return this.tickers
    }

    async onModuleInit() {
        this.onStart()
    }
}
