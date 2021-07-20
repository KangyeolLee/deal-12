import { Server } from 'socket.io';

export const initSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ['http://localhost:8080'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('client', (id, message) => {
      console.log(id, message);
      io.emit('server', id, message);
    });
  });
};
