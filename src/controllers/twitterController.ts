const Twitter = require('twitter');

export class TwitterController {
  private client;

  constructor() {
    this.client = new Twitter({
      consumer_key: process.env.TWITTER_API_KEY,
      consumer_secret: process.env.TWITTER_API_SECRET_KEY,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
  }

  async getTweetsFromUser(username: string) {
    return new Promise(((resolve, reject) => {
      const params = {screen_name: username};
      this.client.get('statuses/user_timeline', params, (error: any, tweets: any, response: any) => {
        if (!error) {
          const result = tweets.map((e: any) => {
            return {
              text: e.text,
              name: e.user.name,
              username: e.user.screen_name
            }
          });

          resolve(result);
        } else {
          reject({ status: 500, message: 'Error while fetching twitter data' });
        }
      });
    }));
  }
}
