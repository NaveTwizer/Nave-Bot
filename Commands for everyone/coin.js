module.exports = {
    name: 'coin',
    description: 'Flip a coin!',
    async execute(message) {
        let coin = Math.floor(Math.random() * 2);
        if (coin === 0) {
            await message.reply('Your coin landed on **TAILS**');
        }else {
            await message.reply('Your coin landed on **HEADS**')
        }
    }
}