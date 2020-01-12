// dot env configuration
const dotEnv = require("dotenv").config();
const axios = require("axios");
const keys = require("./keys");
// * You should then be able to access your keys information like so
//   var spotify = new Spotify(keys.spotify);

// initialize command line usage
const [_, __, action, parameter] = process.argv;

switch (action) {
  case "concert-this":
    ifConcertThis(parameter);
    break;

  case "spotify-this-song":
    ifSpotify();
    break;

  case "movie-this":
    ifMovie();
    break;

  case "do-what-it-says":
    ifDoWhatItSays();
    break;
}

function ifConcertThis(parameter) {
  console.log(parameter);
  // console.log("hello my brother on stage!");
  if (parameter.split(" ")[1]) {
    concert = parameter.split(" ").join("");
    bandInTownAPI(concert);
  } else {
    bandInTownAPI(parameter);
  }
}

function bandInTownAPI(band) {
  axios
    .get(
      `https://rest.bandsintown.com/artists/${parameter}/events?app_id=codingbootcamp`
    )
    .then(function(res) {
      console.log(res.data);
    });
}

function ifSpotify() {
  console.log("hello from spotify!");
}

function ifMovie() {
  console.log("hello from omdb!");
}

function ifDoWhatItSays() {
  console.log("I'm all yours");
}
