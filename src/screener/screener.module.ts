import { Module } from '@nestjs/common';
import { ScreenerController } from './screener.controller';
import { ScreenerService } from './screener.service';

@Module({
  controllers: [ScreenerController],
  providers: [ScreenerService]
})
export class ScreenerModule {}
