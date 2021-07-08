const Discord = require('discord.js'); // import discord.js
const client = new Discord.Client();
const config = require('./config.json'); // private file that contains the prefix and the token (token is hidden ofc)
const prefix = config.Prefix;
const token = config.Token;


// command handler thanks to CodeLyon on YouTube
// Video link: https://www.youtube.com/watch?v=AUOb9_aAk7U&t=401s
// channel link: https://www.youtube.com/channel/UC08G-UJT58SbkdmcOYyOQVw
// this way each command has it's own file and it's much more organized UwU
const fs = require('fs');

client.commands = new Discord.Collection();
let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    let command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}



client.on('ready', () => { // this event being fired ONCE the bot comes online

    let serverCount = 0; // bot servers count
    let totalMembersCount = 0; // shows how much users there are on all of the bot's servers
    client.guilds.cache.forEach(server => {
        serverCount++;
        totalMembersCount += server.memberCount;
    });
    console.log('I am online');
    client.user.setPresence({ // set bot's activity type and custom status
        'status': 'online',
        'activity': {
            type: 'WATCHING',
            name: `${totalMembersCount} users in ${serverCount} servers! | mention me for help!`
            // watching X users in Y servers! | mention me for help!
        }
    })
})

client.on('message', async (message) => { // this event being fired every time the bot sees a message
    if (!message.guild) return; // skip DM messages 
    if (!message.guild.me.hasPermission('SEND_MESSAGES')) return; // to not cause errors, delete messages is the minimal perms required.
    if (message.author.bot) return; // skip other bot's messages
    if (message.mentions.has(client.user)) { // if someone mentions the bot in the message
        return message.reply('My prefix for this server is: ``' + prefix + '`` | Use ' + prefix + 'help!');// example: @⚡ Nave ⚡, My prefix for this server is: $ | Use $help!
    }
    if (!message.content.startsWith(prefix)) return; // if the message is not related to the bot skip it

    let args = message.content.slice(prefix.length).trim().split(' '); // array that contains the other words of the message
    let runnedCommand = args.shift().toLowerCase(); // the word that is attached to the prefix ie $coin, runnedCommand will be coin

    if (runnedCommand === 'ping') {
        client.commands.get('ping').execute(message, Discord); // call the ping command and send 2 variables, the message, and Discord (to make embed message)
    }
   else if (runnedCommand === 'delete') {
       client.commands.get('delete').execute(message, args); // no need embed message here
   }
   else if (runnedCommand === 'coin') {
       client.commands.get('coin').execute(message); // no need for args or Discord
   }
   else if (runnedCommand === 'dm') {
       client.commands.get('dm').execute(message, args); // no need Discord because embed message is not needed
   }
   else if (runnedCommand === 'info') {
       client.commands.get('info').execute(message,args, Discord); // need everything
   }
   else if (runnedCommand === 'serverinfo') {
       client.commands.get('serverinfo').execute(message, Discord); // no need args here
   }
   else if (runnedCommand === 'pfp') {
       client.commands.get('pfp').execute(message, args); // no need Discord, no need embed message
   }
   else if (runnedCommand === 'kick') {
       client.commands.get('kick').execute(message, args); // no need embed message
   }
   else if (runnedCommand === 'ban') {
       client.commands.get('ban').execute(message, args); // no need embed message
   }
   else if (runnedCommand === 'mute') {
       client.commands.get('mute').execute(message, args); // no need embed message
   }
   else if (runnedCommand === 'unmute') {
       client.commands.get('unmute').execute(message, args); // no need embed message
   }
   else if (runnedCommand === 'members') {
    client.commands.get('members').execute(message, Discord); // no need args here
   }
   else if (runnedCommand === 'roles') {
    client.commands.get('roles').execute(message, Discord); // no need args here
   }
   else if (runnedCommand === 'channels') {
    client.commands.get('channels').execute(message, Discord); // no need args here
   }
   else if (runnedCommand === 'cdelete') {
    client.commands.get('cdelete').execute(message, args); // no need to create embed message
   }
   else if (runnedCommand === 'invite') {
    client.commands.get('invite').execute(message, args); // no need to create embed message
}
   else if (runnedCommand === 'createrole') {
       client.commands.get('createrole').execute(message, args); // no need to create embed message
   }
   else if (runnedCommand === 'suggest') {
       client.commands.get('suggest').execute(message, args, Discord); // need everything
   }
   else if (runnedCommand === 'deleterole') {
       client.commands.get('deleterole').execute(message, args); // no need Discord, no embed message needed
   }
   else if (runnedCommand === 'help') {
    client.commands.get('help').execute(message, Discord); // no need args here
   }
   else if (runnedCommand === 'eval') {
    client.commands.get('eval').execute(message, args); // no need Discord, no embed message needed
   }
   else if (runnedCommand === 'help2') {
       client.commands.get('help2').execute(message, Discord); // no need args here
   }
   else if (runnedCommand === 'say') {
       client.commands.get('say').execute(message, args); // no need embed here
   }
   else return; // if command not found just skip it
});





client.on('messageUpdate', async (oldMessage, newMessage) => { // this event is being executed when a member edits his message
    if (oldMessage.content === newMessage.content) return;
    let channel = oldMessage.guild.channels.cache.find(channelo => channelo.name === 'message-logs'); // searches for a channel named EXACTLY "messages-logs"
    if (!channel) return; // if there is no channel called message-logs return
    let editedEmbed = new Discord.MessageEmbed()
    .setAuthor(oldMessage.author.tag)
    .setThumbnail(oldMessage.author.displayAvatarURL({dynamic: true}))
    .addFields(
        {name: 'Message edited', value: `Message edited in ${oldMessage.channel.name}`},
        {name: 'Message edited by', value: `${oldMessage.author.tag}`},
        {name: 'Old message', value: oldMessage},
        {name: 'New message', value: newMessage}
    )
    await channel.send(editedEmbed);
})





client.on('guildMemberAdd', async (member) => { // this event is being fired every time a new member joins any server the bot is in
    let channel = member.guild.channels.cache.find(channelo => channelo.name === 'members-logs'); // searhes for a channel named EXACTLY "members-logs"
    if (!channel) return; // if channel does not exist on the server, return
    let joinEmbed = new Discord.MessageEmbed()
    .setTitle('New join!')
    .addFields(
        {name: 'User joined', value: `${member.user.tag}`},
        {name: 'User created at', value: `${member.user.createdAt.toDateString()}`},
        {name: 'Is bot', value: `${member.user.bot}`}
    )
    .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
    await channel.send(`Welcome <@${member.id}> to ${member.guild.name}!`);
    channel.send(joinEmbed);
})




client.on('messageDelete', async (message) => { // this event is being fired every time a message is being deleted
    let channel = message.guild.channels.cache.find(channelo => channelo.name === 'message-logs'); // searches for a channel named EXACTLY "message-logs"
    if (!channel) return; // if channel does not exist on the server, return
    let deletedEmbed = new Discord.MessageEmbed()
    .setAuthor('Message deletion')
    .addFields(
        {name: 'Message notification', value: `Message deleted in ${message.channel.name}`},
        {name: 'Message author', value: `${message.author}`},
        {name: 'Message content', value: `${message}`}
    )
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    .setFooter(`Message notification`)
    .setTimestamp()
    await channel.send(deletedEmbed);
})

client.login(token); // log in with your bot's token
