module.exports = {
    name: 'members',
    description: 'Shows human count and bots count',
    async execute(message, Discord) {
        let botCount = 0;
       let humanCount = 0;
       let botListString = "";
       message.guild.members.cache.forEach(member => {
           if (member.user.bot) {
               botCount ++;
               botListString += member.user.username + ', ';
           }else {
               humanCount++;
           }
       });
       let membersEmbed = new Discord.MessageEmbed()
       .addFields(
           {name: 'Total members', value: `${message.guild.memberCount}`},
           {name: 'Humans count', value: humanCount},
           {name: 'Bots count', value: botCount},
           {name: 'Bot list', value: botListString}
       )
       .setFooter(`Requested by ${message.author.tag}`)
       .setTimestamp()
       .setThumbnail(message.guild.iconURL())
       await message.channel.send(membersEmbed);
    }
}