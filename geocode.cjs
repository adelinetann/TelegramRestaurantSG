var longlatLocation

function getLocation(strlocation){
  const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDSLGb_Je61qqWE1cczHFeycDHpuwT2Ceo',
    Promise: Promise
  });


  return new Promise((resolve, reject) => {
    googleMapsClient.geocode({
      address: strlocation
    }, function(err, response) {
      if (!err) {
          longlatLocation = response.json.results[0].geometry.location;
          resolve(longlatLocation);
          //console.log(longlatLocation)
      } else {
          reject(err);
      }
    });
  });
}

/*
  googleMapsClient.geocode({
    address: strlocation
  }, function(err, response) {
    if (!err) {
        //console.log(response.json.results[0].geometry.location);
        longlatLocation = response.json.results[0].geometry.location;
        return longlatLocation
        //console.log(longlatLocation)
    }
  });
}*/

module.exports = { getLocation, longlatLocation};
//getLocation('Bukit Panjang')
  