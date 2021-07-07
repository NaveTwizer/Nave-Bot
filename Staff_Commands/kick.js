module.exports = {
    name: 'kick',
    description: 'Kicks a member',
    async execute(message, args) {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You can not use this command.');
        if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('I do not have the ``kick members`` permission!');

        
        let target = message.mentions.members.first();
        let reason = "";
        
        if (!target) return message.reply('Mention someone to kick him!');
        if (target.id === '810902545794596914') return message.reply('Why are you trying to kick me? :(');
        if (target.id === message.author.id) return message.reply('You know you can not kick yourself right...?');

        for (let i = 1; i < args.length; i++) {
            reason += args[i] + ' ';
        }
        if (!reason) reason = "No reason provided";
        if (target.kickable) {
            await target.kick();
            message.channel.send(`${target.user.username} has been kicked by ${message.author} due to ${reason}`);
        }else {
            message.reply('I am unable to kick this user!');
        }
        
    }
}