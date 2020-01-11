// dot env configuration
require("dotenv").config();

const keys = require("./keys");
// * You should then be able to access your keys information like so
//   var spotify = new Spotify(keys.spotify);

// initialize command line usage
const [_, __, action, parameter] = process.argv;

function ifConcertThis() {
  if (action === "concert-this") {
    let concert;
    console.log("hello my brother on stage!");
    if (parameter.split(" ")[1]) {
      concert = paramter.split(" ").join();
      console.log("hello there sexy!");
    } else {
    }

    // call API
    axios
      .get(
        `https://rest.bandsintown.com/artists/${parameter}/events?app_id=codingbootcamp`
      )
      .then(function(res) {
        console.log(res.data);
      });
  }
  return;
}
ifConcertThis();
if (action === "spotify-this-song") {
  console.log("hello from spotify!");
}

if (action === "movie-this") {
  console.log("hello from omdb!");
}

if (action === "do-what-it-says") {
  console.log("I'm all yours");
}
