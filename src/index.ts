import cors from "cors";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

import http from "node:http";
import { Server } from "socket.io";

import { UsersType } from "./types/UsersType";
import { RoomsType } from "./types/RoomsType";
import { UserType } from "./types/UserType";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT;

const rooms: RoomsType = {
  "1234": {
    pin: "1234",
    users: {},
  },

  "2222": {
    pin: "2222",
    users: {},
  },

  "0000": {
    pin: "0000",
    users: {},
  },
};

// Hashmap onde cada chave é a conexão e cada valor contem a sala de qual aquela conexão fazia parte
let connections: {
  [key: string]: {
    nickname: string;
    room: string;
  };
} = {};

io.on("connection", (socket) => {
  const query = socket.handshake.query;

  socket.on("login", (data) => {
    const { pin, user }: { pin: string; user: UserType } = data;
    const room = rooms[pin];

    if (room) {
      room.users[user.nickname] = { ...user, connection: socket.id };
      socket.join(room.pin);

      // Guardando o usuário e o nickname dele num hashmap de conexões
      connections[socket.id] = { room: pin, nickname: user.nickname };
    } else {
      console.log("Sala não existe!");
    }

    // Implementar login antes com JWT via rest
  });

  socket.on("get-users-room", (data) => {
    const room = rooms[data.pin];
    if (!room) {
      console.log("Sala não encontrada:", data.pin);
      return;
    }

    io.to(data.pin).emit("send-users-room", {
      users: room.users,
    });
  });

  socket.on("disconnect", (reason) => {
    // sala de qual essa conexão fazia parte
    const pin = connections[socket.id].room;
    const room = rooms[pin];
    const connection = connections[socket.id];

    // removendo o user da sala
    delete room.users[connection.nickname];

    io.to(pin).emit("disconnection", {
      users: rooms[pin].users,
    });
  });
  // socket.join(deviceType!);
});

server.listen(process.env.PORT, () => {
  console.log(`Server runing in http://localhost:${PORT} 🔥`);
});
