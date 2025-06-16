import {
  WebSocketGateway as WSGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { WebSocketEvents } from './websocket.events';

@WSGateway({ cors: { origin: '*' }, namespace: '/socket' })
export class WebSocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('WebSocketGateway');

  constructor() {}

  afterInit() {
    this.logger.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // Method to emit events to all connected clients
  emitToAll(event: WebSocketEvents, payload: any): void {
    this.server.emit(event, payload);
  }

  // Method to emit events to a specific room
  emitToRoom(room: string, event: WebSocketEvents, payload: any): void {
    this.server.to(room).emit(event, payload);
  }

  // Method to join a room
  private joinRoom(client: Socket, room: string): void {
    void client.join(room);
    this.logger.log(`Client ${client.id} joined room: ${room}`);
  }

  // Method to leave a room
  private leaveRoom(client: Socket, room: string): void {
    void client.leave(room);
    this.logger.log(`Client ${client.id} left room: ${room}`);
  }

  // Methods to delete room
  private deleteRoom(room: string): void {
    this.server.socketsLeave(room);
    this.logger.log(`Room ${room} deleted`);
  }

  // User join event
  @SubscribeMessage(WebSocketEvents.USER_JOIN_ROOM)
  async handleUserJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { room: string },
  ) {
    this.joinRoom(client, payload.room);
  }

  // User leave room
  @SubscribeMessage(WebSocketEvents.USER_LEAVE_ROOM)
  async handleUserLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { room: string },
  ) {
    this.leaveRoom(client, payload.room);
  }
}
