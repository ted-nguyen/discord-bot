/* eslint-disable indent */
// Make sure we have the discord.js module
const Discord = require('discord.js');

// Make sure we have fs which is Node's native file system module
const fs = require('fs');

// Require the config.json file
const { prefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

// Create a collection for commands
client.commands = new Discord.Collection();

// Create a collection for cooldowns
const cooldowns = new Discord.Collection();

// Import the commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// When the client is ready, run this code
// Will only occur once per login
client.once('ready', () => {
	console.log('Goon Bot is ready!');
});


// Event listener for commands
client.on('message', message => {
    // args variable to slice off the prefix and split the message into an array by spaces
    const args = message.content.slice(prefix.length).split(/ +/);
    // Takes the first element in the array and returns it while also removing it from the original array
    const commandName = args.shift().toLowerCase();

    // Initialize the command by either the name provided, or by an alias of the command
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // If the command was not found by name or alias, exit
    if (!command) {
        return;
    }

    // Only allow the commands to be executed inside servers (guilds)
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside direct messages.');
    }

    // Check that arguments for a command were provided and correctly used
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}.`;

        if (command.usage) {
            reply += `\nThe proper format is: \`${prefix}${command.name}${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    // Check if the cooldowns Collection has the command set in it
    // If not, then add it in
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);

    // Variable to get the necessary cooldown amount
    // If it is not provided, then it will default to 3
    const cooldownAmount = (command.cooldown || 3) * 100;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 100;
            return message.reply(`\`{command.name}\` can not be used for another ${timeLeft.toFixed(1)} seconds.`);
        }
    }

    // If the timestamps Collection doesn't have the message author's ID
    // .set() the author ID with the current timestamp and create a setTimeout() to automatically delete it after the cooldown
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Otherwise, we can try to execute the command
    try {
        command.execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command.');
    }
});

// Login to Discord with Goon Bot's token
client.login(token);