import express from 'express';
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

const app = express();

//
// const httpServer = createServer(app);
//
// const io = new Server(httpServer, {
//     cors: {
//         origin: corsOrigin,
//         credentials: true,
//     },
// });

app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(port, host, () => {
    connect();
    log.info(`Server listening at http://${host}:${port}`);
    routes(app);

    // socket({ io });
})