const express = require("express");
const {imageSchema} = require("./schemas/user.schema")
const cors = require("cors")
const fs = require("fs")

const app = express();
// app.use(express.static("client"));
app.use(express.json());
app.use(cors())

const images = require("./saved-image.json");

app.post("/favs", (req, res) => {
    const {error} = imageSchema.validate(req.body, {abortEarly: false})

    if (error) {
        return res.status(400).json(error)
    }
    
    images.push(req.body)
    fs.writeFileSync("./saved-image.json", JSON.stringify(images))
    res.status(201).json(images)
})


app.listen(3000, () => console.log("Server is up and running..."))