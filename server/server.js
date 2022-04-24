const express = require("express");
const { SocketAddress } = require("net");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  transports: ["websocket"] //set to use websocket only
}); //this loads socket.io and connects it to the server.

const port = 8080;

players = []

//this next line makes sure we can put all our html/css/javascript in the public directory
// app.use(express.static(__dirname + "/public"));
//we just have 1 route to the home page rendering an index html
app.get("/", (req, res) => {
  res.send('Hello World!')
});

//run the server which uses express
http.listen(port, () => {
  console.log(`Server is active at port:${port}`);
});

//store the positions of each client in this object.++++++++++
//It would be safer to connect it to a database as well so the data doesn't get destroyed when the server restarts
//but we'll just use an object for simplicity.
const positions = {};

//Socket configuration
io.on("connection", (socket) => {
  //each time someone visits the site and connect to socket.io this function  gets called
  //it includes the socket object from which you can get the id, useful for identifying each client
  console.log(`${socket.id} connected`);
  socket.emit("init", {
    "player_ids": players
  })
  players.push(socket.id);
  socket.broadcast.emit('player_connected', {
    'player_id': socket.id
  });


  socket.on("disconnect", () => {
    //when this client disconnects, lets delete its position from the object.
    index = players.indexOf(socket.id)
    if(index > -1) {
      players.splice(index,1)
    }
    socket.broadcast.emit('player_disconnected', {
      'player_id': socket.id

      
    });

    console.log(`${socket.id} disconnected`);
  });

  //client can send a message 'updatePosition' each time the clients position changes
  // socket.on("msg", (data) => {
  //   console.log(data)
  //   io.emit("msg", data);
  // });
  socket.on("stateUpdate", (data) => {
    // console.log(data)
    socket.broadcast.emit("stateUpdate", {
      "player_id": socket.id,
      "state": data
    });
  });

});

