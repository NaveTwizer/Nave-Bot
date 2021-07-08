module.exports = {
    name: 'pfp',
    description: 'Get somebodys PFP or yourself',
    execute(message, args) {
        let target = message.mentions.users.first();


        if (target) { // user wants somebody else's PFP
            message.channel.send(target.displayAvatarURL({size: 4096, format: 'png'}));
        }else { // user wants his own PFP
            message.channel.send(message.author.displayAvatarURL({size: 4096, format: 'png'}));
        }
    }
}