const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let activeUsers = 0;

io.on('connection', (socket) => {
  activeUsers++;
  io.emit('visitorCount', activeUsers); // Kirim jumlah pengunjung ke semua klien

  socket.on('disconnect', () => {
    activeUsers--;
    io.emit('visitorCount', activeUsers); // Update saat pengguna keluar
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});