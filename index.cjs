// Telegram API code
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();


//const token = process.env.token;
const token = '5916482361:AAHcUBqJb6OsEIsW7T1NwYPFhmjfUFv5TAs'
const bot = new TelegramBot(token, {polling: true});


// Initializing variables
const lsCuisines = ["Chinese", "Indian", "Malay", "Japanese","Korean", "Mediterranean", "Others"] //can I get list from API? 

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  //console.log(msg.text)

  if (lsCuisines.includes(msg.text)){
    const strCuisine = msg.text
    bot.sendMessage(chatId, `Would you like to have ${strCuisine}?`);

    bot.on('message', (msg) => {
      if (msg.text == "yes"){

        // Asks other information to perform restaurant suggestions
      }
      else {
        // Give list of cuisine options (should i put all these into smaller workflows to invoke?)
      }
    })
  }
  else{
    bot.sendMessage(chatId, "What other cuisine?") // Change to gives list of cuisine options
  }
})


// Exporting variables
//export default msg;


/*
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // Initial welcome message and promopt
  bot.sendMessage(chatId, "Hello! Don't know what to eat? Lemme help u :)");

  // Ask user what cuisine
  bot.sendMessage(chatId, "What cuisine are you feeling today?")
});
*/

/* Echo message back code
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; 

  bot.sendMessage(chatId, resp);
});
*/
