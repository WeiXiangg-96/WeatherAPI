import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const weather_URL = "http://api.openweathermap.org/data/2.5/weather?"; // weather api
const location_URL = "http://api.openweathermap.org/geo/1.0/zip?"; // geocode api
const apiToken = "7d64ca693d79493070526648e07aba37";


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.post("/weather", async (req,res) => {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    try {
        const response = await axios.get(weather_URL + `lat=${latitude}&lon=${longitude}&appid=${apiToken}&units=metric`);
        console.log(response.data.weather[0].main);
        res.render("index.ejs", { weather: response.data});

    } catch (error) {
        console.log(`Error`, error.message);
        res.status(500);
    }

});

app.post("/geocode", async (req,res) => {
    const zip = req.body.zip;
    const country = req.body.country;

    try {
        const response2 = await axios.get(location_URL + `zip=${zip},${country}&appid=${apiToken}`);
        console.log(response2.data);
        res.render("index.ejs", { cordinates: response2.data});

    } catch (error) {
        console.log(`Error`, error.message);
        res.status(500);
    }

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
