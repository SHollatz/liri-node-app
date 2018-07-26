require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

var request = require('request');
var fs = require("fs");
var commandsArray = [`my-tweets`, `spotify-this-song`, `movie-this`, `do-what-it-says`];
var input = process.argv;
var command = input[2];
var option = input[3];

function writeLog(data) {
    var text = data.join(' ');
    fs.appendFile('log.txt', text, function (err) {
        if (err) {
            console.log(err);
        }
    })
}

function showMyTweets() {
    //console.log("inside showMyTweets");
    client.get('https://api.twitter.com/1.1/search/tweets.json?q=SaHolly2&count=20', function (error, tweets, response) {
        if (error) {
            console.log(error);
            writeLog(err);
        }
        var output = ["\n\nmy-tweets:",]
        var created = '';
        var content = ''
        for (var i = 0; i < tweets["statuses"].length; i++) {
            created = tweets["statuses"][i].created_at
            console.log("Tweet from: " + created);
            content = tweets['statuses'][i].text;
            console.log(content + "\n");
            output.push("\n\nTweet from: " + created, "\n" + content);
        }
        writeLog(output);
    })
}

function spotifyThisSong() {
    var song = "The Sign";
    var artist = '';
    var preview = "";
    var album = '';
    var output = [];
    if (option === undefined) {
        spotify.search({ type: 'track', query: song, limit: 10 }, function (err, data) {
            if (err) {
                console.log(err);
                writeLog(err);
            }
            for (var element of data["tracks"]["items"]) {
                if (element.artists[0].name === "Ace of Base") {
                    artist = element.artists[0].name;
                    console.log("Artist: " + artist);
                    song = element.name;
                    console.log("Title: " + song);
                    if (element.preview_url) {
                        preview = element.preview_url;
                        console.log("Preview: " + preview);
                    } else {
                        preview = "Sorry. No preview provided by spotify";
                        console.log(preview);
                    }
                    album = element.album.name;
                    console.log("Album: " + album);
                }
            }
            output.push("\n\nspotify-my-song:", "\nArtist: " + artist, "\nTitle: " + song, "\nPreview: " + preview, "\nAlbum: " + album);
            writeLog(output);
        });
    } else {
        song = option;
        output.push("\n\nspotify-my-song:");
        spotify.search({ type: 'track', query: song, limit: 10 }, function (err, data) {
            if (err) {
                console.log(err);
            }
            var counter = 1;
            for (var element of data["tracks"]["items"]) {
                console.log("\n\nResult " + counter.toString() + ":")
                artist = element.artists[0].name;
                console.log("Artist: " + artist);
                song = element.name;
                console.log("Title: " + song);
                if (element.preview_url) {
                    preview = element.preview_url;
                    console.log("Preview: " + preview);
                } else {
                    preview = "Sorry, no preview link provided by spotify";
                    console.log("Sorry, no preview link provided by spotify");
                }
                album = element.album.name;
                console.log("Album: " + album);

                output.push("\n\nResult " + counter.toString() + ":", "\nArtist: " + artist, "\nTitle: " + song, "\nPreview: " + preview, "\nAlbum: " + album);
                counter++;
            }
            writeLog(output);
        });
    }
}


function movieThis() {
    var movie = "Mr. Nobody";
    var title = '';
    var released = '';
    var imdb = '';
    var rottenTomatoes = '';
    var country = '';
    var language = '';
    var plot = '';
    var actors = '';
    var output= [];

    if (option) {
        movie = option;
    }
    request('http://www.omdbapi.com/?t=' + movie + '&apikey=trilogy', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            title = JSON.parse(body).Title;
            console.log("Title: " + title );
            released = JSON.parse(body).Released;
            console.log("Released: " + released);
            imdb = JSON.parse(body).imdbRating;
            console.log("IMDB Rating: " + imdb );
            rottenTomatoes = JSON.parse(body).Ratings[1].Value;
            console.log("Rotten Tomatoes Rating: " + rottenTomatoes );
            country = JSON.parse(body).Country;
            console.log("Country of Production: " + country);
            language = JSON.parse(body).Language;
            console.log("Language: " + language );
            plot = JSON.parse(body).Plot;
            console.log("Plot: " + plot);
            actors = JSON.parse(body).Actors;
            console.log("Actors: " + actors );
            output.push("\n\nmovie-this:", "\nTitle: " + title, "\nReleased: " + released, "\nIMDB Rating: " + imdb,
                "\nRotten Tomatoes Rating: " + rottenTomatoes, "\nCountry of Production: " + country, "\nLanguage: " + language, 
                "\nPlot: " + plot, "\nActors: " + actors);
            writeLog(output);
        }
    });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        command = dataArr[0];
        option = dataArr[1];
        
        var output = ["\n\ndo-what-it-says:", "\n command: " + command, "\n option: " + option];
        writeLog(output);

        if (command === `my-tweets`) {
            showMyTweets();
        } else if (command === `spotify-this-song`) {
            spotifyThisSong();
        } else if (command === `movie-this`) {
            movieThis();
        } else if (command === `do-what-it-says`) {
            doWhatItSays();
        } else {
            console.log("Input file did not contain valid command")
        }
    });
}

if (command === `my-tweets`) {
    showMyTweets();
} else if (command === `spotify-this-song`) {
    spotifyThisSong();
} else if (command === `movie-this`) {
    movieThis();
} else if (command === `do-what-it-says`) {
    doWhatItSays();
} else {
    console.log("Please type in one of the following commands: \n", commandsArray);
}