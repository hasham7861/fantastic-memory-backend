module.exports = function (webSocketIo, app) {

    // main app routes
    app.get("/status", (req, res) => {
      res.send({
        "message": "api is running",
        "status": 200
      });
    });
  
    // all other apis here
    require('../game/game.route')(webSocketIo, app)
    
  
    app.use((req, res) => {
      res.status(404).send({
        message: "Not Found",
        status: 404
      });
    });
  
  
  }