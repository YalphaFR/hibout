const bot = require("../bot");
const config = require("../config");

bot.on("guildMemberAdd", (guild, member) => {
    if (member.bot) return;

    let colorEmbed = 0xd8e035;
    let bienvenueChannelID = config.channelIDs.ornithosServerBienvenueChannelID;
    let messageToSend = `Hey ${member.mention}, bienvenue sur **${guild.name}** !\n**Viens découvrir les oiseaux en notre compagnie !** :eagle:`;

    bot.createMessage(bienvenueChannelID, {embed: {
        color: colorEmbed,
        description: messageToSend
    }});
});


bot.on("guildMemberRemove", (guild, member) => {
    if (member.bot) return;
    // if the member is not cached, this will be an object with id and user key
    if (typeof member === typeof {}) {
        member = member.user;
    }
    let bienvenueChannelID = config.channelIDs.ornithosServerBienvenueChannelID;
    let messageToSend = `Oooh non! L'ornithologie n'est pas trop le truc de **${member.username}#${member.discriminator}**.`;
    
    bot.createMessage(bienvenueChannelID, messageToSend);
});
