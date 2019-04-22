const prod = process.env.NODE_ENV === 'production';

module.exports = {
    BACKEND_URL: prod ? 'https://myapp.herokuapp.com' : 'http://localhost:8000',
    GOOGLE_OAUTH_CLIENT_ID: 'mykey.apps.googleusercontent.com'
};