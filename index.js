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
    bot.user.setGame("::justice::")
    console.log("Ready")
});


bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "general").sendMessage(member.toString() + " Welcome in this little cancer my boi");

    member.addRole(member.guild.roles.find("name", "guest"))
});


bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case "ping":
            message.channel.sendMessage("Pong!");
            break;
        case "info":
            message.channel.sendMessage("**I'm a super clever bot made by my lord CatSniper**");
            break;
        case "mute":
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
        case "unmute":
            let mutedone = message.mentions.members.first();
            let Muted = message.guild.roles.find("name", "Muted");
            if (!mutedone) return message.reply("Mention someone to unmute them!")
            mutedone.removeRole(Muted.id);
            message.reply(`**${mutedone.user.username}** was succesfully unmuted.`);
            break;
        case "cat":
            var mooma = new Discord.RichEmbed()
                .setDescription("CatSniper is a fag");
            message.channel.sendEmbed(mooma);
            break;    
        case "hmmm":
            if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.sendMessage("can't read that shet");
            break;
        case "krikor":
            var lick = new Discord.RichEmbed()
                .setDescription("krikor is a weak pussy");
            message.channel.sendEmbed(lick);
            break;
        case "is":
            if (args[1]) message.channel.sendMessage("yes");
            else message.channel.sendMessage("can't read that shet");
            break;
        case "muteinfo":
            if (!message.member.permissions.has("MANAGE_ROLES")) return message.reply("That command is only for mods... :utried: ");
            else message.reply("**mute {time} {user} *time must be specified in seconds***");
            break;
        case "kick":
            let modRole = message.guild.roles.find("name", "Grimm Commander");
            if(!message.member.roles.find("name", "grimm commander")) 
              return message.reply("You pleb, you don't have the permission to use this command.").catch(console.error);
            if(message.mentions.users.size === 0) 
              return message.reply("Please mention a user to kick").catch(console.error);
            let kickMember = message.guild.member(message.mentions.users.first());
            if(!kickMember) 
              return message.reply("That user does not seem valid");
            if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) 
              return message.reply("I don't have the permissions (KICK_MEMBER) to do this.").catch(console.error);
            kickMember.kick().then(member => message.reply(`**${member.user.username}** was kicked...`))
            break;
        case "help":
            if (!message.member.roles.find("name", "grimm commander"))
              return message.reply("I can't provide any information for you because there are no available commands to use...");
            message.reply("there's no available list of commands atm, however you can contact @catsniper for bot moderation details.");
            break;
        case "warn": 
            let reason = args.slice(1).join(' ');
            let user = message.mentions.users.first();
            let modlog = message.guild.channels.find('name', 'mod-log');
            if (!modlog) return message.reply("There's no modlog channel in this server!");
            if (reason.length < 1) return message.reply("You didn't provide any reason for you warn.");
            if(message.mentions.users.size < 1) return message.reply("Mention someone to warn them!");
            var warn = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .addField('Action:', 'Warning:')
            .addField('User:', `${user.username}#${user.discriminator}`)
            .addField('Moderator:', `${message.author.username}#${message.author.dicriminator}`)
            .addField("With reason:", `${reason}`)
            return message.channel.sendEmbed(warn)
            break;
        case "purge":
     
            let messagecount = parseInt(args[1]) || 1;

            var deletedMessages = -1;

              message.channel.fetchMessages({limit: Math.min(messagecount + 1, 100)}).then(messages => {
              messages.forEach(m => {
                   if (m.author.id == bot.user.id) {
                      m.delete().catch(console.error);
                      deletedMessages++;
                }
            });
            }).then(() => {
            if (deletedMessages === -1) deletedMessages = 1;
            message.reply(`:white_check_mark: Succesfully purged the messages.`)
                    .then(m => m.delete(2000));
           }).catch(console.error);
            break;
        case "prune":
            if (!message.member.roles.find("name", "grimm commander")) return message.reply("You dont have enough perms for this command...")
            const params = message.content.split(' ')
            let number = parseInt(params[1]);
            message.channel.fetchMessages({limit: number}).then(messages => message.channel.bulkDelete(messages));
            message.channel.sendMessage(`:white_check_mark: Pruned \`${number}\` messages.`)
                .then(m => m.delete(2000));
            break;
        case "sr":
            let guest = message.mentions.users.first();
            let trole = args.slice(1).join(' ');
            if (!guest) return message.reply("Mention someone to give them a role!");
            if (!trole) return message.reply(`Type in the role you want to give!`)
            guest.addRole("name", `${trole}`)
            message.reply(`Succesfully added role ${trole} to user ${guest.user.username}`)
            break;
        case "invite":
            message.channel.sendMessage("https://discordapp.com/api/oauth2/authorize?client_id=384688108442222593&scope=bot&permissions=1")
            break;
        case "invite fisher":
            message.channel.sendMessage("https://discordapp.com/api/oauth2/authorize?client_id=395292815309012992&scope=bot&permissions=1")
            break;
        default:
            message.channel.sendMessage("CatSniper didn't create this command atm... Make sure to add it in #suggestions so our sexy boi can see!");
    }
});

bot.login(process.env.BOT_TOKEN);

