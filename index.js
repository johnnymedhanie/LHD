'use strict';

// Imports dependencies and set up http server
const PAGE_ACCESS_TOKEN = "EAApfg9GZCFzQBANyMj3xNZCRbHD30RHGmemfhkqTZAoPqvwZB5rrDnZC9pWQvqkJmtvCGBCk2Tdx1TlTyIg9sIwGSpZCc0BnJDPyTOtGhUXPz2gpQJWXxy2CxBMBYxihPSMoNDzq5NDuZCuogk0LvrCX0R69rRY6EkyfXF8IB1YxAZDZD";
  let express = require('express');
  let bodyParser = require('body-parser');
  let app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));


// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {

  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = 'babyYoda';

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  console.log(mode, 'this is mode');
  console.log(token, 'this is token');

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    console.log('i've entered');
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});
