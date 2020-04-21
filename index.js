const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv')
const fs = require('fs')

dotenv.config()

const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'baron'
})

bot.on('start', () => {
    const params = {
        icon_emoji: ':robot_face:'
    }

    // bot.postMessageToChannel(
    //     'random',
    //     'Get inspired while working with @baron',
    //     params
    // );
    // define existing username instead of 'user_name'
    bot.postMessageToUser('George', 'Hello world!', params); 
})

bot.on('error', (err) => {
    console.log(err);
})

// Message Handler
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
})

// Response Handler
function handleMessage(message) {
    if(message.includes(' speak')) {
        inspireMe()
    } else if(message.includes(' random joke')) {
        randomJoke()
    } else if(message.includes(' help')) {
        runHelp()
    }
}

// inspire Me
function inspireMe() {
    // axios.get('https://raw.githubusercontent.com/BolajiAyodeji/inspireNuggets/master/src/quotes.json')
    //   .then(res => {
    //         const quotes = res.data;
    //         const random = Math.floor(Math.random() * quotes.length);
    //         const quote = quotes[random].quote
    //         const author = quotes[random].author

    //         const params = {
    //             icon_emoji: ':male-technologist:'
    //         }
        
    //         bot.postMessageToChannel(
    //             'random',
    //             `:zap: ${quote} - *${author}*`,
    //             params
    //         );

    //   })
    fs.readFile('./quotes.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        // console.log('File data:', jsonString)
        quotes = JSON.parse(jsonString)

        const random = Math.floor(Math.random() * quotes.length);
        const quote = quotes[random].quote
        // const author = quotes[random].author

        const params = {
            icon_emoji: ':bear:'
        }
    
        bot.postMessageToChannel(
            'random',
            `:crown: ${quote} `,
            params
        );
    })
}

// Random Joke
function randomJoke() {
    axios.get('https://api.chucknorris.io/jokes/random')
      .then(res => {
            const joke = res.data.value;

            const params = {
                icon_emoji: ':smile:'
            }
        
            bot.postMessageToChannel(
                'random',
                `:zap: ${joke}`,
                params
            );

      })
}

// Show Help
function runHelp() {
    const params = {
        icon_emoji: ':question:'
    }

    bot.postMessageToChannel(
        'random',
        `Type *@inspirenuggets* with *inspire me* to get an inspiring techie quote, *random joke* to get a Chuck Norris random joke and *help* to get this instruction again`,
        params
    );
}