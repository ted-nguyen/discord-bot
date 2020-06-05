/* eslint-disable indent */
module.exports = {
    name: 'clear',
    description: 'Clear between 1 and 100 messages (that are not older than 2 weeks).',
    args: true,
    // guildOnly: true,
    execute(message, args) {
        const count = parseInt(args[0]) + 1;

        if (isNaN(count)) {
            return message.reply('That doesn\t look like a number to me...');
        }
        else if (count <= 1 || count > 101) {
            return message.reply('You can only delete between 1 and 99 messages at a time');
        }

        message.channel.bulkDelete(count, true).catch(err => {
            console.error(err);
            message.channel.send('Sorry! There was an error trying to delete messages in this channel.');
        });
    },
};