/* eslint-disable prettier/prettier */
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppService } from 'src/app.service';
// import { CreateMessDto } from 'src/dto/create-mess.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private appService: AppService) {}

  @WebSocketServer() server: Server;
  @SubscribeMessage('newMessage')
  async handleSendMessage(
    client: Socket,
    // payload: CreateMessDto,
  ): Promise<void> {
    // await this.appService.createMessage(payload);
    // const all = (await this.appService.getMessage())
    //   .reverse()
    //   .map((item) => item.text);
    // this.server.emit('res', all);
    this.server.emit('res', 'newMessage');
  }

  @SubscribeMessage('userId')
  async test(
    client: Socket,
    // payload: CreateMessDto,
  ): Promise<void> {
    // await this.appService.createMessage(payload);
    // const all = (await this.appService.getMessage())
    //   .reverse()
    //   .map((item) => item.text);
    // this.server.emit('res', all);
    this.server.emit('res', 'userId');
  }

  afterInit(server: any) {
    console.log('server');
  }

  handleConnection(client: Socket) {
    console.log('connect', 'client',  client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('dicconnect', 'client',  client.id);
  }
}
