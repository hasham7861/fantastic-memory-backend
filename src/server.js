
const express = require("express");
const http = require('http');
const cors = require('cors');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { connectToDB } = require("./shared/mongoDB");
const webSocket = require('socket.io');
const initAppRoutes = require('./base/app/app.route');
const { initializeWebSocketNameSpaces } = require('./base/app/app.subscription');

class Server {

  /**
   * @method _setupAndRetrieveExpressApp
   * @description setup the express midleware
   * @returns {ExpressApp} app
   */
  static async _setupAndRetrieveExpressApp() {

    const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')
    const corsOptions = {
      origins:allowedOrigins,
      optionSuccessStatus: 200
    }
    const app = express();
    app.use(express.json());
    app.use(cors(corsOptions));
    return app;
  }

  /**
   * @method _initServer
   * @description setup the main http server
   * @returns {void}
   */
  static async _initServer() {

    const app = await this._setupAndRetrieveExpressApp();

    const server = http.createServer(app);

    connectToDB()

    // enabling websocket protocol
    const webSocketIo = webSocket(server);
    initializeWebSocketNameSpaces(webSocketIo);

    //giving websocket protocol access to express app
    initAppRoutes(webSocketIo, app);
    server.listen(process.env.PORT, () => {
      console.log('Listening for requests on port', process.env.PORT)
    });

  }

  /**
   * @method start
   * @description start the server
   * @returns {void}
   */
  static async start() {
    this._initServer();
  }
}

// IIFE used only for starting the server
(() => 
  Server.start()
)()