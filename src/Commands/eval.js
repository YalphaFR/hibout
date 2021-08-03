const Eris = require("eris");
const bot = require("../bot");
const config = require("../config");

const evaluate = bot.registerCommand("eval", async (msg, args) => {
    let res;
    try {
        res = await eval(args.join(" "));
    } catch (err) {
        res = err.message;
    }
    return msg.channel.createMessage({embed: {
        fields: [
                    {
                        name: "Commande",
                        value: "```js\n" + args.join(" ") + "```"
                    },
                    {
                        name: "Résultat",
                        value: "```js\n" + formatPrint(res)  + "```",
                    }
                ],
    }}).catch((err) => {    
        console.log(err);
    });
}, {
    argsRequired: true,
    hidden: true,
    requirements: {
        userIDs: [config.ownerID],
    }
});

function formatPrint(value) {
    const typeValue = typeof value;
    if (typeValue === typeof {} || typeValue === typeof []) {
        return String(value);
    }
    return value;
}