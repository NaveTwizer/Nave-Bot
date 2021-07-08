module.exports = {
    name: 'channels',
    description: 'Get info on all channels on the server',
    async execute(message, Discord) {
        let textChannelCount = 0; // shows how much text channels are there
        let voiceChannelCount = 0; // shows how much VC's are there

        message.guild.channels.cache.forEach(channel => { // loop that goes for each channel on the server
            if (channel.type === 'text') {
                textChannelCount++;
            }
            else if (channel.type === 'voice') {
                voiceChannelCount++;
            }
        });
        let channelsEmbed = new Discord.MessageEmbed() // set up embed message uwu
        .addFields(
            {name: 'Channels info for the server', value: `${message.guild.name}`},
            {name: 'Text channels', value: textChannelCount},
            {name: 'Voice channels', value: voiceChannelCount}
        )
        .setThumbnail(message.guild.iconURL())
        .setFooter(`Requesetd by ${message.author.tag}`)
        .setTimestamp()
        await message.channel.send(channelsEmbed);
    }
}
