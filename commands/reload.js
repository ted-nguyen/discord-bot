/* eslint-disable indent */
module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    execute(message, args) {
        if(!args.length) {
            return message.channel.send(`You didn't pass any command to reload, ${message.author}!`);
        }
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
            return message.channel.send(`I don't know a command with name or alias \`${commandName}\`, ${message.author}.`);
        }

        // Remove the command file from the cache
        delete require.cache[require.resolve(`./${command.name}.js`)];
        // Then require the file again and add the freshly loaded command to client.commands
        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Command \`${command.name}\` was reloaded successfully!`);
        }
        catch (error) {
            console.log(error);
            message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        }
    },
};