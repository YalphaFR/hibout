const bot = require("./bot");
const config = require("./config");

function postErrorMessage(channel, message) {
    channel.createMessage({embed: {
        color: 0xED4337,
        description: message,
    }});
}

function postConfirmationMessage(channel, message) {
    channel.createMessage({embed: {
        color: 0x23D160,
        description: message,
    }});
}

function isStaff(member) {
    if (member.guild.ownerID === member.id) return true;

    return config.requiredModPermissions.some(permission => {
        if (isNaN(permission)) {
            if (member.permissions.has(permission)) return true;
        } else {
            if (member.id === permission) return true;
            if (member.roles.includes(permission)) return true;
        }
        return false;
    });
}

function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}
module.exports = {
    postErrorMessage,
    postConfirmationMessage,
    isStaff,
    sleep,
}