const bot = require("../bot");
const config = require("../config");


bot.registerCommand("suggestion", (msg, args) => {
    let channelToSendMsgID = msg.channel.guild.id === config.serverIDs.ornithosServerID ? config.channelIDs.ornithosServerSuggestionChannelID : config.channelIDs.biodivServerSuggestionChannelID;
    try {
        bot.createMessage(channelToSendMsgID, {embed: { 
            color: 0xF2D136,
            author: { 
                name: `Suggestion de ${msg.author.username}`,
                icon_url: msg.author.avatarURL
            }, 
            description: args.join(" ")
        }
    }).then(msgSend => {    
        msgSend.addReaction("👍");
        msgSend.addReaction("👎");
        return msg.channel.createMessage("**✅ Suggestion envoyée**");
    });
    } catch (err) {
        return msg.command.errorMessage(msg, err.message);
    } 
    }, {
        argsRequired: true,
        requirements: {
            custom: function(msg) {
                return [config.channelIDs.ornithosServerCommandChannelID, config.channelIDs.biodivServerCommandChannelID].includes(msg.channel.id) 
            }
        },
        description: "Faire une suggestion pour le serveur",
        fullDescription: "Faire une suggestion pour le serveur. La suggestion apparaitra dans le salon réservé aux suggestions. Cette commande est uniquement accessible dans le salon réservé au commande de robot",
    }
);