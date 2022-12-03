const express = require("express");
const app = express();

const profile = require('./routes/profile');
const login = require('./routes/login');
const mainpage = require('./routes/mainpage');


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
