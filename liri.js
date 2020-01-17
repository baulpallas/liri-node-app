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

// ===================================================================================================================
///switch cases
function switchCase(action, parameter) {
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
    default:
      console.log("Command not found! Try again!");
  }
}
switchCase(action, parameter);

// ===================================================================================================================
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
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      }
    });
}

// ===================================================================================================================
function ifSpotify(parameter) {
  spotifyAPI(parameter);
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

// ===================================================================================================================
function ifMovie(parameter) {
  let movie;
  try {
    if (parameter.split(" ")[1]) {
      movie = parameter.split(" ").join("+");
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
    });
}

// ===================================================================================================================
function ifDoWhatItSays() {
  const readFile = readFileSync("random.txt")
    .toString()
    .split(",");
  let action = readFile[0].trim();
  let parameter = readFile[1].trim();
  console.log(action);
  console.log(parameter);
  switchCase(action, parameter);
}
