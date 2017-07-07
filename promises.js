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

fetch('http://httpbin.org/get')
.then(extractStatusCode)
.then(statusCode => {
  console.log('Request using Promises, part II. Response status code: %s', statusCode);
})
.catch(error => {
  console.error('Oh shoot. Something went wrong with the promise code:');
  console.error(error.message);
});