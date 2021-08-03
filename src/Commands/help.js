const bot = require("../bot");
const utils = require("../utils");

const help = bot.registerCommand("help", (msg, args) => {
        let result = "";
        if(args.length > 0) {
            let cur = bot.commands[bot.commandAliases[args[0]] || args[0]];
            if(!cur || (cur.hidden && !utils.isStaff(msg.member))) {
                return "Commande introuvable";
            }
            let {label} = cur;
            for(let i = 1; i < args.length; ++i) {
                cur = cur.subcommands[cur.subcommandAliases[args[i]] || args[i]];
                if(!cur || (cur.hidden && !utils.isStaff(msg.member))) {
                    return "Commande introuvable";
                }
                label += ` ${cur.label}`;
            }
            result += `**Usage:\n${msg.prefix}${label}** ${cur.usage}\n\n**Description:**\n${cur.fullDescription}`;
            if(cur.aliases.length > 0) {
                result += `\n\n**Alias:** ${cur.aliases.join(", ")}`;
            }
            const subcommands = Object.keys(cur.subcommands);
            if(subcommands.length > 0) {
                result += "\n\n**Sous-commandes:**";
                for(const subLabel of subcommands) {
                    if(cur.subcommands.hasOwnProperty(subLabel) && cur.subcommands[subLabel].permissionCheck(msg)) {
                        result += `\n  **${subLabel}** - ${cur.subcommands[subLabel].description}`;
                    }
                }
            }
        } else {
            result += `${bot.commandOptions.name} - ${bot.commandOptions.description}\n`;
            if(bot.commandOptions.owner) {
                result += `par ${bot.commandOptions.owner}\n`;
            }
            result += "\n**Commandes:**\n";
            for(const label in bot.commands) {
                if(bot.commands.hasOwnProperty(label) && bot.commands[label] && bot.commands[label].permissionCheck(msg) && !bot.commands[label].hidden) {
                    result += `  **${msg.prefix}${label}** - ${bot.commands[label].description}\n`;
                }
            }
            result += `\nTapper ${msg.prefix}help <commande> pour plus d'information sur une commande.`;
        }
        return msg.channel.createMessage({embed: {description: result}});
    }, {
        deleteCommand: false,
        description: "Ce texte d'aide",
        fullDescription: "Ce commande est utilisée pour se renseigner sur les informations des différentes commandes du bot, en plus de celle-ci."
    });



    help.registerSubcommand("admin", (msg, args) => {
        if (args.length > 0) {
            return `Pour voir l'usage d'une commande administrateur veuillez uniquement tapper ${msg.prefix}help <command>`;
        } else {
            let result = "";
            result += `${bot.commandOptions.name}\n\n**Commandes administrateur:**\n`;
            for (const label in bot.commands) {
                if (bot.commands.hasOwnProperty(label) && bot.commands[label] && bot.commands[label].permissionCheck(msg) && bot.commands[label].hidden) {
                    result += `  **${msg.prefix}${label}** - ${bot.commands[label].description}\n`;
                }
            }
            result += `\nTapper ${msg.prefix}help <commande> pour plus d'information sur une commande.`;

            const serverAdminRole = msg.channel.guild.roles.find(r => r.name.toLowerCase().lastIndexOf("administrateur") > -1);
            return msg.channel.createMessage({embed: {color: serverAdminRole ? serverAdminRole.color : null, description: result}});
        }
        }, {
            hidden: true,
            deleteCommand: false,
            requirements: {
                custom: msg => utils.isStaff(msg.member)
            },
            description: "Ce texte d'aide",
            fullDescription: "Ce commande est utilisée pour se renseigner sur les informations des différentes commandes administrateur du bot, en plus de celle-ci."
        });