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
    const userData = savedImages.find(data => data.user === user);
    const userImages = userData ? userData.favouriteImages : [];
    res.status(200).json(userImages)
})

app.post("/favs/:user", (req, res) => {
    const user = req.params.user;

    
    const userData = savedImages.find(data => data.user === user);

    if (userData) {
        userData.favouriteImages.push({ link: req.body.link });
    } else {
        savedImages.push({ user: user, favouriteImages: [{ link: req.body.link }] });
    }

    console.log(user)
    // const user = req.user.nickname;
    // let userData = savedImages.find(data => data.user === user);

    // if(!userData) {
    //     userData = {user: user, favouriteImages: []}
    //     savedImages.push(userData)
    // }

    // userData.favouriteImages.push({link: req.body.link})


    // if(!savedImages[user]) {
    //     savedImages[user] = []
    // }

    // savedImages[user].push(req.body)

    fs.writeFileSync("saved-image.json", JSON.stringify(savedImages, null, 2))
    res.status(200).json(user)
})
app.listen(3000, () => console.log("Server is up and running..."))