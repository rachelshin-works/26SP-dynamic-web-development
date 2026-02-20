const express = require("express");
// instance of our express class
const app = express();
const bodyParser = require("body-parser");

//allow the use of my static files (front-end code)
//html, css, js (interaction)
app.use(express.static("public"));

const parser = bodyParser.urlencoded({ extended: true });
app.use(parser);

let messages = [];

// setting up the first handler for a route
// similar to the event listener
app.get("/test", (request, response) => {
  response.send("<h1>live server~</h1>");
});

// we always need to send data at the end of every request (app.get, app.post)
app.post("/sign", (request, response) => {
  console.log(request.body);
  messages.push({
    guest: request.body.guestname,
    post: request.body.message,
  });
  response.send("thank you for sigining");
});

app.get("/all-messages", (req, res) => {
  res.send(messages);
});

// last step always
// start our express application
app.listen(8000, () => {
  console.log("working server");
});
