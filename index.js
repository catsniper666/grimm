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
            break
        case "kick":
        if(!message.member.roles.find("name", "grimm commander")) 
          return message.reply("You pleb, you don't have the permission to use this command.").catch(console.error);
        let reasonxx = args.slice(1).join(' ')
        if(!reasonxx) 
          return message.reply("You must provide a reason for the kick")
        if(message.mentions.users.size === 0) 
          return message.reply("Please mention a user to kick").catch(console.error);
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) 
          return message.reply("That user does not seem valid");
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) 
          return message.reply("I don't have the permissions (KICK_MEMBER) to do this.").catch(console.error);
        if (!modlog) return message.reply("There is no `mod-log` channel in this guild...")
        kickMember.kick().then(member => message.reply(`**${member.user.username}** was kicked...`))
            var kembed = new Discord.RichEmbed()
              .setTitle("**KICK**")
              .addField("**Kicked member:**", `${kickMember.username}`)
              .addField("**Kicked member ID:**", `${kickMember.id}`)
              .addField("**Moderator:**", `${message.author.username}`)
              .addField("**Reason:**", `${reasonxx}`)
        return message.guild.channels.get(modlog.id).sendEmbed(kembed)
            break;
        case "help":
           var hembed = new Discord.RichEmbed()
           .setTitle(`**All Available Moderation Commands**`)
           .addField(`**Kick**`, `- kicks a member from the guild [usage]: *::kick <mentioned.user> <reason>*`)
           .addField(`**Ban**`, `- bans a members from the guild [usage]: *::ban <mentioned.user> <reason>* `)
           .addField(`**Prune**`, `- clears a desired amount of messages [usage]: *::prune <number.of.messages>*`)
           .addField(`**Mute**`, `- mutes a member for a desired amount of minutes [usage]: *::mute <mentioned.user> <time>*`)
           .addField(`**Unmute**`, `- unmutes a desired member [usage]: *::unmute <mentioned.user>*`)
           .setFooter(`Requested by: ${message.author.username}`)
            if (!message.member.roles.find("name", "grimm commander"))
              return message.reply("I can't provide any information for you because there are no available commands to use...")
              else message.channel.sendEmbed(hembed);
            break;
        case "warn": 
            let user = message.mentions.users.first();
            let reason = args.slice(1).join(' ');
            if (!message.member.roles.has(modRole.id)) return message.reply("You got no perms for that...")
            if (!modlog) return message.reply("There's no modlog channel in this server!");
            if (!user) return message.reply("Mention someone to warn them!");
            if (!reason) return message.reply("You didn't provide any reason for you warn.");
            var warn = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .addField('Action:', 'Warning:')
            .addField('User:', `${user.username}`)
            .addField('Moderator:', `${message.author.username}`)
            .addField("With reason:", `${reason}`)
            return message.guild.channels.get(modlog.id).send(warn);
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
            let therole = message.guild.roles.find("name", `${trole}`)
            if (!guest) return message.reply("Mention someone to give them a role!");
            if (!trole) return message.reply(`Type in the role you want to give!`)
            guest.addRole(therole.id)
            message.reply(`Succesfully added role ${trole} to user ${guest.user.username}`)
            break;
        case "invite":
            message.channel.sendMessage("https://discordapp.com/api/oauth2/authorize?client_id=384688108442222593&scope=bot&permissions=1")
            break;
        case "invite fisher":
            message.channel.sendMessage("https://discordapp.com/api/oauth2/authorize?client_id=395292815309012992&scope=bot&permissions=1")
            break;
        case "ban":
        if(!message.member.roles.find("name", "grimm commander")) 
        return message.reply("You pleb, you don't have the permission to use this command.").catch(console.error);
      let reasonxxx = args.slice(1).join(' ')
      if(!reasonxxx) 
        return message.reply("You must provide a reason for the ban")
      if(message.mentions.users.size === 0) 
        return message.reply("Please mention a user to kick").catch(console.error);
      let banMember = message.guild.member(message.mentions.users.first());
      if(!banMember) 
        return message.reply("That user does not seem valid");
      if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) 
        return message.reply("I don't have the permissions (BAN_MEMBER) to do this.").catch(console.error);
      if (!modlog) return message.reply("There is no `mod-log` channel in this guild...")
      banMember.ban().then(member => message.reply(`**${member.user.username}** was banned...`))
          var kembed = new Discord.RichEmbed()
            .setTitle("**KICK**")
            .addField("**Kicked member:**", `${banMember.username}`)
            .addField("**Kicked member ID:**", `${banMember.id}`)
            .addField("**Moderator:**", `${message.author.username}`)
            .addField("**Reason:**", `${reasonxxx}`)
      return message.guild.channels.get(modlog.id).sendEmbed(kembed)
           break;
        default:
            message.channel.sendMessage("CatSniper didn't create this command atm... Make sure to add it in #suggestions so our sexy boi can see!");
    }
});

bot.login(process.env.BOT_TOKEN);

