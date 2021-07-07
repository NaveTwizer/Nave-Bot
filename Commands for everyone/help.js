module.exports = {
    name: 'help',
    description: 'help command',
    async execute(message, Discord) {
        let helpEmbed = new Discord.MessageEmbed()
        .setTitle('Commands list')
        .addFields(
            {name: 'Staff commands', value: '------------------'},
            {name: '$kick', value: '$kick @user Sending memes in general chat'},
            {name: '$ban', value: '$ban @user Sending minion memes in general chat'},
            {name: '$mute ', value: '$mute @user Shut.'},
            {name: '$unmute', value: '$unmute @user Unshut.'},
            {name: '$createrole', value: '$createrole <role name> <role hex color>'},
            {name: '$deleterole', value: '$deleterole @role or $deleterole <role ID>'},
            {name: '$cdelete', value: '$cdelete #channel-name'},
            {name: '$delete', value: '$delete <amount of messages>'},
            {name: 'Commands for everyone', value: '---------------'},
            {name: '$channels', value: 'Get channels info'},
            {name: '$coin', value: 'Flip a coin!'},
            {name: '$dm', value: '$dm @user <your message>'},
            {name: '$info', value: '$info @user'},
            {name: 'invite #chanenl-name', value: "Get server's invite to the current channel or mentioned channel"},
            {name: '$members', value: 'Shows info about the members'},
            {name: '$pfp @user', value: "Get someone's pfp"},
            {name: '$ping', value: 'Shows bot ping'},
            {name: '$roles', value: 'Shows info about roles'},
            {name: '$help2', value: 'Shows bot unique automated stuff!'}
        )
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setFooter(`Requested by ${message.author.tag}`)
        .setTimestamp()
        await message.channel.send(helpEmbed);
    } 
}