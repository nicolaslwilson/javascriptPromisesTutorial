'use strict';

const fetch = require('node-fetch');
const request = require('request');

//Original Request Using request and a callback function

// request.get('http://httpbin.org/get', (error, response, body) => {
// 	if (error) {
// 		console.error('Oh shoot. Something went wrong:');
// 		console.error(error.message);
// 		return;
// 	}

// 	console.log('Request done. Response status code: %d', response.statusCode);
// });

//Refactored to use Fetch which returns a promise

// fetch('http://httpbin.org/get')
// .then(response => {
//   console.log('Request using Promises done. Response status code: %d', response.status);
// })
// .catch(error => {
//   console.error('Oh shoot. Something went wrong with the promise code:');
//   console.error(error.message);
// });

//Refactored to use a second .then()

// function extractStatusCode(response) {
//   response = undefined;
//   return response.status;
// }
 
// fetch('http://httpbin.org/get')
// .then(extractStatusCode, errorInFetch => {
//   console.error('This will not be executed.');
//   console.error(errorInFetch.message);
//   // forward the error
//   return Promise.reject(errorInFetch);
// })
// .then(statusCode => {
//   console.log('Request using Promises. Response status code: %s', statusCode);
// })
// .catch(error => {
//   console.error('There was an error somewhere in the chain.');
//   console.error(error.message);
// });

//Using Promise.all()

// const queryParameters = ['ahoy', 'hello', 'hallo'];

// const fetchPromises = queryParameters.map(queryParam => {
//   return fetch(`http://httpbin.org/get?${queryParam}`)
//     .then(response => {
//       // parse response body as JSON
//       return response.json()
//     })
//     .then(response => {
//       // extract the URL property from the response object
//       let url = response.url;
//       console.log('Response from: %s', url);
//       return url;
//     });
// });

// Promise.all(fetchPromises).then(allUrls => {
//   console.log('The return values of all requests are passed as an array:');
//   console.log(allUrls);
// }).catch(error => {
//   console.error('A call failed:');
//   console.error(error.message);
// });

// Executing Promises in Series

// const queryParameters = ['ahoy', 'hello', 'hallo'];

// let mostRecentPromise = Promise.resolve([]); // start with an immediately resolving promise and an empty list
// queryParameters.forEach(queryParam => {
//   // chain the promise to the previous one
//   mostRecentPromise = mostRecentPromise.then(requestedUrlsSoFar => {
//     return fetch(`http://httpbin.org/get?${queryParam}`)
//       .then(response => {
//         // parse response body as JSON
//         return response.json()
//       })
//       .then(response => {
//         // extract the URL property from the response object
//         let url = response.url;
//         console.log('Response from: %s', url);
//         requestedUrlsSoFar.push(url);
//         return requestedUrlsSoFar;
//       });
//   });
// });

// mostRecentPromise.then(allUrls => {
//   console.log('The return values of all requests are passed as an array:');
//   console.log(allUrls);
// }).catch(error => {
//   console.error('A call failed:');
//   console.error(error.message);
// });

const queryParameters = ['ahoy', 'hello', 'hallo'];

let mostRecentPromise = queryParameters.reduce((previousPromise, queryParam) => {
  return previousPromise.then(requestedUrlsSoFar => {
    return fetch(`http://httpbin.org/get?${queryParam}`)
      .then(response => {
        // parse response body as JSON
        return response.json()
      })
      .then(response => {
        // extract the URL property from the response object
        let url = response.url;
        console.log('Response from: %s', url);
        requestedUrlsSoFar.push(url);
        return requestedUrlsSoFar;
      });
  });
}, Promise.resolve([]));

mostRecentPromise.then(allUrls => {
  console.log('The return values of all requests are passed as an array:');
  console.log(allUrls);
}).catch(error => {
  console.error('A call failed:');
  console.error(error.message);
});
