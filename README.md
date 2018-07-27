# liri-node-app
LIRI is a Language Interpretation and Recognition Interface. 
It is a command line node app that takes in one of four parameters 
 - my-tweets 
 - spotify-this-song {song}
 - movie-this {movie}
 - do-what-it-says

and gives back data accordingly. "my-tweets" will display your last 20 tweets and the date you posted them. 
"spotify-this-song" will give you the artist and ablum names and a preview link when you enter a song.
"movie-this" will give you information about the release date, IMBD and Rotten Tomatoes Ratings, country of production, 
language, plot, and actors when you enter a movie title.
"do-what-it-says" runs the command from the text file random.txt. 
Please see the log.txt file for output examples.

# How to use it:
- Clone repository here: https://github.com/SHollatz/liri-node-app
- run npm install in your terminal
- run node liri.js {choose a command of the list above} {option for spotify-this-song or movie-this}

# used Tech
- Node.js
- Twitter NPM Package - https://www.npmjs.com/package/twitter
- Spotify NPM Package - https://www.npmjs.com/package/spotify
- Request NPM Package - https://www.npmjs.com/package/request
- OMDB API - http://www.omdbapi.com
- DotEnv - https://www.npmjs.com/package/dotenv

# Author
Sabine Hollatz
