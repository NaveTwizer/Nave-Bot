const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const { inspect } = require('util');
const config = require('./config.json');
const botToken = config.token;

let prefix = "!";
let command;
let args;
let i; // for loops
let embedMessage;  // any embed message
let prefixes;
let coin; // coin flip command
let deleteCount;
let sentence; // dm command
let target; // user target
let targetMember; // kick ban command
let ModlogChannel;


client.on('ready', () => {
    console.log('I am online');
    client.user.setActivity('with your feelings');
})

client.on('message',async (message) => {
    if (message.channel.type == 'dm') return;
    if (!message.guild.me.hasPermission('SEND_MESSAGES')) return;
    
    prefixes = db.fetch(`prefix_${message.guild.id}`);
  if (prefixes == null) {
    prefix = "!";
  }
  else {
    prefix = prefixes;
  }
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return; 
    prefixes = db.fetch(`prefix_${message.guild.id}`);
  if (prefixes == null) {
    prefix = "!";
  }
  else {
    prefix = prefixes;
  }
  args = message.content.slice(prefix.length).trim().split(' ');
  command = args.shift().toLowerCase();

if (command === "setprefix") {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You need admins perms to use this command!');
    if (!args[0]) return message.reply('Define a new prefix!');
    db.set(`prefix_${message.guild.id}`, args[0]);
    message.reply(`The prefix has succesfully changed to ${args[0]} :tada:`).catch(error => {
      console.error(error);
    })
}
else if (command === "coin" ||command === "coinflip") {
    coin = Math.floor(Math.random() * 2 + 1);
    if (coin === 1) message.reply('Your coin landed on **TAILS**!').catch(error => {console.error(error)})
    else if (coin === 2) message.reply('Your coin landed on **HEADS**!').catch(error => {console.error(error)})
}
else if (command === "delete") {
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You can not use this command!');
  if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('I can not delete messages!');
  deleteCount = parseInt(args[0]);
  if (!deleteCount || deleteCount < 1 || deleteCount > 100) return message.reply('Enter a valid amount of messages to delete!');
  message.channel.bulkDelete(deleteCount + 1).catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
}
else if (command === "dm") {
  target = message.mentions.users.first();
  sentence = "";
  if (target) {
    if (!args[1]){
      message.reply('Add message content!'); // args[0] is the mentioned user so used args[1]
      await message.react('❌'); 
      return;
    } 
    for (i = 1; i < args.length; i++) {
      sentence += args[i] + ' ';
    }
    sentence += `\nThis message was sent by: ${message.author}`;
    target.send(sentence).catch(error => message.reply('Could not DM them due to: ' + error));
    await message.react('✅');//✅
  }
  else {
    if (!args[0]) {
      message.reply('Add message content!');
      await message.react('❌');
      return;
    }
    for (i = 0; i < args.length; i++) {
      sentence += args[i] + ' ';
    }
    message.author.send(sentence)
    await message.react('✅');//✅
  }
}
else if (command === "pfp") {
  target = message.mentions.users.first();
  if (target) {
    message.channel.send(`${target.avatarURL()}`);
  }
  else {
    message.channel.send(`${message.author.avatarURL()}`);
  }
}
else if (command === "kick") {
  target = message.mentions.users.first();
  if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You can not use this command!');
  if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('I do not have perms to kick!');
  if (!target) return message.reply('Mention someone to kick him!');
  if (target.id === '810902545794596914') return message.reply(`Why are you tryin to kick me? :(`);
  if (target.id === message.author.id) return message.reply('Why are you trying to kick yourself...?'); 
  sentence = "";
  for (i = 1; i < args.length; i++) {
    sentence += args[i] + ' ';
  }
  targetMember = message.guild.members.cache.get(target.id);
  if (!targetMember.kickable) return message.reply('I can not kick this user!');
  else {
    targetMember.kick();
    await message.channel.send(`**${target.username}** has been kicked by **${message.author}** due to: "${sentence}"`);
    target.send(`You were kicked from ${message.guild.name} due to: ${sentence}`);
  }
}
else if (command === "ban") {
  target = message.mentions.users.first();
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply("You can not use this command!");
  if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply("I do not have perms to ban!");
  if (!target) return message.reply('Mention someone to ban him!');
  if (target.id === '810902545794596914') return message.reply('Why are you trying to ban me? :('); 
  if (target.id === message.author.id) return message.reply('Why are you tring to ban yourself...?');
  sentence = "";
  for (i = 1; i < args.length; i++) {
    sentence += args[i] + ' ';
  }
  targetMember = message.guild.members.cache.get(target.id);
  if (!targetMember.bannable) return message.reply("I can not ban this user!");
  targetMember.ban();
  if (sentence == "") sentence = "No reason provided";
  await message.channel.send(`**${target.username}** has been banned by **${message.author}** due to: "${sentence}"`);
  target.send(`You were banned from ${message.guild.name} due to: "${sentence}"`)
}
else if (command === "serverinfo") {
  embedMessage = new Discord.MessageEmbed()
  .setAuthor(`Requested by ${message.author.username}`)
  .addFields(
    {name: "Server name", value: `${message.guild.name}`},
    {name: "Server ID", value: `${message.guild.id}`},
    {name: "Server owner", value: `${message.guild.owner.user.tag}`},
    {name: "Owner ID", value: `${message.guild.owner.id}`},
    {name: "Member count", value: `${message.guild.memberCount}`},
    {name: "Highest role", value: `${message.guild.roles.highest}`},
    {name: "Server region", value: `${message.guild.region}`},
    {name: "Server creation date", value: `${message.guild.createdAt.toDateString()}`},
  )
  .setThumbnail(message.guild.iconURL())
  await message.channel.send(embedMessage);
}
else if (command === "cdelete") {
  target = message.mentions.channels.first();
  if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('You can not use this command!');
  if (!target) return message.reply('Mention a chanenl to delete it!');
  if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.reply('I do not have perms to delete channels!');

  targetMember = message.guild.channels.cache.get(target.id);
  targetMember.delete()
  .catch(error => {
    console.error(error);
    return;
  })
  message.channel.send(`**${targetMember.name}** has been deleted by ${message.author}`);
  message.react('✅');
}
else if (command === "info") {
  target = message.mentions.members.first();
  if (target) {
    targetMember = client.users.cache.get(target.id)
    embedMessage = new Discord.MessageEmbed()
    .setAuthor(`${target.user.username}'s info`)
    .addFields(
      {name: 'Username', value: `${target.user.tag}`},
      {name: 'User ID', value: `${target.user.id}`},
      {name: 'Created at', value: `${target.user.createdAt.toDateString()}`},
      {name: 'Is bot', value: `${targetMember.bot}`},
      {name: 'User status', value: `${targetMember.presence.status}`},
      {name: "User joined at", value: `${target.joinedAt.toDateString()}`},
      {name: "User's highest role", value: `${target.roles.highest}`}
    )
    .setThumbnail(target.user.displayAvatarURL({dynamic: true}))
    await message.channel.send(embedMessage);
  }
  else {
    targetMember = client.users.cache.get(message.author.id);
    embedMessage = new Discord.MessageEmbed()
    .addFields(
      {name: 'Username', value: `${message.author.tag}`},
      {name: 'User ID', value: `${message.author.id}`},
      {name: 'Created at', value: `${message.author.createdAt.toDateString()}`},
      {name: 'Is bot', value: `${message.author.bot}`},
      {name: 'User status', value: `${message.author.presence.status}`},
      {name: 'User joined at', value: `${message.member.joinedAt.toDateString()}`},
      {name: "User's highest role", value: `${message.member.roles.highest}`}
    )
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    await message.channel.send(embedMessage);
  }
}
else if (command === "servers") {
  embedMessage = new Discord.MessageEmbed()

  client.guilds.cache.forEach(guild => {
    message.channel.send(`Guild name: ${guild.name}, guild ID: ${guild.id}`);
  })  
}
else if (command === "ping") {
  message.channel.send('Calculating...')
  .then(m => {
    //let ping = m.createdTimeStamp - message.createdTimestamp;
    embedMessage = new Discord.MessageEmbed()
    .setAuthor(`Ping: ${m.createdTimestamp - message.createdTimestamp}`)
    m.edit(embedMessage);
  })
}
else if (command === "test") {
  message.channel.send('Testing...')
  .then(async m => {
    m.react('❎');     

    setTimeout(() => {
      //let testing = new Discord.ReactionCollector(message, )
    }, 5000);
  })
}
else if (command === "embed"){
  embedMessage = new Discord.MessageEmbed()
  .addFields(
    {name: 'Field one', value: '1'},
    {name: 'Field 2', value: '2'}
  )
  .setFooter('test')
  .setTimestamp()
  await message.channel.send(embedMessage);
  
}

else if (command === "help") {
  embedMessage = new Discord.MessageEmbed()
  .setTitle('Commands list')
  .setAuthor(`Requested by ${message.author.tag}`)
  .addFields(
    {name: 'Admin Commands', value:'--------------------------'},
    {name: `${prefix}setprefix`, value: "Change the server's prefix"},
    {name: `${prefix}cdelete #channel-name`, value: 'Delete a channel'},
    {name: "Moderators commands", value: '-------------------------'},
    {name: `${prefix}kick `, value: 'Kick @user <reason>'},
    {name: `${prefix}ban`, value: 'ban @user <reason>'},
    {name: '**Commands for everyone**', value: '-------------------------'},
    {name: `${prefix}coin`, value: 'Flip a coin!'},
    {name: `${prefix}dm @user <your message>`, value: 'Send a message to someone using the bot'},
    {name: `${prefix}info @user`, value: 'Shows info about any user or yourself.'},
    {name: `${prefix}pfp @user`, value: "Get someone's profile picture or yourself"},
    {name: `${prefix}serverinfo`, value: 'Shows info about the server!'}
  )
  await message.channel.send(embedMessage)
}
else if (command === 'eval') {
  if (['483779151632007169','844909268791721994'].includes(message.author.id)) {
    let evaled;
    try {
      evaled = eval('( async () => {' + args.join(' ') + '})()');
      message.channel.send(`\`\`\`js\n` + inspect(evaled, { depth: 3}).substr(0, 1980) + `\n\`\`\``);
    }
    catch (error) {
      message.reply('**Error** during evaluation...\n\n' +  `\`\`\`prolog\n` +error.stack.substr(0, 1900) + `\`\`\``);
    }
  }
  else {
    message.reply('Only my owners can use this command.')
  }
}

else if (command === 'bans') {
  let banCount = (await message.guild.fetchBans()).size;
  embedMessage = new Discord.MessageEmbed()
  .addFields(
    {name: 'Server name', value: `${message.guild.name}`},
    {name: 'Number of banned users', value: banCount}
  )
  .setThumbnail(`${message.guild.iconURL()}`)
  .setFooter(`Requested by ${message.author.tag}`)
  .setTimestamp()
  
  await message.channel.send(embedMessage);
}
else if (command === 'mute') {
  let MutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
  target = message.mentions.members.first();
  if (!target) return message.reply('Mention someone to mute him!');
  if (MutedRole) {
    target.roles.add(MutedRole);
    await message.channel.send(`${target.user.username} has been muted by ${message.author}`);
  }
  else { // need to create a muted role
    message.guild.roles.create({
      'data': {
        'name': 'Muted',
        'color': 'BLACK',
        'mentionable': false
      }
    })
    MutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    //continue...
  }
}
else return;
}); // message event's end

client.on('guildMemberAdd', async (newMember) => {
  ModlogChannel = client.channels.cache.get('653868055407099905');
  await ModlogChannel.send(`Hello <@${newMember.id}>, welcome to ${newMember.guild.name}! You are number ${newMember.guild.memberCount}`);
})
client.on('guildMemberRemove', async (leftMember) => {
  ModlogChannel = client.channels.cache.get('653868055407099905');
  ModlogChannel.send(`**${leftMember.user.tag}** has left the server :(`);
})


client.on('messageUpdate', async (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  ModlogChannel = client.channels.cache.get('852905751156228126');
  embedMessage = new Discord.MessageEmbed()
  .addFields(
    {name: 'Message update', value: `A message was edited in <#${oldMessage.channel.id}>`},
    {name: "Message's author", value: `${oldMessage.author.tag}`},
    {name: 'Old message', value: `${oldMessage}`},
    {name: 'New message', value: `${newMessage}`}
  )
  .setThumbnail(oldMessage.author.displayAvatarURL({dynamic: true}))
  await ModlogChannel.send(embedMessage);
})
client.on('messageDelete', async (deletedMessage) => {
  if (deletedMessage.author.bot) return;
  ModlogChannel = client.channels.cache.get('852905751156228126');
  embedMessage = new Discord.MessageEmbed()
  .setThumbnail(deletedMessage.author.displayAvatarURL({dynamic: true}))
  .addFields(
    {name: "Message update", value: `A message was deleted in <#${deletedMessage.channel.id}>`},
    {name: "Message author", value: `${deletedMessage.author.tag}`},
    {name: "Message content", value: `${deletedMessage}`}
  )
  await ModlogChannel.send(embedMessage);
})
client.on('guildCreate', async (Server) => {
  await Server.owner.send("Hello, I am Nave Bot!\n" + "My default prefix is ``!``, but you can change that! Run the command ``!help`` to see what I can do!\n" + "Thanks for adding me!")
}) 
client.login(botToken)
