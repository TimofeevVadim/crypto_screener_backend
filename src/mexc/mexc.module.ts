import { Module } from '@nestjs/common';
import { MexcController } from './mexc.controller';
import { MexcService } from './mexc.service';

@Module({
  controllers: [MexcController],
  providers: [MexcService]
})
export class MexcModule {}
