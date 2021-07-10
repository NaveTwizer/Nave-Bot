module.exports = {
    name: 'search',
    description: 'Wikipedia search',
    // install: 
    // npm i ultrax@latest 
    async execute(message, args) {
        const { Wikipedia } = require('ultrax');
        let query = args.join(' ');
        if (!query) return message.reply('Search something!');
        const res = new Wikipedia({
            message: message,
            color: "BLACK",
            query: query
        })
        res.fetch();
    }
}
