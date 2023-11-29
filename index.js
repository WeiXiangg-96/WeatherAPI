import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const Weather_URL = ""; // weather api
const Location_URL = "http://api.openweathermap.org/geo/1.0/zip?" // location api
const apiToken = "7d64ca693d79493070526648e07aba37";


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.post("/result", async (req,res) => {
    try {
        const result = await axios.get(Location_URL + `zip=${req.body.zip},${req.body.country}&appid=${apiToken}`);
        console.log(req.body.zip);
        console.log(req.body.country);
        res.render("index.ejs", {country: result.country, lat: result.lat, lon: result.lon});
    } catch (error) {
        console.log("Error");
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });