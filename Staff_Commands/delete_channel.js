module.exports = {
    name: 'cdelete',
    description: 'Deletes a channel',
    async execute(message, args) {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('You can not use this command.');
        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.reply('I do not have the ``manage channels`` permission!');
        let channel = message.mentions.channels.first();
        if (!channel) return message.reply('Please mention a channel to delete!');
        try {
            await channel.delete();
            message.channel.send(`${channel.name} has been deleted by ${message.author}!`);
        }catch(error) {
            message.reply(error);
        }
    }
}