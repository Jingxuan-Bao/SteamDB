const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());

const profile = require('./routes/profile');
const login = require('./routes/login');
const mainpage = require('./routes/mainpage');
const game = require('./routes/game');


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
     const addr = server.address();
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});


profile(app);
login(app);
mainpage(app);
game(app);