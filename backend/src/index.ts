import express from 'express';
import cors from 'cors';
import config from 'config';
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes/routes";
import { deserializeUser } from "./middleware";
const http = require('http');

const port = config.get('port') as number;
const host = config.get('host') as string;

const app = express();
app.use(cors());

app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

connect();
routes(app);

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Backend Server running on http://${host}:${port} ...`)
});