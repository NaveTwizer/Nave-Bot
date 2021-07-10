module.exports = {
    name: 'kick',
    description: 'Kicks a member',
    async execute(message, args, Cat) {
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
            if (message.guild.me.hasPermission('ADD_REACTIONS')) { // a bonus confirm level if the bot has perms to react
                message.reply(`Confirm kicking ${target.user.username}`).then(async (msg) => {
                const emoji = await Cat.Confirmation(msg, message.author, ["✅", "❌"], 30000);
        
        
                if (emoji === '✅') {
                    await target.kick();
                    message.reply(`${target.user.username} has been kicked by ${message.author} due to ${reason}`);
                }else {
                    message.reply('Process is cancelled.');
                }
            })
        }
            else { // just kick without confirming
                await target.kick();
                message.channel.send(`${target.user.username} has been kicked by ${message.author} due to ${reason}`);
            }

        }else {
            message.reply('I am unable to kick this user!');
        }
        
    }
}
