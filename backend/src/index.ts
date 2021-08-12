import express from 'express';
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";
import config from 'config';
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes/routes";
import { deserializeUser } from "./middleware";
// import socket from "./socket";

const port = config.get('port') as number;
const host = config.get('host') as string;

const index = express();
index.use(cors())

//
// const httpServer = createServer(index);
//
// const io = new Server(httpServer, {
//     cors: {
//         origin: corsOrigin,
//         credentials: true,
//     },
// });

index.use(deserializeUser);

index.use(express.json());
index.use(express.urlencoded({extended: false}));

index.listen(port, host, () => {
    connect();
    log.info(`Server listening at http://${host}:${port}`);
    routes(index);

    // socket({ io });
})