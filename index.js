import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const Weather_URL = "";
const Location_URL = "http://api.openweathermap.org/geo/1.0/zip?" // zip={zip code},{country code}&appid={API key}";
const apiToken = "";


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req,res) => {
    try {
        const result = await axios.get(Location_URL + `zip=${req.body.zip},${req.body.country}&appid=${apiToken}`);
        res.render("index.ejs", { secret: result.data.secret, user: result.data.username});
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.post("/result", async (req,res) => {
    try {
        const result = await axios.get(API_URL + "");
        res.render("index.ejs", { secret: result.data.secret, user: result.data.username});
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});