const bodyParser = require('body-parser');
const app = require('express')();
const axios = require('axios');
module.exports = {
  path: '/',
  handler: app
};
app.use(bodyParser.json());

app.get('/cart.js', (req, res) => {
  const options = {
    method: 'GET',
    url: `https://${process.env.SHOPIFY_DOMAIN}` + req.originalUrl
  };
  axios.request(options).then((response) => {
    res.status(200).send(response.data);
  }).catch((error) => {
    console.error(error);
  });
});
