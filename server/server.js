const express = require("express");

const app = express();
app.use(express.static("client"));
app.use(express.json());

// app.get("/favs", (req, res) => {

// })

app.listen(3000, () => console.log("Server is up and running..."))