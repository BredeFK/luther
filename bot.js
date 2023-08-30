const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const token = process.env.DISCORD_BOT_TOKEN;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: ['MESSAGE', 'CHANNEL'] // Needed to get messages from DM's as well
});
const numbers = [
    ':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:',
    ':one::zero:', ':one::one:', ':one::two:', ':one::three:', ':one::four:', ':one::five:', 
    ':one::six:', ':one::seven:', ':one::eight:', ':one::nine:', ':two::zero:'
  ];

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", message => {
    if (message.author.displayName !== 'Luther' && message.content.startsWith('!')) {
        console.info(`Message from ${message.author.displayName}: ${message.content}`)
        if (message.content.includes('monday') || message.content.includes('mandag')) {
            message.channel.send("https://www.fritjof.no/images/mandag.gif")
        } else if (message.content.includes("boom") || message.content.includes("bomb")) {
            message.channel.send("Self destruct in 10")
            for (var i = 9; i > 0; i--) {
                message.channel.send(`${i}`)
            }
            message.channel.send(":boom:")
        }
        else if (message.content.includes('1d20')) {
            let number  = getRandomInt(1,20);
            message.channel.send(`${convertToWords(number)}`);
        } else {
            message.channel.send(randomCapitalize(message.content));
        }
    }
});


function randomCapitalize(inputString) {
    let result = '';
    for (let char of inputString) {
        if (/[a-zA-Z]/.test(char) && Math.random() < 0.5) {
            result += char.toUpperCase();
        } else {
            result += char;
        }
    }
    return result;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function convertToWords(number) {
    console.info(`Rolled ${number}`)
    if (number >= 1 && number <= 20) {
      return numbers[number-1];
    } else {
      return 'Number out of range';
    }
  }


client.login(token);