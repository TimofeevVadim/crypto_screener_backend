import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import { Observable } from 'rxjs';


@Injectable()
export class BinanceService {
  private socket$: WebSocket;
  private socketUrl: string;
  private getSocketUrl: Function = (currencyPairs) => {
    let socketUrl = 'wss://stream.binance.com:9443/ws'
    currencyPairs.forEach(currency => {
        socketUrl += `/${currency}@depth`
    });
    return socketUrl
  }

  constructor() {}
  public marketDataConnect(currencyPairs): Observable<any> {
    return new Observable(observer => {
        const url = 'wss://stream.binance.com:9443/stream?streams=' + currencyPairs.join('@ticker/')
        this.socket$ = new WebSocket(url);
  
        this.socket$.on('open', () => {
          console.log('Connected to Binance marketDataConnect');
        });
  
        this.socket$.on('message', data => {
          observer.next(JSON.parse(data));
        });
  
        this.socket$.on('error', error => {
          observer.error(error);
        });
  
        this.socket$.on('close', () => {
          observer.complete();
        });
  
        return () => {
          this.socket$.close();
        };
      });
  }


  public limitOrdersConnect(currencyPairs): Observable<any> {
    console.log(currencyPairs, 'currencyPairs')
    return new Observable(observer => {
      this.socketUrl = this.getSocketUrl(currencyPairs)
      console.log(this.socketUrl, 'this.socketUrl')
      this.socket$ = new WebSocket(this.socketUrl);

      this.socket$.on('open', () => {
        console.log('Connected to Binance limitOrdersConnect');
      });

      this.socket$.on('message', data => {
        observer.next(JSON.parse(data));
      });

      this.socket$.on('error', error => {
        observer.error(error);
      });

      this.socket$.on('close', () => {
        observer.complete();
      });

      return () => {
        this.socket$.close();
      };
    });
  }
}
