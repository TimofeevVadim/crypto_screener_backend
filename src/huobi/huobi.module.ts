import { Module } from '@nestjs/common';
import { HuobiController } from './huobi.controller';
import { HuobiService } from './huobi.service';

@Module({
  controllers: [HuobiController],
  providers: [HuobiService]
})
export class HuobiModule {}
