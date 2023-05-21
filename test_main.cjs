const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
//const token = process.env.token;
const token = '5916482361:AAHcUBqJb6OsEIsW7T1NwYPFhmjfUFv5TAs'
const bot = new TelegramBot(token, {polling: true});

// Initializing variables
const lsCuisines = ["CHINESE","WESTERN","INDIAN", "MALAY", "JAPANESE","KOREAN", "MEDITERRANEAN", "OTHERS"] //can I get list from API? 
var boolValidCuisine = false
var cuisine
var location
var type = "restaurant"
let { getNearbyCafes, lsResults } = require('./google_maps.cjs');
let { getLocation, longlatLocation } = require('./geocode.cjs');
let { getPlaceID, place_id} = require('./place_id.cjs')
let { getPlaceDetails, website, address } = require('./place_details.cjs')

// Main bot
bot.on('message',(msg) => {
  const chatId = msg.chat.id;
  //console.log(boolValidCuisine)

  if (lsCuisines.includes(msg.text.toUpperCase())) {
    boolValidCuisine = true
    cuisine = msg.text

    // Create a custom keyboard with "Yes" and "No" buttons
    const keyboard = {
      inline_keyboard: [
        [
          { text: 'Yes', callback_data: 'yes' },
          { text: 'No', callback_data: 'no' },
        ],
      ],
    };

    bot.sendMessage(chatId, `Would you like to have ${msg.text}?`, {
      reply_markup: keyboard,
    });    

    // Listen for callback query events
    bot.once('callback_query', (callbackQuery) => {
      const action = callbackQuery.data;
      const msg = callbackQuery.message;
      const chatId = msg.chat.id;

      if (action === 'yes') {
      //Ask where they're eating
      bot.sendMessage(chatId, "And where would you like to eat?\nSpecify a location, postal code etc...")
      .then(() => {
        // GET LOCATION BEGIN
        bot.once('message', (msg) => {
          var location = msg.text
          getLocation(`${location}, Singapore`)
        .then((longlatLocation) => {
        location = `${longlatLocation.lat}, ${longlatLocation.lng}`
        //console.log(location)

               // GET CAFE BEGIN
               getNearbyCafes(cuisine, location) //cuisine,location
               .then(lsResults => {
                if (lsResults) {
                  if (lsResults.length > 5) {
                      lsResults = lsResults.slice(0,5)
                    } 
                  //var results = lsResults.join('\n');
                  //console.log(lsResults)
                  bot.sendMessage(chatId, `*Here are your options:*`, {parse_mode: 'markdown'})
                  async function sendMessages() {
                    for (const element of lsResults) {
                      const placeId = await new Promise((resolve) => {
                        element = element.slice(3);
                        getPlaceID(element, (place_id) => {
                          resolve(place_id);
                        });
                      });
                  
                      const [website, address] = await new Promise((resolve) => {
                        getPlaceDetails(placeId, (website, address) => {
                          resolve([website, address]);
                        });
                      });
                  
                      bot.sendMessage(
                        chatId,
                        `*${idx}) ${lsResults[idx - 1]}*\n- *Address: *${address}\n- *Website: *${website}`,
                        { parse_mode: 'markdown' }
                      );
                  
                      idx = idx + 1;
                    }
                  }
                  
                  sendMessages();
                  
                  /*var idx = 1;
                  console.log(lsResults)
                  lsResults.forEach(async (element) => {
                    element = element.slice(3)
                    // GET PLACE ID BEGIN
                    getPlaceID(element, async(place_id) => {
                    // GET PLACE DETAILS END
                    console.log(place_id)
                    getPlaceDetails(place_id, async(website, address) => {
                      // GET PLACE ID END
                      //console.log(website)
                      //console.log(address)
                      bot.sendMessage(chatId, `*${idx}) ${lsResults[idx-1]}*\n- *Address: *${address}\n- *Website: *${website}`,
                      {parse_mode: 'markdown'});
                      idx = idx + 1;
                    })
                    })
                  });*/                  
                  } else {
                  bot.sendMessage(chatId, "Unable to find anything :/")
                  }
                  //reset variables
                  boolValidCuisine = false
               })
               .catch((error) => {
                 console.error(error);
                 bot.sendMessage(chatId, "Error getting location. Please try again.");
              })
              // GET CAFE END
        })
        .catch((error) => {
          console.error(error);
          bot.sendMessage(chatId, "Error getting location.")
        })
        })
        // GET LOCATION END
    })
  } else if (action === 'no') {
    bot.sendMessage(chatId, "Hmmm, oki then what cuisine would you like to have?")
  }
})
} else if (boolValidCuisine === false){
    bot.sendMessage(chatId,"Hi there! Don't know what to eat?\nLemme help you! What cuisine are you thinking of?")
  }
})