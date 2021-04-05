const express = require("express");
const http = require("http");
const app = express();
const port = process.env.PORT || 5050;
const servidor = http.createServer(app);
const { IP_SERVER } = require("./config");
//Inicializamos socketio
const socketio = require("socket.io");
const io = socketio(servidor);


io.on("connection", (socket) => {
    console.log(socket.id);
    let nombre;
  
  socket.on("conectado", (nomb) => {
    nombre = nomb;
    
    //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
    socket.broadcast.emit("mensajes", {
      nombre: nombre,
      mensaje: `${nombre} ha entrado en la sala del chat`,
    });
  });

  socket.on("mensaje", (nombre, mensaje) => {
    //io.emit manda el mensaje a todos los clientes conectados al chat
    io.emit("mensajes", { nombre, mensaje });
  });

  socket.on("disconnect", () => {
    io.emit("mensajes", {
      servidor: "Servidor",
      mensaje: `${nombre} ha abandonado la sala`,
    });
  });







});

servidor.listen(process.env.PORT, '0.0.0.0', () => {
    console.log("######################");
    console.log("###### API REST ######");
    console.log("######################");
    console.log(`http://${IP_SERVER}:${port}`);
});