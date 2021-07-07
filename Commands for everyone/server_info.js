module.exports = {
    name: 'serverinfo',
    description: 'Shows server info',
    async execute(message, Discord) {
        let serverEmbed = new Discord.MessageEmbed()
        .addFields(
            {name: '▫️ Server name', value: `${message.guild.name}`},
            {name: '▫️ Server ID', value: `${message.guild.id}`},
            {name: '▫️ Owner', value: `${message.guild.owner.user.tag}`},
            {name: '▫️ Owner ID', value: `${message.guild.owner.id}`},
            {name: '▫️ Member count', value: `${message.guild.memberCount}`},
            {name: '▫️ Highest role', value: `${message.guild.roles.highest.name}`},
            {name: '▫️ Server region', value: `${message.guild.region}`},
            {name: '▫️ Server creation date', value: `${message.guild.createdAt.toDateString()}`}
        )
        .setFooter(`Requested by ${message.author.tag}`)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL())
        await message.channel.send(serverEmbed);
    }
}