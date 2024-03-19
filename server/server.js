const express = require("express");
const {imageSchema} = require("./schemas/user.schema")
const cors = require("cors")
const fs = require("fs")

const app = express();
app.use(express.json());
app.use(cors())

// const images = require("./saved-image.json");
let savedImages = [];
try {
    const data = fs.readFileSync("./saved-image.json", "utf-8")
    savedImages = JSON.parse(data)
} catch (err) {
    console.log("Error reading saved file:", err)
}

app.get("/favs/:user", (req, res) => {
    const user = req.params.user
    const userImages = savedImages[user]
    res.status(200).json(userImages)
    // res.status(200).json("Hej från get anrop")
})

app.post("/favs/:user", (req, res) => {
    const user = req.params.user;

    if(!savedImages[user]) {
        savedImages[user] = []
    }

    savedImages[user].push(req.body)
    // const {error} = imageSchema.validate(req.body, {abortEarly: false})

    // if (error) {
    //     return res.status(400).json(error)
    // }
    
    // savedImages.push(req.body)

    // fs.writeFileSync("./saved-image.json", JSON.stringify(savedImages))
    // res.status(201).json(savedImages)
    fs.writeFileSync("saved-image.json", JSON.stringify(savedImages, null, 2))
    res.status(200).json("hej hej från post")
})
app.listen(3000, () => console.log("Server is up and running..."))