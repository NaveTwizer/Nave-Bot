module.exports = {
    name: 'mute',
    description: 'Mutes a member',
    async execute(message, args) {

        if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('You can not use this command.');
        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('I do not have the ``manage roles`` permission!');
        let target = message.mentions.members.first();
        if (!target) return message.reply('Mention someone to mute him!');
        let mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (mutedRole) {
            if (target.roles.cache.has(mutedRole.id)) return message.reply('This user is already muted!');
            await target.roles.add(mutedRole);
            let reason = "";
            for (let i = 1; i < args.length; i++) {
                reason += args[i] + ' ';
            }
            if (!reason) reason = "No reason provided";
            message.channel.send(`${target.user.tag} has been muted by ${message.author} due to ${reason}`);
        }else {
            let reason = "";
            for (let i = 1; i < args.length; i++) {
                reason += args[i] + ' ';
            }
            if (!reason) reason = "No reason provided";
            let newMutedRole = await message.guild.roles.create({
                'data': {
                    'name': 'Muted',
                    'color': 'BLACK',
                    'mentionable': false,
                    'permissions': []
                  }
            })
            try {
              message.guild.channels.cache.forEach(channel => {
                if (channel.type === 'text') {
                 channel.updateOverwrite(newMutedRole, {
                    'SEND_MESSAGES': false,
                    'ADD_REACTIONS': false
                    })   
             }
             target.roles.add(newMutedRole);
            });   
            message.channel.send(`A new muted role has been assigned to ${target.user.tag} by ${message.author} due to ${reason}`);
            }catch(error) {
                message.reply(error);
            }
           
        }
    }
}