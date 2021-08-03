const config = {
    token: ,
    ownerID: "322492552601272320",
    status: "dnd", 
    game: {name: "le chant des oiseaux", type: 2},
    
    get requiredModPermissions() {
        return [this.ownerID, "administrator"];
    },

    serverIDs: {
        ornithosServerID: "741757227416682517",
        biodivServerID: "852588520639692831",
    }, 

    channelIDs: {
        ornithosServerSuggestionChannelID: "781244589339181077",
        ornithosServerCommandChannelID: "741991881491087378",
        ornithosServerBienvenueChannelID: "741986142223597661",

        biodivServerSuggestionChannelID: "852588522116612147",
        biodivServerCommandChannelID: "852588521628762197",
        biodivServerBienvenueChannelID: "852588521390473226",
    },

    rewardRoleIDs: {
        ornithosServerNeophyteRoleID: "741995693966753805",
        ornithosServerAmateurRoleID: "741994750084644924",
        ornithosServerExpertRoleID: "741995012211867649",
    }
};

module.exports = config;