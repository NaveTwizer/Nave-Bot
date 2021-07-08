module.exports = {
    name: 'info',
    description: 'Shows info about other user or yourself',
    async execute(message, args, Discord) {
        let target = message.mentions.members.first(); 
        let Count = 0; // role count of the member
        let roleStr = ""; // will be the list of all the user's roles 

        if (target) { // user wants to show info about somebody else
            target.roles.cache.forEach(role => {
                if (role.name === '@everyone') { // @everyone is considered a role for some reason
                    return;
                }
                roleStr += role.name + ', ';
                Count++;
            });
            if (Count === 0) roleStr = "None"; // to avoid sending an empty message which will cause an error, user has no roles
            
            let infoEmbed = new Discord.MessageEmbed()
            .addFields(
                {name: '▫️ Username', value: `${target.user.username}`},
                {name: '▫️ User ID', value: `${target.user.id}`},
                {name: '▫️ Created at', value: `${target.user.createdAt.toDateString()}`},
                {name: '▫️ Joined at', value: `${target.joinedAt.toDateString()}`},
                {name: '▫️ Is bot', value: `${target.user.bot}`},
                {name: "▫️ User's highest role", value: `${target.roles.highest}`},
                {name: '▫️ Role count', value: Count},
                {name: '▫️ User roles', value: roleStr}
            )
            .setFooter(`Requested by ${message.author.tag}`)
            .setTimestamp()
            .setThumbnail(target.user.displayAvatarURL({dynamic: true}))
            await message.channel.send(infoEmbed);
        }
        else { // user wants to get inf about himself
            message.member.roles.cache.forEach(role => {
                if (role.name === '@everyone') {
                    return;
                }
                roleStr += role.name + ', ';
                Count++;
            });
            if (Count === 0) roleStr = "None";

            let infoEmbed = new Discord.MessageEmbed()
            .addFields(
                {name: '▫️ Username', value: `${message.author.username}`},
                {name: '▫️ User ID', value: `${message.author.id}`},
                {name: '▫️ Joined at', value: `${message.member.joinedAt.toDateString()}`},
                {name: '▫️ Created at', value: `${message.author.createdAt.toDateString()}`},
                {name: '▫️ Is bot', value: `${message.author.bot}`},
                {name: "▫️ User's highest role", value: `${message.member.roles.highest}`},
                {name: '▫️ Role count', value: Count},
                {name: '▫️ Role list', value: roleStr}
            )
            .setFooter(`Requested by ${message.author.tag}`)
            .setTimestamp()
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            await message.channel.send(infoEmbed);
        }
    }
}