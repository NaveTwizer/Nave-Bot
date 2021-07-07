module.exports = {
    name: 'delete',
    description: 'Deletes messages!',
    async execute(message, args) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You can not use this command.');
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('I do not have the ``manage messages`` permission!');
        if (!args[0]) return message.reply('Add amount of messages to delete!');

        let deleteCount = parseInt(args[0]);
        deleteCount += 1;


        await message.channel.bulkDelete(deleteCount);

    }
}