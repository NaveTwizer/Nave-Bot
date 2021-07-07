const { DiscordAPIError } = require("discord.js");

module.exports = {
    name: 'suggest',
    description: 'Sends a suggestion to the suggestion channel',
    async execute(message, args, Discord) {
        let channel = message.guild.channels.cache.find(channelo => channelo.name === 'suggestions');
        if (!channel) return message.reply('Create a channel named ``suggestions`` to enable this feature!');
        let suggestion = "";
        if (!args[0]) return message.reply('Add your suggestion!');
        for (let i = 0; i < args.length; i++) {
            suggestion += args[i] + ' ';
        }
        let suggestionEmbed = new Discord.MessageEmbed()
        .setAuthor('New suggestion!')
        .addFields(
            {name: 'New suggestion', value: suggestion},
            {name: 'Suggested by', value: `${message.author.tag}`}
        )
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setFooter(`Suggestion by ${message.author.tag}`)
        .setTimestamp()
        await channel.send(suggestionEmbed).then(msg => {
            msg.react('✅');
            msg.react('❌');
        });
        message.reply('Your suggestion has been sent to the suggestion channel!');
    }
}