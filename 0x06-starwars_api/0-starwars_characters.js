#!/usr/bin/node
const request = require('request');

// Define the base URL for the Star Wars API
const baseUrl = 'https://swapi-api.alx-tools.com/api/films/';

// Function to retrieve character names from a movie
function getMovieCharacters(movieId) {
  const url = `${baseUrl}${movieId}`;

  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (response.statusCode === 200) {
        const data = JSON.parse(body);
        const characters = data.characters;

        // Fetch details for each character and extract their names
        const promises = characters.map((characterUrl) => {
          return new Promise((resolveCharName, rejectCharName) => {
            request(characterUrl, (err, charResponse, charBody) => {
              if (err) {
                rejectCharName(err);
              } else if (charResponse.statusCode === 200) {
                const charData = JSON.parse(charBody);
                resolveCharName(charData.name);
              } else {
                rejectCharName(new Error(`Character request failed: ${charResponse.statusCode}`));
              }
            });
          });
        });

        Promise.all(promises)
          .then((characterNames) => {
            resolve(characterNames);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject(new Error(`Movie request failed: ${response.statusCode}`));
      }
    });
  });
}

// Get the movie ID from the script arguments
const movieId = process.argv[2];

// If no movie ID is provided, show an error message
if (!movieId) {
  console.error('Please provide a movie ID as the first argument.');
  process.exit(1);
}

// Retrieve and print character names
getMovieCharacters(movieId)
  .then((characterNames) => {
    characterNames.forEach((name) => console.log(name));
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });


// const request = require('request');

// function printMovieCharacters(movieId) {
//   const url = `https://swapi-api.alx-tools.com/api/films/${movieId}`;

//   request(url, (error, res, body) => {
//     if (error) {
//       console.log("Failed to fetch movie data");
//       return;
//     }
//     if (res.statusCode === 200) {
//       const movieData = JSON.parse(body);
//       const characters = movieData.characters;

//       characters.forEach(characterUrl => {
//         request(characterUrl, (error, res, body) => {
//           if (error) {
//             console.log(`Failed to fetch character: ${characterUrl}`);
//             return;
//           }
//           if (res.statusCode === 200) {
//             const characterData = JSON.parse(body);
//             console.log(characterData.name);
//           } else {
//             console.log(`Failed to fetch character: ${characterUrl}`);
//           }
//         });
//       });
//     } else {
//       console.log('Failed to fetch movie data');
//     }
//   });
// }

// const movieId = process.argv[2];

// if (!movieId) {
//   console.log('Please provide the movie ID as an argument');
// } else {
//   printMovieCharacters(movieId);
// }
