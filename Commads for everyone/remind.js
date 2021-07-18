module.exports = {
    name: 'remind',
    description: 'Sets a reminder using the bot!',
    async execute(message, args) {

        const { MessageEmbed } = require('discord.js');
        if (!args[0]) return message.reply('Command format: ``$remind 5m Hey, 5 minutes have passed!``');
        let time = "";
        for (let i = 0; i < args[0].length - 1; i++) {
            time += args[0].charAt(i);
        }
        //message.reply(time);
        //message.reply(args[0].charAt(args[0].length - 1));
        // working well
        let timeArray = ['h', 'm', 's'];
        
        if (!timeArray.includes(args[0].charAt(args[0].length - 1))) {
            return message.reply('Invalid time was given! h for hours, m for minutes and s for seconds.');
        }
        let timeUnit = args[0].charAt(args[0].length - 1);
        let delay = parseInt(time);
        if (isNaN(delay)) return message.reply('Invalid amount of time was given!');

        if (!args[1]) return message.reply('Add your reminder!');
        let reminder = "";
        for (let i = 1; i < args.length; i++) {
            reminder += args[i] + ' ';
        }
        message.reply('Your reminder has been set successfully ⏲️ ✅');
        function GetMonthName(index) {
            let months = ["January", "February", "March", "April", "May",
            "June", "July", "August", "September", "October",
            "November", "December"];
            return months[index - 1];
        }
        let date = new Date();
        let monthNumber = date.getMonth() + 1;
        let hour = date.getHours();
        let minutes = date.getMinutes(); 
        let day = date.getDay() + 1;
        let dateString = date.getTime();
        let dayNumber = date.getDate().toLocaleString();
        let monthName = GetMonthName(monthNumber);
        let seconds = date.getSeconds();

        if (timeUnit === 's') {
            setTimeout(() => {
                const embed = new MessageEmbed()
                .setTitle('Your reminder')
                .addFields(
                    {name: `Your reminder from ${message.guild.name}`, value: reminder}
                )
                .setFooter(`Reminder created at ${monthName} ${dayNumber}, ${hour}:${minutes}:${seconds}`)
                .setTimestamp()
                .setThumbnail('https://th.bing.com/th/id/OIP.5iEHRTaezIVXym57comRcQHaHd?w=172&h=180&c=7&o=5&dpr=1.1&pid=1.7')
                
                message.author.send(embed).catch(error => message.reply('I could not DM you!'));
            }, delay * 1000);
        }
        else if (timeUnit === 'm') {
            setTimeout(() => {
                const embed = new MessageEmbed()
                .setTitle('Your reminder')
                .addFields(
                    {name: `Your reminder from ${message.guild.name}`, value: reminder}
                )
                .setFooter(`Reminder created at ${monthName} ${dayNumber}, ${hour}:${minutes}:${seconds}`)
                .setTimestamp()
                .setThumbnail('https://th.bing.com/th/id/OIP.5iEHRTaezIVXym57comRcQHaHd?w=172&h=180&c=7&o=5&dpr=1.1&pid=1.7')

                message.author.send(embed).catch(error => message.reply('I could not DM you!'));

            }, delay * 1000 * 60);
        }
        else if (timeUnit === 'h') {
            setTimeout(() => {
                const embed = new MessageEmbed()
                .setTitle('Your reminder')
                .addFields(
                    {name: `Your reminder from ${message.guild.name}`, value: reminder}
                )
                .setFooter(`Reminder created at ${monthName} ${dayNumber}, ${hour}:${minutes}:${seconds}`)
                .setTimestamp()
                .setThumbnail('https://th.bing.com/th/id/OIP.5iEHRTaezIVXym57comRcQHaHd?w=172&h=180&c=7&o=5&dpr=1.1&pid=1.7')

                message.author.send(embed).catch(error => message.reply('I could not DM you!'));

            }, delay * 1000 * 60 * 60);
        }

    }
}