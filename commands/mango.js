/* eslint-disable indent */
module.exports = {
    name: 'mango',
    description: 'Sends a picture of a mango!',
    cooldown: 2,
    execute(message, args) {
        message.channel.send('Look at how tasty this mango looks :drooling_face:', { files: ['./images/mango.jpg'] });
    },
};