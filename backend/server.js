import dotenv from "dotenv";
// import { testAi } from "./src/services/ai.service.js";
dotenv.config({ path: "./.env" });
import http from "http"
import { initSocket } from "./src/sockets/server.socket.js";

import app from "./src/app.js";
import connectTOdb from "./src/config/database.js";

const httpServer = http.createServer(app)

initSocket(httpServer)

// testAi()

connectTOdb()
httpServer.listen(3000, () => {
    console.log("server is running on 3000");
})
