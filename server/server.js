import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

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

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
