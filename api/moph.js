/*
 * @Author: puck.solo 
 * @Date: 2017-09-30 23:56:33 
 * @Last Modified by: puck.solo
 * @Last Modified time: 2017-11-20 18:00:33
 */


const express = require('express');
// const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utils');
const request = require('request');

const router = express.Router();
// *** CLIENT_ID, CLIENT_SECRET, redirect, scope  are genarate from authorize server
const CLIENT_ID = '360934142705270785'; // 360934142705270785
const CLIENT_SECRET = 'zbNK3JyZ64DJx8OZ7nda2q61JkXIOC8'; // zbNK3JyZ64DJx8OZ7nda2q61JkXIOC8
const redirect = encodeURIComponent('http://localhost:50451/api/moph/callback'); // client callback uri
const scope = 'identify';

router.get('/login', (req, res) => {
  res.redirect(`http://oauth.moph.go.th/oauth2/authorize?client_id=${CLIENT_ID}&scope=${scope}&state=teststate&response_type=code&redirect_uri=${redirect}`);
});

router.get('/callback', catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error('NoCodeProvided');
  const code = req.query.code;
  console.log('return state:', req.query.state);
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const options = {
    method: 'POST',
    url: 'http://oauth.moph.go.th/api/oauth2/token',
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded',
      authorization: `Basic ${creds}`,
    },
    form:
    {
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirect,
    },
  };

  const response = await request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    const data = JSON.parse(body);
    res.redirect(`/?token=${data.access_token}&refresh_token=${data.refresh_token}`);
  });
}));

module.exports = router;
