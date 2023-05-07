import { Module } from '@nestjs/common';
import { KukoinController } from './kukoin.controller';
import { KukoinService } from './kukoin.service';

@Module({
  controllers: [KukoinController],
  providers: [KukoinService]
})
export class KukoinModule {}
