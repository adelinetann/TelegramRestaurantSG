//const { callback } = require('@google/maps/lib/internal/cli');

const googleMapsClient = require('@google/maps').createClient({
  key:'AIzaSyDSLGb_Je61qqWE1cczHFeycDHpuwT2Ceo'
});

//const placeId = 'ChIJXUuzLyMZ2jERs9wAeqqPlAQ';
var website = ""

function getPlaceDetails(place_id, callback) {
  //return new Promise((resolve, reject) => {
    googleMapsClient.place({
      placeid: place_id
    }, (err, response) => {
      if (err) {
        console.error(err);
        //reject(err);
        callback(null)
        return;
      }
      const result = response.json.result;
      const address = result.formatted_address;
      const website = result.website;
      const details = {address, website};
      callback(website, address)
      //resolve(details);
      //console.log(website)
    });
  //});
}

module.exports = { getPlaceDetails };


/*function getPlaceDetails(place_id, callback) {
  googleMapsClient.place({
    placeid: place_id,
    fields: ['name', 'rating', 'formatted_address', 'formatted_phone_number', 'website']
  }, (err, response) => {
    if (err) {
      console.error(err);
      callback(null);
      return;
    }
  
    const result = response.json.result;
  
    //console.log(`Name: ${result.name}`);
    //console.log(`Rating: ${result.rating}`);
    address = result.formatted_address //console.log(`Address: ${result.formatted_address}`);
    //hp = result.formatted_phone_numberformatted_phone_number //console.log(`Phone: ${result.formatted_phone_number}`);
    //website = result.website //console.log(`Website: ${result.website}`);
    callback(address);
    //callback(hp);
    //callback(website);
  });
}

module.exports = { address, getPlaceDetails }*/