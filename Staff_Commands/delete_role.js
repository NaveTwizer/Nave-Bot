module.exports = {
    name: 'deleterole',
    description: 'Deletes a role that is mentioned or by ID',
    async execute(message, args) {
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('You can not use this command.');
        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('I do not have the ``manage roles`` permission!');

        let role = message.mentions.roles.first();
        if (role) {
            await role.delete();
            message.reply(`${role.name} has been deleted!`);
        }else {
            if (!args[0]) return message.reply("Please mention the role or provide it's ID.");
            let roleID = args[0];
            let role2 = message.guild.roles.cache.get(roleID);
            if (!role2) return message.reply('Role not found!');
            try {
                await role2.delete();
                message.reply(`${role2.name} has been deleted!`);   
            } catch (error) {
                message.reply(error);
            }
        }
    }
}