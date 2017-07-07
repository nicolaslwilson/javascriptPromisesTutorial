'use strict';

const fetch = require('node-fetch');
const request = require('request');

request.get('http://httpbin.org/get', (error, response, body) => {
	if (error) {
		console.error('Oh shoot. Something went wrong:');
		console.error(error.message);
		return;
	}

	console.log('Request done. Response status code: %d', response.statusCode);
});