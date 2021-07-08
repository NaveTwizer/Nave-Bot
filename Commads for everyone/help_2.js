module.exports = {
    name: 'help2',
    description: 'Shows bot automated tasks',
    async execute(message, Discord) {
        let helpEmbed = new Discord.MessageEmbed()
        .setTitle('Automated tasks')
        .addFields(
            {name: 'Important note', value: 'You MUST create those channels with this exact name!'},
            {name: '#message-logs', value: 'Channel that records any deletion or adjustment of a message'},
            {name: '#members-logs', value: 'A welcome / goodbye channel'},
            {name: 'Coming soon', value: 'More to come!'}
        )
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setFooter(`Requested by ${message.author.tag}`)
        .setTimestamp()
        await message.channel.send(helpEmbed);
    } 
}