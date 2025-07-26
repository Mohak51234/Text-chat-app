import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on('connection',socket=>{
    console.log('A user connected');
    const id=socket.handshake.query.id
    socket.join(id);

    socket.on('send-message',({recipients,text})=>{
        recipients.forEach(recipient=>{
            const newRecipients=recipients.filter(r=>r!==recipient);
            newRecipients.push(id);
            socket.broadcast.to(recipient).emit('recieve-message',{
                recipients:newRecipients,sender:id,text
            })
        })
    })
})

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});