// Progressive Web App: Add service worker with network-first strategy.
// Network-first strategy means that if there is no internet connection,
// the browser will use files previously saved locally to the user’s device instead.
// AKA Offline Mode!
const withOffline = require("next-offline");
const withTypescript = require('@zeit/next-typescript');
const prod = process.env.NODE_ENV === 'production';

const nextConfig = {
  target: "serverless",
  workboxOpts: {
    swDest: "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "networkFirst",
        options: {
          cacheName: "https-calls",
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  },
  env: {
    BACKEND_URL: prod ? 'https://learnit.herokuapp.com' : 'http://localhost:8000',
    // we can use now secrets for api keys and sensitive info we don't want to expose client side
    // variables here are compiled into app at build time
  }
};

module.exports = withTypescript(withOffline(nextConfig));