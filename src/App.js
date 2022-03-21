import React, { useState, useEffect } from "react";
import axios from "axios";
const api = {
  key: "ef93835b1302c83ed0ddf5446174e661",
  base: "https://api.openweathermap.org/data/2.5/",
};
const unsplash_key = {
  access_key: "Jnio1MsxJj5a0I8AWSii_o_rdwgrhIR-eMx99o6fOVQ",
  secret_key: "dPTz522_luFloolhCKl4qdBjYuuDaqCOUWHS0oLaRLQ",
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({ weather: [{ main: "none" }] });
  const [weather_type, setWeather_type] = useState("clear sky");
  const [bg_image, setBg_image] = useState("./assets/clear.jpg");
  const [check, setCheck] = useState(false);
  useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&query=${
          query + " " + weather_type
        }&client_id=${unsplash_key.access_key}`
      )
      .then((response) => {
        console.log(response.data);
        console.log(
          response.data.results[Math.floor(Math.random() * 10)].urls.full
        );
        setBg_image(
          response.data.results[Math.floor(Math.random() * 10)].urls.full
        );
      });
  }, [weather_type]);

  function search(e) {
    e.preventDefault();
    axios
      .get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => {
        setWeather(res.data);
        setWeather_type(res.data.weather[0].main);
        setCheck(true);
      });
  }

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className="app"
      style={
        check
          ? {
              backgroundImage: `url(${bg_image})`,
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              backgroundSize: "wrap",
            }
          : {
              backgroundImage: `url(${bg_image})`,
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              height: "100vh",
            }
      }
    >
      <main
        style={
          check
            ? {
                backgroundSize: "wrap",
              }
            : {
                height: "100vh",
              }
        }
      >
        <form onSubmit={search}>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <button className="search-btn" type="submit">
              press here
            </button>
          </div>
        </form>

        {weather_type !== "clear sky" ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>

            <div className="roller_second_party">
              <div className="weather_info">
                <ul className="info_list">
                  <li className="info humidity">
                    <img
                      src="./assets/humidity.png"
                      alt="humidity"
                      className="icons"
                    />
                    {weather.main.humidity} g/m<sup>3</sup>
                  </li>
                  <li className="info pressure">
                    <img
                      src="./assets/pressure.png"
                      alt="pressure"
                      className="icons"
                    />
                    {weather.main.pressure} kg/Pa
                  </li>
                  <li className="info speed">
                    <img
                      src="./assets/wind-turbine.png"
                      alt="wind-speed"
                      className="icons"
                    />
                    {weather.wind.speed} km/h
                  </li>
                </ul>
              </div>
              <div className="days">
                <ul className="days_info">
                  <li className="info sunrise">
                    <img
                      src="./assets/sunrise.png"
                      alt="sunrise"
                      className="icons"
                    />
                    {getFormattedDate(weather.sys.sunrise)}
                  </li>
                  <li className="info sunset">
                    <img
                      src="./assets/sunsets.png"
                      alt="sunset"
                      className="icons"
                    />
                    {getFormattedDate(weather.sys.sunset)}
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="weather_just">
            <h1 align="center">Hello welcome to global weather_site</h1>
            <h2 align="center">
              please,type country or city name to input ☝ over
            </h2>
          </div>
        )}
      </main>
    </div>
  );
}
export default App;

function getFormattedDate(tt) {
  var date = new Date(tt * 1000);

  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;
  sec = (sec < 10 ? "0" : "") + sec;

  var str =
    date.getFullYear() +
    "-" +
    month +
    "-" +
    day +
    "_" +
    hour +
    ":" +
    min +
    ":" +
    sec;

  /*alert(str);*/

  return str;
}
