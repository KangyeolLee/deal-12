import { Server } from 'socket.io';
import { ChatService } from './services/ChatService';

export const initSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.on('client', (fromId, toId, message, chatroomId, post) => {
      ChatService.createChat({
        room_id: chatroomId,
        text: message,
        user_id: fromId,
        other_id: toId,
      });
      io.emit(`server-${chatroomId}`, fromId, message);
      io.emit(`user-${toId}`, fromId, chatroomId, message, post);
    });
  });
};
