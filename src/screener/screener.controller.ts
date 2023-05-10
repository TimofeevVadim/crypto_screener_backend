import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ScreenerService } from './screener.service';

import { timeouts } from 'src/utils/enums';

@Controller('screener')
export class ScreenerController {
    private tickers: any[] = []
    constructor (
        private readonly screenerService: ScreenerService
    ) {}
    private onStart() {
        const start = async () => {
            console.log('onStart Screener')
            this.tickers = await this.screenerService.getTickers()
            setTimeout(start, timeouts.screenerTimeout)
          }
        start()
    }
    async onModuleInit() {
        this.onStart()
    }
    @Get('/get-tickers')
    async getTickers(): Promise<any> {
      return this.tickers
    }
}
