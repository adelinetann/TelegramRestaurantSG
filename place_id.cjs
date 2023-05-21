const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDSLGb_Je61qqWE1cczHFeycDHpuwT2Ceo'
});


var place_id = ""

function getPlaceID(restaurantName, callback) {
  googleMapsClient.places({
    query: restaurantName
  }, (err, response) => {
    if (err) {
      console.error(err);
      callback(null);
      return;
    }
    const result = response.json.results[0];
    const place_id = result.place_id;
    callback(place_id);
  });
}

module.exports = { getPlaceID };



/*
function getPlaceID(restaurantName){
  const query = restaurantName
  googleMapsClient.places({
    query: query
  }, (err, response) => {
    if (err) {
      console.error(err);
      return;
    } else {
      const result = response.json.results[0];
      place_id = result.place_id
      console.log("*"+place_id);
      resolve(place_id)
    }
  
  });  
}*/

//module.exports = {getPlaceID, place_id}

//getPlaceID("Ichiban Sushi (Bukit Panjang)")