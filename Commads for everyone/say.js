module.exports = {
    name: 'say',
    description: 'Say any message using the bot',
    async execute(message, args) {

        if (!args[0]) return message.reply('Add message content!');
        let sentence = "";
        for (let i = 0; i < args.length; i++) {
            sentence += args[i] + ' ';
        }
        await message.channel.send(sentence);
        message.delete();
    }
}