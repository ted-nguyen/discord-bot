/* eslint-disable indent */
module.exports = {
    name: 'role',
    description: 'Assign a role to user',
    args: true,
    usage: '<user><role>',
    execute(message, args) {
        // If no user is provided, they bot will show your avatar
        if(!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`;
        });

        message.channel.send(avatarList);
    },
};