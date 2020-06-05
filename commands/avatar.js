/* eslint-disable indent */
module.exports = {
    name: 'avatar',
    description: 'Provides a URL to the avatar image or gif of the user.',
    args: true,
    aliases: ['icon', 'pfp'],
    execute(message, args) {
        // If no user is provided, the bot will show your avatar
        if(!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`;
        });

        message.channel.send(avatarList);
    },
};