module.exports = {
    name: 'ban',
    description: 'Bans a member',
    async execute(message, args) {

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You can not use this command.');
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('I do not have the ``ban members`` permission');
        let target = message.mentions.members.first();
        if (!target) return message.reply('Mention someone to ban them!');
        if (target.id === '810902545794596914') return message.reply('Why are you trying to kick me? :('); // the bot's ID
        if (target.id === message.author.id) return message.reply('You know you can not ban yourself right...?');
        
        
        if (target.bannable) {
            let reason = "";
            for (let i = 1; i < args.length; i++) {
                reason += args[i] + ' ';
            }
            if (!reason) reason = "No reason provided";
            message.channel.send(`${target.user.tag} has been banned by ${message.author} due to ${reason}`);
            await target.ban();
        }else {
            message.reply('I am unable to ban this user.');
        }
    }
}
