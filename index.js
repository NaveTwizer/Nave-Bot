const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const prefix = config.Prefix;
const token = config.Token;


// command handler thanks to CodeLyon on YouTube
// Video link: https://www.youtube.com/watch?v=AUOb9_aAk7U&t=401s
// channel link: https://www.youtube.com/channel/UC08G-UJT58SbkdmcOYyOQVw
const fs = require('fs');

client.commands = new Discord.Collection();
let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    let command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}



client.on('ready', () => {
    let serverCount = 0;
    client.guilds.cache.forEach(server => {
        serverCount++;
    });
    console.log('I am online');
    client.user.setPresence({
        'status': 'online',
        'activity': {
            name: `${serverCount} servers | mention me for help!`,
            type: 'WATCHING'
        }
    })
})

client.on('message', async (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.mentions.has(client.user)) {
        message.reply('My prefix for this server is: ``' + prefix + '`` | Use ' + prefix + 'help!')
    }
    if (!message.content.startsWith(prefix)) return;


    let args = message.content.slice(prefix.length).trim().split(' ');
    let runnedCommand = args.shift().toLowerCase();

    if (runnedCommand === 'ping') {
        client.commands.get('ping').execute(message, args, Discord);
    }
   else if (runnedCommand === 'delete') {
       client.commands.get('delete').execute(message, args)
   }
   else if (runnedCommand === 'coin') {
       client.commands.get('coin').execute(message);
   }
   else if (runnedCommand === 'dm') {
       client.commands.get('dm').execute(message, args);
   }
   else if (runnedCommand === 'info') {
       client.commands.get('info').execute(message,args, Discord);
   }
   else if (runnedCommand === 'serverinfo') {
       client.commands.get('serverinfo').execute(message, Discord);
   }
   else if (runnedCommand === 'pfp') {
       client.commands.get('pfp').execute(message, args);
   }
   else if (runnedCommand === 'kick') {
       client.commands.get('kick').execute(message, args);
   }
   else if (runnedCommand === 'ban') {
       client.commands.get('ban').execute(message, args);
   }
   else if (runnedCommand === 'mute') {
       client.commands.get('mute').execute(message, args);
   }
   else if (runnedCommand === 'unmute') {
       client.commands.get('unmute').execute(message, args);
   }
   else if (runnedCommand === 'members') {
    client.commands.get('members').execute(message, Discord);
   }
   else if (runnedCommand === 'roles') {
    client.commands.get('roles').execute(message, Discord);
   }
   else if (runnedCommand === 'channels') {
    client.commands.get('channels').execute(message, Discord);
   }
   else if (runnedCommand === 'cdelete') {
    client.commands.get('cdelete').execute(message, args);
   }
   else if (runnedCommand === 'invite') {
    client.commands.get('invite').execute(message, args);
}
   else if (runnedCommand === 'createrole') {
       client.commands.get('createrole').execute(message, args);
   }
   else if (runnedCommand === 'suggest') {
       client.commands.get('suggest').execute(message, args, Discord);
   }
   else if (runnedCommand === 'deleterole') {
       client.commands.get('deleterole').execute(message, args);
   }
   else if (runnedCommand === 'help') {
    client.commands.get('help').execute(message, Discord);
   }
   else if (runnedCommand === 'eval') {
    client.commands.get('eval').execute(message, args);
   }
   else if (runnedCommand === 'help2') {
       client.commands.get('help2').execute(message, Discord);
   }
   else return;
});





client.on('messageUpdate', async (oldMessage, newMessage) => {
    if (oldMessage.content === newMessage.content) return;
    let channel = oldMessage.guild.channels.cache.find(channelo => channelo.name === 'message-logs');
    if (!channel) return;
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
client.on('guildMemberAdd', async (member) => {
    let channel = member.guild.channels.cache.find(channelo => channelo.name === 'members-logs');
    if (!channel) return;
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
client.on('messageDelete', async (message) => {
    let channel = message.guild.channels.cache.find(channelo => channelo.name === 'message-logs');
    if (!channel) return;
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

client.login(token);
