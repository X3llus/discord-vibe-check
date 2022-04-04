// Require the necessary discord.js classes
import { Client, Intents } from 'discord.js';
import Sentiment from 'sentiment';
import { config } from 'dotenv';
config();

const sentiment = new Sentiment();

const {
    token
} = process.env;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// When the client detects a message, run this code
client.on("messageCreate", async message => {
    if (Array.from(message.mentions.users.keys()).includes(client.user.id)) {
        const repliedTo = await message.channel.messages.fetch(message.reference.messageId);
        const sentVal = sentiment.analyze(repliedTo.content);

        // Different vibes
        if (sentVal.comparative > 0)
            return message.reply('Good vibes detected 🤖');
        if (sentVal.comparative < 0)
            return message.reply('Bad vibes detected 🤖');
        message.reply('Vibes are indecisive 🤖');
    }
});

// Login to Discord with your client's token
client.login(token);
