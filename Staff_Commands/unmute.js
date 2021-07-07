module.exports = {
    name: 'unmute',
    description: 'unmutes a user',
    async execute(message, args) {
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('You can not use this command!');
        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('I do not have the ``manage roles`` permission!');
        let target = message.mentions.members.first();
        if (!target) return message.reply('Mention someone to unmute them!');

        let mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!mutedRole) return message.reply('There is no muted role in this server!');
        if (target.roles.cache.has(mutedRole.id)) {
            target.roles.remove(mutedRole);
            await message.channel.send(`${target.user.tag} has been unmuted!`);
        }else {
            message.reply('This user is not muted!');
        }
    }
}