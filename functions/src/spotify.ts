import * as functions from 'firebase-functions'
import axios from 'axios';
const querystring = require('querystring');


export const getCurrentTrack = functions.https.onRequest(async (request, response) => {

  const SPOTIFY_USERNAME='1143405362'
  const SPOTIFY_CLIENT_ID="5c88dbb21e99427f8f4b3a80589291ea"
  const SPOTIFY_CLIENT_SECRET="141a8426e32d4d7eae397e271703f105"
  const SPOTIFY_OAUTH_TOKEN="BQA2MPM6YpUR2NMFHYjk1VZcLfjmzp-41mU_xcQT_voOLnCJlkt6vPQOyugjdst3sgzrn5HHaGEZBAnkFY_GYK1z5TY2M0K8GCL023XjhzRcsLbAHLeUPo20G45KMalmw4lyoJS3g0k6xoANK6Nn"

  const spotifyAPI = {
    async getOAuthToken(){
      const {data} : any = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify(
        {
          grant_type: 'client_credentials'
        },
      ), {
        headers: {
          'Authorization': 'Basic ' + (new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
      });

      return data.access_token;
    },
    async getCurrentTrack(){
      const oauthToken = await this.getOAuthToken();
      const {data} = await axios.get('https://api.spotify.com/v1/me/player/currently-playing?market=DE', {
        headers: {
          Authorization: `Bearer ${SPOTIFY_OAUTH_TOKEN}`
        }
      });
      return data;
    }
  }

  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Headers', '*');
  spotifyAPI.getCurrentTrack().then((track) =>   response.send(track));
});


