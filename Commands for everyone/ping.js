module.exports = {
    name: 'ping',
    description: 'Just send a ping',
    async execute(message, args, Discord) {
        message.reply('Calculating..').then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp;
            let pingEmbed = new Discord.MessageEmbed()
            .setAuthor(`Ping: ${ping}`)
            m.edit(pingEmbed);
        })
    }
}