const LOG_EVENTS = true;

var events = [
    //"channelCreate",
    //"channelDelete",
    //"channelPinsUpdate",
    //"channelUpdate",
    "clientUserSettingsUpdate",
    "debug",
    "disconnect",
    //"emojiCreate",
    //"emojiDelete",
    //"emojiUpdate",
    //"guildBanAdd",
    //"guildBanRemove",
    //"guildCreate",
    //"guildDelete",
    //"guildMemberAdd",
    //"guildMemberAvailable",
    //"guildMemberRemove",
    //"guildMembersChunk",
    //"guildMemberSpeaking",
    //"guildMemberUpdate",
    //"guildUnavailable",
    //"guildUpdate",
    //"message",
    //"messageDelete",
    //"messageDeleteBulk",
    //"messageReactionAdd",
    //"messageReactionRemove",
    //"messageReactionRemoveAll",
    //"messageUpdate",
    //"presenceUpdate",
    "reconnecting",
    "resume",
    //"roleCreate",
    //"roleDelete",
    //"roleUpdate",
    //"typingStart",
    //"typingStop",
    //"userNoteUpdate",
    //"userUpdate",
    //"voiceStateUpdate",
    "warn",
];

if (LOG_EVENTS) {
    turpy.log("[INFO] This instance of turpy is configured to log events. This may introduce additional overhead.");
    turpy.log("[INFO] To disable event logging, navigate to 'scripts/event-logger.js' and change 'LOG_EVENTS' to false.");

    events.forEach(function (event, index) {
        turpy.client.on(event, (arg1, arg2) => {
            turpy.log("[EVENT] " + event + ": " + arg1 + ", " + arg2);
        });
    });
}
