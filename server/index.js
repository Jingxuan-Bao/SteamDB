const express = require("express");
const app = express();
const profile = require('./routes/profile');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
     const addr = server.address();
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

profile(app);
