import { Module } from '@nestjs/common';
import { BinanceController } from './binance.controller';
import { BinanceService } from './binance.service';
import { BinanceGateway } from './binance.gateway';


@Module({
  controllers: [BinanceController],
  providers: [BinanceService, BinanceGateway]
})
export class BinanceModule {}
