/* eslint-disable indent */
module.exports = {
    name: 'info',
    description: 'Information  about the arguments provided.',
    args: true,
    execute(message, args) {
        if (args[0] === 'kick') {
            return message.channel.send(`Command name: ${args[0]}\nNumber of arguments: 1\nArgument: User @mentioned`);
        }

        message.channel.send(`Arguments: ${args}`);
    },
};