const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const socketio = require('scoket.io')
const http = require('http')
const server = http.createServer(app)
const io = socketio(server)

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);
require('./routes/socketRoutes')(app);
// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

io.on('connection', (socket) => {
  console.log('New User Has Connected')
  socket.emit('Your id', socket.id) // grabs id and emits is back to user. Id can then be stored in state
  socket.on('send message', body => {
    io.emit('message', body)
  })    //obect that contains message text and id of sender

  socket.on('disconnect', () => {
    console.log('User has disconnected')
  })
})
