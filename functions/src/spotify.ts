import * as functions from 'firebase-functions'
import axios from 'axios';
import { db } from './db'
const querystring = require('querystring');

const SPOTIFY_CLIENT_ID="5c88dbb21e99427f8f4b3a80589291ea"
const SPOTIFY_CLIENT_SECRET="141a8426e32d4d7eae397e271703f105"
const SHOPIFY_REDIRECT_URI='https://us-central1-raszyk-web.cloudfunctions.net/callback';
const REFRESH_TOKEN = 'AQCIkgDR5NqqsgD3pxQm1K4IGkOzVCG9DVX_e2x-ehwYPccYgdkwB0vHEhF7paZaVP4d2hksvtpeg6AQM1E3gmJUDcvSNUrQSaS5ZuJ0Qj0nVuD__KkenkvKdVec3pEVMvA';

export const spotifyAPI = {
  async refresh(refreshToken:string){
    const {data} : any = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify(
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
    ), {
      headers: {
        'Authorization': 'Basic ' + (new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
      },
    });

    await db.collection('spotify').doc('auth').set({
      ...data,
      refresh_token: data.refresh_token || refreshToken,
      expires_at: +new Date() + 3600 * 1000
    });

    return data;
  },
  async getCurrentTrack(){
    let authDocument = await db.collection('spotify').doc('auth').get();
    let auth = authDocument.data();
    if (auth.expires_at <= +new Date()){
      auth = await this.refresh(auth.refresh_token);
    }

    const {data} = await axios.get('https://api.spotify.com/v1/me/player/currently-playing?market=DE', {
      headers: {
        Authorization: `Bearer ${auth.access_token}`
      }
    });
    return data;
  }
}

export const getCurrentTrack = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Headers', '*');
  spotifyAPI.getCurrentTrack().then((track) =>   response.send(track));
});

export const authorize = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Headers', '*');
  const scope = 'user-read-currently-playing';
  const authorizationUrl = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: SHOPIFY_REDIRECT_URI,
      state: +new Date()
    });

  response.redirect(authorizationUrl);
});


export const callback = functions.https.onRequest(async (request, response) => {
  const {data} : any = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify(
    {
      grant_type: 'authorization_code',
      code: request.query.code,
      redirect_uri: SHOPIFY_REDIRECT_URI
    },
  ), {
    headers: {
      'Authorization': 'Basic ' + (new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
    },
  });


  await db.collection('spotify').doc('auth').set({
    ...data,
    expires_at: +new Date() + 3600 * 1000
  });
  response.send(data);
});

