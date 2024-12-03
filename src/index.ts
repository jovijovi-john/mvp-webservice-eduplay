import cors from "cors";
import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

import http from "node:http";
import { Server } from "socket.io";

import { RoomsType } from "./types/RoomsType";
import { UserType } from "./types/UserType";
import { UsersType } from "./types/UsersType";
import { QuestionType } from "./types/QuestionType";

import {
  ElementaryLevelQuestionnaire,
  HighSchoolLevelQuestionnaire,
  Questionnaires,
} from "./db/questions";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT;

const rooms: RoomsType = {};

// Hashmap onde cada chave é a conexão e cada valor contem a sala de qual aquela conexão fazia parte
let connections: {
  [key: string]: {
    nickname: string;
    room: string;
  };
} = {};

// Rotas

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

io.on("connection", (socket) => {
  // socket.on("create-room", (data) => {
  //   const { pin } = data;

  //   if (!rooms[pin]) {
  //     connections[socket.id] = {
  //       nickname: "admin",
  //       room: pin,
  //     };

  //     rooms[pin] = {
  //       pin: pin,
  //       users: {},
  //       questionnaire: [
  //         {
  //           elementarySchool: {
  //             answer1: 1,
  //             answer2: 2,
  //             answer3: 0,
  //             answer4: 1,
  //             successes: 2,
  //             errors: 2,
  //           },

  //           highSchool: {
  //             answer1: 0,
  //             answer2: 0,
  //             answer3: 0,
  //             answer4: 0,
  //             successes: 0,
  //             errors: 0,
  //           },
  //         },
  //         {
  //           elementarySchool: {
  //             answer1: 0,
  //             answer2: 0,
  //             answer3: 0,
  //             answer4: 0,
  //             successes: 0,
  //             errors: 0,
  //           },

  //           highSchool: {
  //             answer1: 0,
  //             answer2: 0,
  //             answer3: 0,
  //             answer4: 0,
  //             successes: 0,
  //             errors: 0,
  //           },
  //         },
  //         {
  //           elementarySchool: {
  //             answer1: 0,
  //             answer2: 0,
  //             answer3: 0,
  //             answer4: 0,
  //             successes: 0,
  //             errors: 0,
  //           },

  //           highSchool: {
  //             answer1: 0,
  //             answer2: 0,
  //             answer3: 0,
  //             answer4: 0,
  //             successes: 0,
  //             errors: 0,
  //           },
  //         },
  //         {
  //           elementarySchool: {
  //             answer1: 0,
  //             answer2: 0,
  //             answer3: 0,
  //             answer4: 0,
  //             successes: 0,
  //             errors: 0,
  //           },

  //           highSchool: {
  //             answer1: 0,
  //             answer2: 0,
  //             answer3: 0,
  //             answer4: 0,
  //             successes: 0,
  //             errors: 0,
  //           },
  //         },
  //         {
  //           elementarySchool: {
  //             answer1: 0,
  //             answer2: 0,
  //             answer3: 0,
  //             answer4: 0,
  //             successes: 0,
  //             errors: 0,
  //           },

  //           highSchool: {
  //             answer1: 0,
  //             answer2: 0,
  //             answer3: 0,
  //             answer4: 0,
  //             successes: 0,
  //             errors: 0,
  //           },
  //         },
  //         {
  //           elementarySchool: {
  //             answer1: 0,
  //             answer2: 0,
  //             answer3: 0,
  //             answer4: 0,
  //             successes: 0,
  //             errors: 0,
  //           },

  //           highSchool: {
  //             answer1: 0,
  //             answer2: 0,
  //             answer3: 0,
  //             answer4: 0,
  //             successes: 0,
  //             errors: 0,
  //           },
  //         },
  //       ],
  //       quizStarted: false,
  //       currentQuestion: 0,
  //     };

  //     socket.join(pin);
  //   }
  // });

  socket.on("login", (data) => {
    const { pin, user }: { pin: string; user: UserType } = data;
    console.log(data);
    const room = rooms[pin];

    if (room) {
      room.users[user.nickname] = { ...user, connection: socket.id };
      rooms[pin] = room;

      if (!room.quizStarted) {
        socket.join(room.pin);
      } else {
        console.log("O quiz ja startou");
      }

      console.log(rooms[pin]);

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

  socket.on("start-quiz", (data) => {
    rooms[data.pin].quizStarted = true;
    // const {url} = data
  });

  socket.on("start-question", (data) => {
    try {
      const room = rooms[data.pin];
      console.log("start-question");
      let currentQuestion = room.currentQuestion;

      if (currentQuestion < 6) {
        if (currentQuestion === 0) {
          rooms[data.pin].quizStarted = true;
        }

        io.to(data.pin).emit("current-question", {
          question: rooms[data.pin].questions[currentQuestion++],
          currentQuestion,
        });
      } else {
        console.log("As questões acabaram!");
      }
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("disconnect", (reason) => {
    if (socket.handshake.query.deviceType === "mobile") {
      // sala de qual essa conexão fazia parte
      try {
        const pin = connections[socket.id].room;
        const room = rooms[pin];
        const connection = connections[socket.id];

        // removendo o user da sala
        delete room.users[connection.nickname];

        // Enviando a lista atualizada para todos os membros da sala
        io.to(pin).emit("disconnection", {
          users: rooms[pin].users,
        });
      } catch (err) {
        // console.log(err);
      }
    }
  });

  socket.on("send-answer", (data) => {
    const {
      answerNumber,
      correct,
      questionNumber,
      pin,
    }: {
      answerNumber: 1 | 2 | 3 | 4;
      correct: boolean;
      questionNumber: 1 | 2 | 3 | 4;
      pin: string;
    } = data;

    console.log("send-answer");
    console.log(rooms[pin]);

    // Post /opcaoA

    try {
      console.log(rooms[pin].questionnaireStatistics);
    } catch {
      console.log("erro ao tentar pegar o questionario");
    }

    try {
      rooms[pin].questionnaireStatistics[questionNumber].elementarySchool[
        "answer" + answerNumber
      ]++;

      if (correct) {
        rooms[pin].questionnaireStatistics[questionNumber].elementarySchool
          .successes!++;
      } else {
        rooms[pin].questionnaireStatistics[questionNumber].elementarySchool
          .errors!++;
      }

      console.log(
        rooms[pin].questionnaireStatistics[questionNumber].elementarySchool
      );
    } catch (err) {
      console.log(err.message);
    }
  });

  socket.on("get-statistics", (data) => {
    const {
      pin,
      questionNumber,
    }: {
      pin: string;
      questionNumber: 1 | 2 | 3 | 4 | 5 | 6;
    } = data;

    const statistics =
      rooms[pin].questionnaireStatistics[questionNumber].elementarySchool;
    const usersLength = Object.values(rooms[pin].users).length;

    // quantidade de alunos
    // 1 -> (qtd/qtdDeAlunos) * 100
    // 2
    // 3
    // 4

    // const response = {
    //   1:
    //   2:
    //   3:
    //   4
    // }

    socket.emit("send-statistics", {
      statistics:
        rooms[pin].questionnaireStatistics[questionNumber].elementarySchool,
    });
  });
});

app.post("/create-room", (req: Request, res: Response) => {
  const { url, level } = req.body;

  let pin: string;

  do {
    pin = String(getRandomInt(1000, 9999));
  } while (rooms[pin]);

  rooms[pin] = {
    pin: pin,
    level,
    questionnaireStatistics: [
      {
        elementarySchool: {
          answer1: 1,
          answer2: 2,
          answer3: 0,
          answer4: 1,
          successes: 2,
          errors: 2,
        },

        highSchool: {
          answer1: 0,
          answer2: 0,
          answer3: 0,
          answer4: 0,
          successes: 0,
          errors: 0,
        },
      },
      {
        elementarySchool: {
          answer1: 0,
          answer2: 0,
          answer3: 0,
          answer4: 0,
          successes: 0,
          errors: 0,
        },

        highSchool: {
          answer1: 0,
          answer2: 0,
          answer3: 0,
          answer4: 0,
          successes: 0,
          errors: 0,
        },
      },
      {
        elementarySchool: {
          answer1: 0,
          answer2: 0,
          answer3: 0,
          answer4: 0,
          successes: 0,
          errors: 0,
        },

        highSchool: {
          answer1: 0,
          answer2: 0,
          answer3: 0,
          answer4: 0,
          successes: 0,
          errors: 0,
        },
      },
      {
        elementarySchool: {
          answer1: 0,
          answer2: 0,
          answer3: 0,
          answer4: 0,
          successes: 0,
          errors: 0,
        },

        highSchool: {
          answer1: 0,
          answer2: 0,
          answer3: 0,
          answer4: 0,
          successes: 0,
          errors: 0,
        },
      },
      {
        elementarySchool: {
          answer1: 0,
          answer2: 0,
          answer3: 0,
          answer4: 0,
          successes: 0,
          errors: 0,
        },

        highSchool: {
          answer1: 0,
          answer2: 0,
          answer3: 0,
          answer4: 0,
          successes: 0,
          errors: 0,
        },
      },
      {
        elementarySchool: {
          answer1: 0,
          answer2: 0,
          answer3: 0,
          answer4: 0,
          successes: 0,
          errors: 0,
        },

        highSchool: {
          answer1: 0,
          answer2: 0,
          answer3: 0,
          answer4: 0,
          successes: 0,
          errors: 0,
        },
      },
    ],
    questions: Questionnaires[level],
    quizStarted: false,
    currentQuestion: 0,
    url,
    users: {},
  };

  return res.status(200).json({ pin });
});

app.get("/start-question/:pin", (req: Request, res: Response) => {
  res.json({
    pin: req.params.pin,
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server runing in http://localhost:${PORT} 🔥`);
});
