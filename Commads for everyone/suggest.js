const { DiscordAPIError } = require("discord.js");

module.exports = {
    name: 'suggest',
    description: 'Sends a suggestion to the suggestion channel',
    async execute(message, args, Discord) {
        let channel = message.guild.channels.cache.find(channelo => channelo.name === 'suggestions'); // searches for a channel named exactly "suggestions"
        if (!channel) return message.reply('Create a channel named ``suggestions`` to enable this feature!'); // no channel named "suggesstions" was found on the server.
        let suggestion = "";
        if (!args[0]) return message.reply('Add your suggestion!'); // user just did $suggest without adding his suggestion smh
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
            if (message.guild.me.hasPermission('ADD_REACTIONS')) { // to make sure the bot can add reactions
                msg.react('✅');
                msg.react('❌');
            }
            else {
                // just do nothing
            }
        });
        message.reply('Your suggestion has been sent to the suggestion channel!');
    }
}
