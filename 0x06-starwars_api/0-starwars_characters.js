#!/usr/bin/node
const request = require('request');

const movieId = process.argv[2];
const url = `https://swapi-api.alx-tools.com/api/films/${movieId}`;


request(url, (error, res, body) => {
  if (error) {
    return;
  }
  if (res.statusCode !== 200) {
    return;
  }
  const data = JSON.parse(body);
  const characterUrls = data.characters;
  characterUrls.forEach((value, index, arr) => {
    request(value, (error, res, body) => {
        if (error) {
            return;
        }
        if (res.statusCode !== 200) {
            return;
        }
        const character = JSON.parse(body);
        console.log(character.name);
    });
  });
});
// function getMovieCharacters(movieId) {
//   const url = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;
//   request(url, (error, response, body) => {
//     if (response && response.statusCode === 200) {
//       const filmData = JSON.parse(body);
//       const characters = filmData.characters;
//       characters.forEach(characterUrl => {
//         request(characterUrl, (error, response, body) => {
//           if (response && response.statusCode === 200) {
//             const characterData = JSON.parse(body);
//             const characterName = characterData.name;
//             console.log(characterName);
//           } else {
//             // console.log(`Failed to retrieve character: ${characterUrl}`);
//           }
//         });
//       });
//     } else {
//     //   console.log(`Failed to retrieve movie: ${url}`);
//     }
//   });
// }

// const movieId = process.argv[2];
// getMovieCharacters(movieId);
// const request = require('request');

// const args = process.argv.slice(2); // Get arguments starting from the 3rd position
// const movieId = args[0]; // Assuming first argument is the movie ID

// if (!movieId) {
//   console.error('Error: Please provide a movie ID.');
//   process.exit(1);
// }

// const apiUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}`;

// request(apiUrl, (error, response, body) => {
//   if (error) {
//     console.error('Error fetching movie data:', error);
//     process.exit(1);
//   }

//   if (response.statusCode !== 200) {
//     console.error('Error:', response.statusCode);
//     process.exit(1);
//   }

//   const movieData = JSON.parse(body);

//   // Extract character URLs from the "characters" list
//   const characterUrls = movieData.characters;

//   // Fetch and print character names sequentially
//   const fetchCharacter = (url, index) => {
//     request(url, (error, response, body) => {
//       if (error) {
//         console.error('Error fetching character data:', error);
//         process.exit(1);
//       }

//       if (response.statusCode !== 200) {
//         console.error('Error:', response.statusCode);
//         process.exit(1);
//       }

//       const characterData = JSON.parse(body);
//       console.log(characterData.name);

//       if (index < characterUrls.length) {
//         fetchCharacter(characterUrls[index + 1], index + 1);
//       }
//     });
//   };

//   fetchCharacter(characterUrls[0], 0); // Start fetching the first character
// });
