module.exports = {
    name: 'roles',
    description: 'Sends all roles in embed message',
    async execute(message, Discord) {
        let roleString = "";
        let roleCount = -1; // it also counts @everyone as a role for some reason so started from -1
        message.guild.roles.cache.forEach(role => { // loop that goes for each role on the server
            roleCount++;
            roleString += role.name + ', ';
        });
        let rolesEmbed = new Discord.MessageEmbed()
        .setThumbnail(message.guild.iconURL())
        .addFields(
            {name: 'Roles info for the server', value: `${message.guild.name}`},
            {name: 'Role count', value: roleCount},
            {name: 'Highest role', value: `${message.guild.roles.highest}`},
            {name: 'All roles', value: roleString}
        )
        .setFooter(`Requested by ${message.author.tag}`)
        .setTimestamp()
        await message.channel.send(rolesEmbed);
    }
}