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

function extractStatusCode(response) {
  return response.status;
}

fetch('invalid url')
.then(extractStatusCode, errorInFetch => {
	console.error('An error occurred in the fetch call.');
	console.error(errorInFetch.message);
	// Forward the error
	return Promise.reject(errorInFetch);
})
.then(statusCode => {
  console.log('Request using Promises, part II. Response status code: %s', statusCode);
})
.catch(error => {
  console.error('This will now be executed as another exception handler.');
});