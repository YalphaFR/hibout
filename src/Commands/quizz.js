const bot = require("../bot");
const config = require("../config");

bot.registerCommand("quizz", (msg, args) => {
    const quizzTrueResponses = ["1", "2", "1", "3", "2", "2", "1", "3", "1", "3"];
    let quizzUserResponses = args;

    if (quizzUserResponses.length < quizzTrueResponses.length) {
        quizzUserResponses = args.join(" ").split("");
        if (quizzUserResponses.length < quizzTrueResponses.length) {
            return "Veuillez fournir l'intégralité des réponses aux 10 questions."
        }
    }
    let note = 0;
    for (let i = 0; i < quizzTrueResponses.length; i++) {
        if (quizzTrueResponses[i] === quizzUserResponses[i]) note += 1;
    }

    let roleGivenID = config.rewardRoleIDs.ornithosServerNeophyteRoleID;

    if (5 < note && note < 9) {
        roleGivenID = config.rewardRoleIDs.ornithosServerAmateurRoleID;
    } else if (note > (quizzTrueResponses.length - 3)) {
        roleGivenID = config.rewardRoleIDs.ornithosServerExpertRoleID;
    }
    msg.member.addRole(roleGivenID, "auto");
    return `${msg.member.mention}, voici le résultat du quizz : ${note}.\nLe rôle **<@&${roleGivenID}>**, respectif à votre niveau de connaissance en ornithologie, vous a été attribué.`;
    }, {
        argsRequired: true,
        requirements: {
            custom: function(msg) {
                return msg.channel.guild.id === config.serverIDs.ornithosServerID &&!(msg.member.roles.includes(config.rewardRoleIDs.ornithosServerNeophyteRoleID)
                ||  msg.member.roles.includes(config.rewardRoleIDs.ornithosServerAmateurRoleID)
                || msg.member.roles.includes(config.rewardRoleIDs.ornithosServerExpertRoleID));
            },
        },
        description: "Passer le quizz pour obtenir un rôle",
        fullDescription: "Faire le quizz vous indiquera votre niveau ornithologique actuel",
    });
