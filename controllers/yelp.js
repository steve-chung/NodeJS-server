require('dotenv/config')
const yelp = require('yelp-fusion')
const client = yelp.client(process.env.YELPKEY)
exports.getYelp = (req, response, next) => {
  client.search({
    latitude: +req.query.lat,
    longitude: +req.query.lng,
    radius: 25000,
    categories: 'golf',
    sort_by: 'distance'
  })
    .then(res => {
      return response.json(res.jsonBody.businesses)
    })
    .catch(e => {
      console.log(e)
      response.sendStatus(e.statusCode)
    })
}