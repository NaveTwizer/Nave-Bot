module.exports = {
    name: 'ping',
    description: 'Sends the bots ping',
    async execute(message, Discord) {
        message.reply('Calculating..').then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp;
            let pingEmbed = new Discord.MessageEmbed()
            .setAuthor(`Ping: ${ping}`)
            m.edit(pingEmbed);
        })
    }
}