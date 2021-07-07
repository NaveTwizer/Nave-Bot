module.exports = {
    name: 'invite',
    description: 'Get an invite to the server',
    async execute(message, args) {
        let channel = message.mentions.channels.first();
  if (channel) {
    let invite = await channel.createInvite({
      maxAge: 0,
      maxUses: 0
    })
    await message.channel.send(`Unlimited invite for ${channel.name}: ${invite}`);
  }
  else {
    let invite = await message.channel.createInvite({
      maxAge: 0,
      maxUses: 0 // 0 = INFINITY for some reason lol. Also why do I say lol in a damn comment? Lol. LMAO
    })
    await message.channel.send('Unlimited invite for this channel: discord.gg/' + invite);
  }
    }
}