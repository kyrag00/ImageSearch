const express = require("express");
const {imageSchema} = require("./schemas/user.schema")
const cors = require("cors")
const fs = require("fs")

const app = express();
// app.use(express.static("client"));
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

app.get("/favs", (req, res) => {
    res.status(200).json(savedImages)
})

app.post("/favs", (req, res) => {
    const {error} = imageSchema.validate(req.body, {abortEarly: false})

    if (error) {
        return res.status(400).json(error)
    }
    
    savedImages.push(req.body)
    
    fs.writeFileSync("./saved-image.json", JSON.stringify(savedImages))
    res.status(201).json(savedImages)
})


app.listen(3000, () => console.log("Server is up and running..."))