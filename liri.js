// dot env configuration
const dotEnv = require("dotenv").config();
const axios = require("axios");
const keys = require("./keys");
const moment = require("moment");
const { readFileSync } = require("fs");
const Spotify = require(`node-spotify-api`);
let spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

moment().format();

// initialize command line usage
const [_, __, action, parameter] = process.argv;

///switch cases
switch (action) {
  case "concert-this":
    ifConcertThis(parameter);
    break;

  case "spotify-this-song":
    ifSpotify(parameter);
    break;

  case "movie-this":
    ifMovie(parameter);
    break;

  case "do-what-it-says":
    ifDoWhatItSays();
    break;
}

// =================================
// concert-this functionality
function ifConcertThis(parameter) {
  try {
    if (parameter.split(" ")[1]) {
      concert = parameter.split(" ").join("");
      bandInTownAPI(concert);
    } else {
      bandInTownAPI(parameter);
    }
  } catch (err) {
    console.log("Invalid entry!");
  }
}
// concert-this API Call
function bandInTownAPI(parameter) {
  axios
    .get(
      `https://rest.bandsintown.com/artists/${parameter}/events?app_id=codingbootcamp`
    )
    .then(function(res) {
      // console.log(res.data);
      for (let i = 0; i < 5; i++) {
        let unparsedDate = res.data[i].datetime;
        let parsedDate = unparsedDate.substring(0, unparsedDate.length - 9);
        let date = moment(parsedDate, "YYYY-MM-DD").format("MM/DD/YYYY");
        console.log(
          `Date: ${date}` +
            `\nVenue: ${res.data[i].venue.name}` +
            `\nCity: ${res.data[i].venue.city}` +
            `\nCountry: ${res.data[i].venue.country}\n`
        );
      }
    });
}

// =================================
function ifSpotify(parameter) {
  spotifyAPI(parameter);
  console.log("hello from spotify!");
}

function spotifyAPI(song) {
  spotify
    .search({ type: `track`, query: song, limit: 5 })
    .then(function(res) {
      for (let i = 0; i < 3; i++) {
        let artist = res.tracks.items[i].album.artists[0].name;
        let trackName = res.tracks.items[i].name;
        let trackURL = res.tracks.items[i].album.external_urls.spotify;
        console.log(
          `Artist: ${artist}` +
            `\nTrack: ${trackName}` +
            `\nTrack URL: ${trackURL}\n`
        );
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

// =================================
function ifMovie(parameter) {
  let movie;
  try {
    if (parameter.split(" ")[1]) {
      movie = parameter.split(" ").join("+");
      console.log(movie);
      OMDBAPI(movie);
    } else {
      OMDBAPI(parameter);
    }
  } catch (err) {
    movie = "Mr.+Nobody";
    OMDBAPI(movie);
  }
}

function OMDBAPI(movie) {
  axios
    .get(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`)
    .then(function(res) {
      console.log(
        `Title: ${res.data.Title}` +
          `\nRelease Year: ${res.data.Year}` +
          `\nIMDB Rating: ${res.data.imdbRating}` +
          `\nRotten Tomatoes Rating: ${res.data.Ratings[1].Value}` +
          `\nCountry of Production: ${res.data.Country}` +
          `\nLanguage: ${res.data.Language}` +
          `\nPlot: ${res.data.Plot}` +
          `\nActors: ${res.data.Actors}`
      );
      // console.log(res.data);
    })
    .catch(function(error) {
      if (error.res) {
        console.log("---------------Data---------------");
        console.log(error.res.data);
        console.log("---------------Status---------------");
        console.log(error.res.status);
        console.log("---------------Status---------------");
        console.log(error.res.headers);
      }
      console.log("hello from omdb!");
    });
}

// =================================
function ifDoWhatItSays() {
  const readFile = readFileSync("random.txt", (err, data) => {
    let txtData;
    let action;
    let userInput;
    txtData = data.toString().split(", ");
    action = txtData[0];
    console.log(action + " action");
    userInput = txtData[1];
    console.log(userInput + " user input");
    // switch case for final function

    switch (action) {
      case "concert-this":
        ifConcertThis(userInput);
        break;

      case "spotify-this-song":
        ifSpotify(userInput);
        break;

      case "movie-this":
        ifMovie(userInput);
        break;
    }
    if (err) {
      return console.log(err);
    }
  });
}
