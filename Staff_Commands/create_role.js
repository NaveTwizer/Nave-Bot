module.exports = {
    name: 'createrole',
    description: 'Creates a role with a color given by the user',
    async execute(message, args) {
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('You can not use this command.');
        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('I do have have the ``manage roles`` permission!');
        if (!args[0]) return message.reply("Provide the new role's name!");
        if (!args[args.length - 1].startsWith('#')) return message.reply('Command format: ``$createrole role name #HexColor``');
        let roleName = "";
        for (let i = 0; i < args.length - 1; i++) {
            roleName += args[i] + ' ';
        }
        let newRole = await message.guild.roles.create({
            'data': {
                'color': args[args.length - 1],
                'name': roleName,
            },
            'reason': 'New role command'
        })
        message.reply(`Created ${roleName} and set it's color to be ${args[args.length - 1]}!`);
    }
}