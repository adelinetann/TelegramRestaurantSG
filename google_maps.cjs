const axios = require('axios');


function getNearbyCafes(strkeyword, strlocation) {
  //console.log(strkeyword)
  //console.log(strlocation)

  const apiKey = 'AIzaSyDSLGb_Je61qqWE1cczHFeycDHpuwT2Ceo';
  const location = strlocation //'1.3350992321496944, 103.78499126592152';
  const radius = '800'; // meters
  const type = "restaurant" ; // ask user restaurant or cafe?
  const keyword = strkeyword; //Chinese, coffee ask user the cuisine?
  const minPriceLevel = 0; // Lowest price level
  const maxPriceLevel = 4; // Highest price level
  const openNow = false;

  //const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&keyword=${keyword}&minprice=${minPriceLevel}&maxprice=${maxPriceLevel}&opennow=${openNow}&key=${apiKey}`;
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&keyword=${keyword}&minprice=${minPriceLevel}&maxprice=${maxPriceLevel}&opennow=${openNow}&key=${apiKey}`;

  const lsResults = [];
  var intCount = 0;
  
  return axios.get(url)
    .then(response => {
      const results = response.data.results;
      results.forEach(function(result) {
        //console.log(Object.keys(result));
        //intCount = intCount + 1
        lsResults.push(`${result.name}`) //(${result.rating})
        //console.log(place_id);
      });
      return lsResults;
    })
    .catch(error => {
      console.error(error);
      return [];
    });
}

module.exports = { getNearbyCafes };


//getNearbyCafes("Chinese", '1.3050886500142855, 103.8321662089145')


/*
const axios = require('axios');

const apiKey = 'AIzaSyDSLGb_Je61qqWE1cczHFeycDHpuwT2Ceo';
const location = '1.3339974026432835, 103.78520822418255';
const radius = '1000'; // meters
const type = 'cafe';
const keyword = 'coffee';
const minPriceLevel = 0; // Lowest price level
const maxPriceLevel = 4; // Highest price level
const openNow = false;

const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&keyword=${keyword}&minprice=${minPriceLevel}&maxprice=${maxPriceLevel}&opennow=${openNow}&key=${apiKey}`;

axios.get(url)
  .then(response => {
    const results = response.data.results;
    //console.log(`Found ${results.length} restaurants nearby:`);
    results.forEach(result => {
        //console.log(result)
        console.log(`${result.name} (${result.rating})`);
    });
  })
  .catch(error => {
    console.error(error);
  });
*/