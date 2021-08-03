const config = require("./config");

const Eris = require("eris");
const bot = new Eris.CommandClient(config.token, {
    intents: Object.keys(Eris.Constants.Intents),
    restMode: true,
    }, {
        prefix: "+",
        description: "Bot privé du serveur",
        owner: "D",
        defaultHelpCommand: false,
        defaultCommandOptions: {
            caseInsensitive: true,
            deleteCommand: true,
            errorMessage: function(msg, err) {
                msg.channel.createMessage(err);
            },
        }
    }
);

module.exports = bot;