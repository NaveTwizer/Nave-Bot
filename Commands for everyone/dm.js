module.exports = {
    name: 'dm',
    description: 'Dm any user a message or yourself',
    async execute(message, args) {
        let target = message.mentions.users.first();
        let sentence = "";

        if (target) {
            if (!args[1]) return message.reply('Add message content!');
            for (let i = 1; i < args.length; i++) {
                sentence += args[i] + ' ';
            }
            sentence += `\nThis message was sent by ${message.author}`;
            target.send(sentence)

        }else {
            if (!args[0]) return message.reply('Add message content!');
            for (let i = 0; i < args.length; i++) {
                sentence += args[i] + ' ';
            }
            message.author.send(sentence);
            await message.react('✅');
        }
    }
}