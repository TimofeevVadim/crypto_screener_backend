import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class BinanceGateway {
  @WebSocketServer() server: Server;

  emitLimitOrders(data: any) {
    // console.log(this.server, 'this.server')
    if (this.server) {
      this.server.emit('limit-orders', 'hey');
    }
  }
}