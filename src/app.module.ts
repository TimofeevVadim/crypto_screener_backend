import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { BinanceModule } from './binance/binance.module';
import { WebsocketModule } from './websocket/websocket.module';


import { HttpAdapterHost } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { BybitModule } from './bybit/bybit.module';
import { ScreenerModule } from './screener/screener.module';
import { GateModule } from './gate/gate.module';
import { OkxModule } from './okx/okx.module';
import { BitgetModule } from './bitget/bitget.module';
import { HuobiModule } from './huobi/huobi.module';
import { KukoinModule } from './kukoin/kukoin.module';
import { MexcModule } from './mexc/mexc.module';
import * as cors from 'cors';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    UsersModule,
    BinanceModule,
    WebsocketModule,
    BybitModule,
    GateModule,
    OkxModule,
    BitgetModule,
    HuobiModule,
    KukoinModule,
    MexcModule,
    ScreenerModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  configure(app: NestExpressApplication) {
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    app.getHttpAdapter().use(cors());
  }
}
