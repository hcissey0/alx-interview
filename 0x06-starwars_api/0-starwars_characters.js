#!/usr/bin/node
const request = require('request');

function printMovieCharacters(movieId) {
  const url = `https://swapi-api.alx-tools.com/api/films/${movieId}`;

  request(url, (error, res, body) => {
    if (error) {
      console.log("Failed to fetch movie data");
      return;
    }
    if (res.statusCode === 200) {
      const movieData = JSON.parse(body);
      const characters = movieData.characters;

      characters.forEach(characterUrl => {
        request(characterUrl, (error, res, body) => {
          if (error) {
            console.log(`Failed to fetch character: ${characterUrl}`);
            return;
          }
          if (res.statusCode === 200) {
            const characterData = JSON.parse(body);
            console.log(characterData.name);
          } else {
            console.log(`Failed to fetch character: ${characterUrl}`);
          }
        });
      });
    } else {
      console.log('Failed to fetch movie data');
    }
  });
}

const movieId = process.argv[2];

if (!movieId) {
  console.log('Please provide the movie ID as an argument');
} else {
  printMovieCharacters(movieId);
}
