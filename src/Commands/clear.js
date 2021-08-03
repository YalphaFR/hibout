const Eris = require("eris");
const bot = require("../bot");
const utils = require("../utils");

bot.registerCommand("clear", async (msg, args) => {
    if (isNaN(args[0]) || Number(args[0]) > bot.options.messageLimit || Number(args[0]) < 1) {
        return msg.command.errorMessage(msg, "**Veuillez préciser le nombre de message à effacer.**");
    }
    await msg.delete();
    const numberOfDeletedMessages = Number(args[0]);
    try {
        const getChannelMessages = await msg.channel.getMessages({limit: numberOfDeletedMessages});
        await msg.channel.deleteMessages(getChannelMessages.map(m => m.id));
        const msgConfirmation = await msg.channel.createMessage(getChannelMessages.length > 1 ? `**${getChannelMessages.length} messages ont été supprimés**` : `**${getChannelMessages.length} message a été supprimé**`);
        
        await utils.sleep(2000);
        msgConfirmation.delete("auto").catch(err => {});
    } catch(err) {
        msg.command.errorMessage(msg, err.message);
    }
    }, {
        aliases: ["purge", "del"],
        hidden: true,
        argsRequired: true,
        guildOnly: true,
        deleteCommand: false,
        requirements: {
            custom: function(msg) {
                return utils.isStaff(msg.member);
            },
        },
        description: "Supprimer des messages",
        fullDescription: "Supprime n (0 < n < 101) message dans le salon où la commande est effectuée.",
        usage: "10",
    }
);