module.exports = {
    name: 'say',
    description: 'Say any message using the bot',
    category: 'test',
    async execute(message, args) {

        if (!args[0]) return message.reply('Add message content!');
        let sentence = "";
        for (let i = 0; i < args.length; i++) {
            sentence += args[i] + ' ';
        }
        if (sentence.includes('@everyone')) return message.reply('Nice try buddy!');
        // to make sure nobody can ping @everyone using the bot
        await message.channel.send(sentence);
        if (message.guild.me.hasPermission('MANAGE_MESSAGES')) { // to make sure the bot can delete messages, if not keep the message
            message.delete();
        }
        
    }
}
