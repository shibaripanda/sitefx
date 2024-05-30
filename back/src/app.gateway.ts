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
  async handleSendMessage(client: Socket, payload: any): Promise<void> {
    console.log('payloadNewMessage', payload)
    global.testDialog.push({user: payload.user, text: payload.text})
    this.server.emit('newMessage', global.testDialog);
  }

  @SubscribeMessage('userId')
  async test(client: Socket, payload: any): Promise<void> {
    console.log('payloadUserId', payload)
    if(!global.testUsers.includes(payload.userId) && payload.userId !== undefined || null) global.testUsers.push(payload.userId)
    this.server.emit('responseUserId', global.testUsers);
  }

  afterInit() {
    // console.log(server)
    console.log('server created');
  }

  handleConnection(client: Socket) {
    // console.log('connect', 'client',  client.id);
  }

  handleDisconnect(client: Socket) {
    // console.log('dicconnect', 'client',  client.id);
  }
}
