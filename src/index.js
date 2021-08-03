console.log("Démarrage de l'application...");
console.log("Chargement de tous les packets");

// REQUIRES

const bot = require("./bot");
const config = require("./config");

// COMMANDES
const clear = require("./Commands/clear");
const eval = require("./Commands/eval");
const suggestion = require("./Commands/suggestion");
const say = require("./Commands/say");
const help = require("./Commands/help");
const quizz = require("./Commands/quizz");

// Events
const actionlog = require("./Events/actionlog");

bot.once("ready", () => {
    console.log("Initialisation du statut...");
    bot.editStatus(config.status, config.game);
    console.log("Ready!");
});


bot.connect();
