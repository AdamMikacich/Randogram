const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const crypto = require('crypto');
const port = 3000;

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/index.html')));
app.use('/static', express.static('public'));

function generate() {
  return crypto.randomBytes(3).toString('hex');
}

async function getImage(url) {
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: 'GET',
      encoding: null
    }, (error, response, body) => {
      if (error) return reject(url);
      resolve(body);
    })
  });
}

async function getUrl() {
  return new Promise((resolve, reject) => {
    request({
      url: `https://prnt.sc/${generate()}`,
      headers: {
        'User-Agent': 'Fake User Agent',
        'From': 'fake@gmail.com'
      },
      method: 'GET'
    }, async(error, response, body) => {
      if (error) return reject(error);

      const expression = new RegExp('screenshot-image');
      const match = body.match(expression);

      if (match == null) return reject('Could not match');

      let url = body.substring(match.index);
      url = url.substring(23);
      url = url.substring(0, url.indexOf(`"`));

      resolve(url);
    });
  });
}

const MAX_TRIES = 10;

app.get('/img', async(req, res) => {
  let i = 0;
  while (i < MAX_TRIES) {
    try {
      const url = await getUrl();
      const result = await getImage(url);
      res.set('Content-Type', 'image/png');
      res.send(result);
      console.log('Successfully found url');
      return;
    } catch (error) {
      console.log('Failed to use url: ' + error);
    }

    i++;
  }
  res.send('Could not find an image after ' + MAX_TRIES + ' tries');
});

app.listen(port, () => {
  console.log(`Listening on ${port}!`)
});