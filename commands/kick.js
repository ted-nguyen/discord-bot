/* eslint-disable indent */
module.exports = {
    name: 'kick',
    description: 'Kick user from the server.',
    args: true,
    guildOnly: true,
    execute(message, args) {
        // If the user didn't specify someone, let them know
        if (!message.mentions.users.size) {
            return message.reply('You need to tag a user if you wanted them to be kicked!');
        }
        const taggedUser = message.mentions.users.first();

        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    },
};