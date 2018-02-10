const Discord = require("discord.js");
const PREFIX = "::"


var fortunes = [
    "ew",
    " like shet",
    " sexy boi",
    "cum on me hot boi"
];

var fortunes2 = [
    "1 inch dick",
    "60 inches dayum huge peen",
    "20,33333 inches skinny penis",
    "5 incher fat dick",
    "8 inches black cock"
];

var client = new Discord.Client();

var bot = new Discord.Client();

bot.on("ready", function() {
    bot.user.setGame("justice")
    console.log("Ready")
});


bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "general").sendMessage(member.toString() + " Welcome in this little cancer my boi");

    member.addRole(member.guild.roles.find("name", "og"))
});


bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    let modlog = message.guild.channels.find('name', 'mod-log');

    let modRole = message.guild.roles.find("name", "grimm commander");

    switch (args[0]) {
        case "catchconsole":
            if (message.author.id !== "244461194545594369") return message.reply("only catsniper can use this command")
            message.channel.sendMessage("**Catching console error.....**")
            break;
        case "mute":
            if (message.author.id !== "244461194545594369") return message.reply("only catsniper can use this command")
            let member = message.mentions.members.first();
            if (!member) return message.reply("can't read that shet");
            let muteRole = message.guild.roles.find("name", "Muted");
            if (!muteRole) return message.reply("no role sry")
            let time = args[1];
            if(!time) return message.reply("no time sry");
        
            member.addRole(muteRole.id);
            message.reply(`**${member.user.username}** was succesfully muted.`);
        
            setTimeout(function() {
                member.removeRole(muteRole.id);
            }, time*60000);
            break;
        default:
            var embeed = new Discord.RichEmbed()
            .setDescription("I am currently under maintenance....DM catsniper for more information")
            message.channel.sendEmbed(embeed)
                .then(m => m.delete(2000));
    }
});

bot.login(process.env.BOT_TOKEN);

