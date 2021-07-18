const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const yts = require('yt-search');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'play',
    descrpition: 'Play music!',
    async execute(message, args) {

        let memberVC = message.member.voice.channel;
        if (!memberVC) return message.reply('You need to be in a VC!');
        if (!args[0]) return message.reply('Add the song you want to play!');
        let vc = await memberVC.join();
        if (!vc) return message.reply('You need to be in a VC!');

        const videosFound = await yts(args.join(' '));
        if (!videosFound) return message.reply('No videos were found!');

        const firstVideo = videosFound.videos[0];
        if (!firstVideo) return message.reply('No video found!');


        if (videosFound.videos.length >= 3) { // Just to make sure that there are more than 3 results found. UwU
            const resultsEmbed = new MessageEmbed()
            .setTitle('Top 3 results found. Select the video you want to play!')
            .addFields(
                {name: 'Song 1', value: `${videosFound.videos[0].title} || ${videosFound.videos[0].author.name}`},
                {name: 'Song 2', value: `${videosFound.videos[1].title} || ${videosFound.videos[1].author.name}`},
                {name: 'Song 3', value: `${videosFound.videos[2].title} || ${videosFound.videos[2].author.name}`}
            )
            .setFooter('Chosoe which song to play - you have 30 seconds!')
            .setTimestamp()

            message.channel.send(resultsEmbed).then(msg => {

                const filter = (reaction, user) => {
                    return (reaction.emoji.name === '1️⃣' && user.id === message.author.id) ||
                    (reaction.emoji.name === '2️⃣' && user.id === message.author.id) || 
                    (reaction.emoji.name === '3️⃣' && user.id === message.author.id);
                };
                msg.react('1️⃣');
                msg.react('2️⃣');
                msg.react('3️⃣');
                const collector = msg.createReactionCollector(filter, {max: 1, time: 30000});
                let emoji = "";
                collector.on('collect', (reaction, user) => {
                    emoji = reaction.emoji.name;
                })
                collector.on('end', (collected) => {
                    if (emoji) { // user reacted with something
                        if (emoji === '1️⃣') { // user wants to play the first video found
                        const dispatcher = vc.play(ytdl(firstVideo.url, {filter: 'audioonly'}));
            
                         dispatcher.setVolume(1); // the highest possible
                         const embed = new MessageEmbed()
                         .setTitle('Now playing!')
                         .setURL(firstVideo.url)
                         .addField('Song', firstVideo.title)
                         .addField('Now playing in', `${memberVC.name}`)
                         .setFooter(`Requested by ${message.author.tag}`)
                         .setTimestamp()
                         .setThumbnail(firstVideo.thumbnail)

                         dispatcher.on('start', () => {
                            message.channel.send(embed);
                         });
                        }
                        else if (emoji === '2️⃣') { // user wants to play the second video found.
                            let secondSong = videosFound.videos[1]; // starts from 0 (like an array)
                            const dispatcher = vc.play(ytdl(secondSong.url, {filter: 'audioonly'}));
            
                            dispatcher.setVolume(1); // the highest possible
                            const embed = new MessageEmbed()
                            .setTitle('Now playing!')
                            .setURL(secondSong.url)
                            .addField('Song', secondSong.title)
                            .addField('Now playing in', `${memberVC.name}`)
                            .setFooter(`Requested by ${message.author.tag}`)
                            .setTimestamp()
                            .setThumbnail(secondSong.thumbnail)

                            dispatcher.on('start', () => {
                                message.channel.send(embed);
                            });
                        }
                        else if (emoji === '3️⃣') {
                            let thirdSong = videosFound.videos[2];
                            const dispatcher = vc.play(ytdl(thirdSong.url, {filter: 'audioonly'}));
            
                            dispatcher.setVolume(1); // the highest possible 
                            const embed = new MessageEmbed()
                            .setTitle('Now playing!')
                            .setURL(thirdSong.url)
                            .addField('Song', thirdSong.title)
                            .addField('Now playing in', `${memberVC.name}`)
                            .setFooter(`Requested by ${message.author.tag}`)
                            .setTimestamp()
                            .setThumbnail(thirdSong.thumbnail)

                            dispatcher.on('start', () => {
                                message.channel.send(embed);
                            });
                        }
                    }else { // user did not specify which video to play
                        return message.reply('Please specify which video to play and try again!');
                    }
                });
            });
        }
        else { // Just play the first song found without asking the user. There are no more than 3 results.
            const dispatcher = vc.play(ytdl(firstVideo.url, {filter: 'audioonly'}));
            
            dispatcher.setVolume(1); // the highest possible
            const embed = new MessageEmbed()
            .setTitle('Now playing!')
            .setURL(firstVideo.url)
            .addField('Song', firstVideo.title)
            .addField('Now playing in', `${memberVC.name}`)
            .setFooter(`Requested by ${message.author.tag}`)
            .setTimestamp()
            .setThumbnail(firstVideo.thumbnail)

            dispatcher.on('start', () => {
                message.channel.send(embed);
            })
        }
    }
}