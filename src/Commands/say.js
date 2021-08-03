const bot = require("../bot");
const utils = require("../utils");

bot.registerCommand("say", (msg, args) => {
    msg.channel.createMessage({embed: {
        color: 0x7da27e,
        description: args.join(" ")
    }});
    }, {
        argsRequired: true,
        hidden: true,
        requirements: {
            custom: function(msg) {
                return utils.isStaff(msg.member);
            },
        },
        description: "Faire parler le bot",
        fullDescription: "Envoyer un message qui sera retranscrit identiquement par le bot, dans le salon en question",
        usage: `Bonjour, je me nomme ...`,
    });