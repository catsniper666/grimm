const Discord = require("discord.js");
const PREFIX = ">"
var bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./warns");

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


bot.on("ready", function() {
    bot.user.setGame("//help for mods")
    console.log("Ready")
});

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "general").sendMessage(member.toString() + "Welcome to Ａｅｓｔｈｅｔｉｃ けマ! Be sure to read #info-rules first. Enjoy your stay!")

    member.addRole(member.guild.roles.find("name", "guest"))
});


bot.on("message", async function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    let modlog = message.guild.channels.find('name', 'mod-log');

    let modRole = message.guild.roles.find("name", "grimm commander");

    let reason = args.slice(2).join(' ')

    let user = message.mentions.users.first()

    switch (args[0]) {
        case "mute":
        let member = message.mentions.members.first()
        let muteRole = message.guild.roles.find("name", "Muted");
        let time = args[2];
        if (!message.member.hasPermission("MANAGE_ROLES")) return;
        if (!message.guild.member(bot.user).hasPermission("MANAGE_ROLES")) return;
        if (!member) return message.reply("can't read that shet");
        if(!time) return message.reply("no time sry");
        if (!muteRole) return message.reply("no role sry")
    
        member.addRole(muteRole.id);
        message.reply(`**${member.user.username}** was succesfully muted.`);
    
        setTimeout(function() {
            member.removeRole(muteRole.id);
        }, time*60000);
        var mutebed = new Discord.RichEmbed()
        .setColor(0xD6A405)
        .addField("**Action**", "Mute")
        .setThumbnail(member.avatarURL)
        .addField("**Muted member:**", `${member.user.username}`)
        .addField("**Muted for:**", `${time} minutes.`)
        message.guild.channels.get(modlog.id).sendEmbed(mutebed)
        break;
    case "m":
    let mmember = message.mentions.members.first()
    let mmuteRole = message.guild.roles.find("name", "Muted");
    let ttime = args[2];
    if (!message.member.hasPermission("MANAGE_ROLES")) return;
    if (!message.guild.member(bot.user).hasPermission("MANAGE_ROLES")) return;
    if (!mmember) return message.reply("can't read that shet");
    if(!ttime) return message.reply("no time sry");
    if (!mmuteRole) return message.reply("no role sry")

    mmember.addRole(mmuteRole.id);
    message.reply(`**${mmember.user.username}** was succesfully muted.`);

    setTimeout(function() {
        mmember.removeRole(mmuteRole.id);
    }, time*60000);
    var mmutebed = new Discord.RichEmbed()
    .setColor(0xD6A405)
    .addField("**Action**", "Mute")
    .setThumbnail(mmember.avatarURL)
    .addField("**Muted member:**", `${mmember.user.username}`)
    .addField("**Muted for:**", `${ttime} minutes.`)
    message.guild.channels.get(modlog.id).sendEmbed(mmutebed)
    break;
    case "muteinfo":
    if (!message.member.hasPermission("MANAGE_ROLES")) return;
    var membed = new Discord.RichEmbed()
        .setTitle("Mute command:")
        .addField("Description:", "Mutes a desired member for an amount of minutes")
        .addField("Usage:", `//mute @user <time>`)
        .addField("Aliases:", `//m @user <time>`)
        .addField("*this command requires `MANAGE_ROLES` permission.*")
    message.channel.send(membed);
    case "unmute":
        let mutedone = message.mentions.members.first();
        let Muted = message.guild.roles.find("name", "Muted");
        if (!message.member.hasPermission("MANAGE_ROLES")) return;
        if (!message.guild.member(bot.user).hasPermission("MANAGE_ROLES")) return;
        if (!mutedone) return message.reply("Mention someone to unmute them!")
        mutedone.removeRole(Muted.id);
        message.reply(`**${mutedone.user.username}** was succesfully unmuted.`);
        break; 
    case "unmuteinfo":
    if (!message.member.hasPermission("MANAGE_ROLES")) return;
    var umembed = new Discord.RichEmbed()
        .setTitle("Mute command:")
        .addField("Description:", "Unmutes a desired member.")
        .addField("Usage:", `//unmute @user`)
        .addField("Aliases:", `*none*`)
        .addField("*this command requires `MANAGE_ROLES` permission.*")
    message.channel.send(umembed);
    break;
    case "say":
        if (message.author.id !== "244461194545594369") return message.reply("that command can only be used by catsniper")
        .then(m => m.delete(2000));
        let laluca = args.slice(1).join(' ')
        if (!laluca) return 
        message.delete().catch(O_o=>{});
        message.channel.sendMessage(`${laluca}`)
        break;
    case "kick":
    if(!message.member.hasPermission("KICK_MEMBERS")) 
      return message.reply("You pleb, you don't have the permission to use this command.").catch(console.error);
    let reasonxx = args.slice(2).join(' ')
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
          .setColor(0xFF4646)
          .addField("**Action**", "Kick")
          .addField("**Kicked member:**", `${kickMember.username}`)
          .addField("**Kicked member ID:**", `${kickMember.id}`)
          .addField("**Moderator:**", `${message.author.username}`)
          .addField("**Reason:**", `${reasonxx}`)
    return message.guild.channels.get(modlog.id).sendEmbed(kembed)
        break;
    case "k":
    if(!message.member.hasPermission("KICK_MEMBERS")) 
    return message.reply("You pleb, you don't have the permission to use this command.").catch(console.error);
  let cacareason = args.slice(2).join(' ')
  if(!cacareason) 
    return message.reply("You must provide a reason for the kick")
  if(message.mentions.users.size === 0) 
    return message.reply("Please mention a user to kick").catch(console.error);
  let kkickMember = message.guild.member(message.mentions.users.first());
  if(!kkickMember) 
    return message.reply("That user does not seem valid");
  if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) 
    return message.reply("I don't have the permissions (KICK_MEMBER) to do this.").catch(console.error);
  if (!modlog) return message.reply("There is no `mod-log` channel in this guild...")
  kkickMember.kick().then(member => message.reply(`**${kkickMember.user.username}** was kicked...`))
      var kkembed = new Discord.RichEmbed()
        .setColor(0xFF4646)
        .addField("**Action**", "Kick")
        .addField("**Kicked member:**", `${kkickMember.username}`)
        .addField("**Kicked member ID:**", `${kkickMember.id}`)
        .addField("**Moderator:**", `${message.author.username}`)
        .addField("**Reason:**", `${cacareason}`)
  return message.guild.channels.get(modlog.id).sendEmbed(kkembed)
  break;
    case "kickinfo":
    if (!message.member.hasPermission("KICK_MEMBERS")) return;
    var kumembed = new Discord.RichEmbed()
        .setTitle("Kick command:")
        .addField("Description:", "Kicks a desired member for a reason.")
        .addField("Usage:", `//kick @user <reason>`)
        .addField("Aliases:", `//k @user <reason>`)
        .addField("*this command requires `KICK_MEMBERS` permission.*")
    message.channel.send(kumembed);
    break;
    case "help":
       var hembed = new Discord.RichEmbed()
       .setTitle(`**All Available Moderation Commands**`)
       .addField(`**kick**`, `- kicks a member from the guild [usage]: *::kick <mentioned.user> <reason>*`)
       .addField(`**ban**`, `- bans a members from the guild [usage]: *::ban <mentioned.user> <reason>* `)
       .addField(`**prune**`, `- clears a desired amount of messages [usage]: *::prune <number.of.messages>*`)
       .addField(`**mute**`, `- mutes a member for a desired amount of minutes [usage]: *::mute <mentioned.user> <time>*`)
       .addField(`**unmute**`, `- unmutes a desired member [usage]: *::unmute <mentioned.user>*`)
       .addField(`**setrole**`, `- assigns a desired role to somebody [usage]: *::setrole <mentioned.user> <role>* aliases - ::sr`)
       .addField(`**deleterole**`, `- removes a desired role from somebody [usage]: *::deleterole <mentioned.user> <role>* aliases - ::dr`)
       .addField(`**warn**`, `- warns a desired member [usage]: *::warn <mentioned.user>* <reason>`)
       .addField(`**warncount**`, `- displays how many warns someone has [usage]: *::warncount <mentioned.user>*`)
       .addField(`**delwarns**`, `- deletes all of someone's warns [usage]: *::delwarns <mentioned.user>*`)
       .addField("Use `<command>info` for more details.", "**e.g. muteinfo**")
       .setFooter(`Requested by: ${message.author.username}`)
       if (!message.member.permissions.has("MANAGE_MESSAGES")) return
        message.channel.sendEmbed(hembed)
        break;
    case "warn":
        if (!message.member.hasPermission("MANAGE_ROLES")) return
        if (!user) return message.reply("please mention someone to warn them")
                  .then(m => m.delete(2000));
        if (!reason) return message.reply("please provide a reason for the warning")
                  .then(m => m.delete(2000));
        if (!modlog) return message.reply("there's no `mod-log` channel in this server.")
                  .then(m => m.delete(2000));
                  sql.run(`INSERT INTO warns (userusername, reason, messageauthorusername) VALUES (?, ?, ?)`, [user.username, reason, message.author.username]);
                  sql.run("CREATE TABLE IF NOT EXISTS warns (userusername TEXT, reason INTEGER, messageauthorusername)").then(() => {
                    sql.run(`INSERT INTO warns (userusername, reason, messageauthorusername) VALUES (?, ?, ?)`, [user.username, reason, message.author.username]);
                })
        message.channel.sendMessage(`${user.username} was warned.`)
        .then(m => m.delete(2000));
        var warn = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setThumbnail(user.avatarURL)
        .addField('Action:', 'Warning:')
        .addField('User:', `${user.username}`)
        .addField('Moderator:', `${message.author.username}`)
        .addField("With reason:", `${reason}`)
        return message.guild.channels.get(modlog.id).send(warn);
        break;
    case "warninfo":
    if (!message.member.hasPermission("MANAGE_ROLES")) return;
    var wkumembed = new Discord.RichEmbed()
        .setTitle("Warn command:")
        .addField("Description:", "Warns a desired member for a reason.")
        .addField("Usage:", `//warn @user <reason>`)
        .addField("Aliases:", `none`)
        .addField("*this command requires `MANAGE_ROLES` permission.*")
    message.channel.send(wkumembed);
    break;
    case "warncount":
    if (!message.member.hasPermission("MANAGE_ROLES")) return 
     if (!user) return message.reply("please mention someone to display their warns")
    .then(m => m.delete(2000));
        sql.run("CREATE TABLE IF NOT EXISTS warns (userusername TEXT, reason INTEGER, messageauthorusername)").then(() => {
                    sql.run(`INSERT INTO warns (userusername, reason, messageauthorusername) VALUES (?, ?, ?)`, [user.username, reason, message.author.username]);
                })
        let info =  await sql.all(`SELECT * FROM warns WHERE userusername = "${user.username}"`);
        let warncount = 0
        for(warncount = 0; warncount < info.length; warncount ++) {}
        var embedd = new Discord.RichEmbed()
        .setColor("#e00808")
        .setDescription(user.username + " has " + warncount + " warnings.")
        console.log(warncount)
        message.channel.send(embedd)
        break;
    case "warncountinfo":
    if (!message.member.hasPermission("MANAGE_ROLES")) return;
    var cwkumembed = new Discord.RichEmbed()
        .setTitle("Warncount command:")
        .addField("Description:", "Shows how many warns someone has")
        .addField("Usage:", `//warncount @user`)
        .addField("Aliases:", `*none*`)
        .addField("*this command requires `MANAGE_ROLES` permission.*")
    message.channel.send(cwkumembed);
    break;
    case "delwarns":
    if (!message.member.hasPermission("MANAGE_ROLES")) return 
    if (!user) return message.reply("please mention someone to delet their warns")
    .then(m => m.delete(2000));
    if (!modlog) return message.reply("there's no `mod-log` channel in this server.")
    .then(m => m.delete(2000));
    sql.run("CREATE TABLE IF NOT EXISTS warns (userusername TEXT, reason INTEGER, messageauthorusername)").then(() => {
                    sql.run(`INSERT INTO warns (userusername, reason, messageauthorusername) VALUES (?, ?, ?)`, [user.username, reason, message.author.username]);
                })
    sql.run(`DELETE FROM warns WHERE userusername = "${user.username}"`);
        message.channel.sendMessage(`Deleted ${user.username}'s warnings.`)
            .then(m => m.delete(2000));
        var mata = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setThumbnail(user.avatarURL)
            .addField('Action:', 'Deleted warnings:')
            .addField('User:', `${user.username}`)
            .addField('Moderator:', `${message.author.username}`)
        return message.guild.channels.get(modlog.id).send(mata);
        break;
    case "delwarnsinfo":
    if (!message.member.hasPermission("MANAGE_ROLES")) return;
    var dcwkumembed = new Discord.RichEmbed()
        .setTitle("Deletewarns command:")
        .addField("Description:", "Deletes someone's warnings")
        .addField("Usage:", `//delwarns @user`)
        .addField("Aliases:", `*none*`)
        .addField("*this command requires `MANAGE_ROLES` permission.*")
    message.channel.send(dcwkumembed);
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
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return 
        const params = message.content.split(' ')
        let number = parseInt(params[1]);
        if (!number) return message.reply("please select a number of messages")
                                .then(m => m.delete(2000));
        message.channel.fetchMessages({limit: number}).then(messages => message.channel.bulkDelete(messages));
        message.channel.sendMessage(`:white_check_mark: Pruned \`${number}\` messages.`)
            .then(m => m.delete(2000));
        break;
    case "pruneinfo":
    if (!message.member.hasPermission("MANAGE_ROLES")) return;
    var pdcwkumembed = new Discord.RichEmbed()
        .setTitle("Prune command:")
        .addField("Description:", "Deletes a number of messages from a channel")
        .addField("Usage:", `//prune <number>`)
        .addField("Aliases:", `*delete*,*p*`)
        .addField("*this command requires `MANAGE_MESSAGES` permission.*")
    message.channel.send(pdcwkumembed);
    break;
    case "invite":
        message.channel.sendMessage("https://discordapp.com/api/oauth2/authorize?client_id=384688108442222593&scope=bot&permissions=1")
        break;
    case "invite fisher":
        message.channel.sendMessage("https://discordapp.com/api/oauth2/authorize?client_id=395292815309012992&scope=bot&permissions=1")
        break;
    case "setrole":
        let setroleto = message.guild.member(message.mentions.users.first());
        var role = args.slice(2).join(" "); 
        let role2 = message.guild.roles.find("name", `${role}`)
        if (!message.member.hasPermission("MANAGE_ROLES")) return 
        if (!message.guild.member(bot.user).hasPermission("MANAGE_ROLES")) return message.reply("I dont have enough perms to use this command.")
        .then(m => m.delete(2000));
        if(!setroleto) return ("mention someone to give them a role.")
        .then(m => m.delete(2000));
        if(!role) return message.reply("please, provide a role to assign to someone")
        .then(m => m.delete(2000));
        if (!role2) return message.reply(`that is not a valid role.`)
        .then(m => m.delete(2000));
        setroleto.addRole(role2.id)
        break;
    case "sr":
        let gaga = message.guild.member(message.mentions.users.first());
        var pupu = args.slice(2).join(" "); 
        let rolez = message.guild.roles.find("name", `${pupu}`)
        if (!message.member.hasPermission("MANAGE_ROLES")) return 
        if (!message.guild.member(bot.user).hasPermission("MANAGE_ROLES")) return message.reply("I dont have enough perms to use this command.")
        .then(m => m.delete(2000));
        if(!gaga) return ("mention someone to give them a role.")
        .then(m => m.delete(2000));
        if(!pupu) return message.reply("please, provide a role to assign to someone")
        .then(m => m.delete(2000));
        if (!rolez) return message.reply(`that is not a valid role`)
        .then(m => m.delete(2000));
        gaga.addRole(rolez.id)
        break;
    case "deleterole":
        let mama = message.guild.member(message.mentions.users.first());
        var tata = args.slice(2).join(" "); 
        let sora = message.guild.roles.find("name", `${tata}`)
        if (!message.member.hasPermission("MANAGE_ROLES")) return 
        if (!message.guild.member(bot.user).hasPermission("MANAGE_ROLES")) return message.reply("I dont have enough perms to use this command.")
        .then(m => m.delete(2000));
        if(!mama) return message.reply("mention someone to remove a role from them.")
        if(!tata) return ("please, provide a role to remove from someone")
        if (!sora) return message.reply(`that is not a valid role`)
        mama.removeRole(sora.id)
        break;
    case "dr":
    let gugu = message.guild.member(message.mentions.users.first());
    var tarcu = args.slice(2).join(" "); 
    let retezat = message.guild.roles.find("name", `${tarcu}`)
    if (!message.member.hasPermission("MANAGE_ROLES")) return 
    if (!message.guild.member(bot.user).hasPermission("MANAGE_ROLES")) return message.reply("I dont have enough perms to use this command.")
    .then(m => m.delete(2000));
    if(!gugu) return message.reply("mention someone to remove a role from them.")
    if(!tarcu) return ("please, provide a role to remove from someone")
    if (!retezat) return 
    gugu.removerole(retezat.id)
    break;
    case "setroleinfo":
    if (!message.member.hasPermission("MANAGE_ROLES")) return;
    var spdcwkumembed = new Discord.RichEmbed()
        .setTitle("Setrole command:")
        .addField("Description:", "Gives someone a desired role")
        .addField("Usage:", `//setrole @user <role>`)
        .addField("Aliases:", `*sr*`)
        .addField("*this command requires `MANAGE_ROLES` permission.*")
    message.channel.send(spdcwkumembed);
    break;
    case "deleteroleinfo":
    if (!message.member.hasPermission("MANAGE_ROLES")) return;
    var dspdcwkumembed = new Discord.RichEmbed()
        .setTitle("Deleterole command:")
        .addField("Description:", "Removes a desired role from someone")
        .addField("Usage:", `//deleterole @user <role>`)
        .addField("Aliases:", `*dr*`)
        .addField("*this command requires `MANAGE_ROLES` permission.*")
    message.channel.send(dspdcwkumembed);
    break;
    case "delete":
        var mm = message.mentions.members.first();
        const filterBy = mm ? mm.id : bot.user.id;
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return
        if (!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.reply("i dont have enough perms for this...")
        if (!args[1]) return message.reply(' you must specify an amount to delete!');
        if (!args[1] && !mm) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
        message.channel.fetchMessages({
        limit: args[1],
        }).then((messages) => {
        if (mm) {
        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, args);
        }
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
        })
        var EMdel = new Discord.RichEmbed()
        .setAuthor(message.author.username+ " #" + message.author.discriminator, message.author.avatarURL)
        .setColor(0xB70600)
        .setTimestamp()
        .setFooter("Delete")
        .setTitle("Deleted " + args[1] + " messages in " + message.channel.name + ".")
        var log = message.guild.channels.find("name", "mod-log");
        if (!log) return message.channel.send("You need to make a text channel called **mod-log** for this command to fully work!");
        message.guild.channels.get(log.id).send(EMdel);
        break;
    case "p":
    var mmm = message.mentions.members.first();
    const ffilterBy = mmm ? mmm.id : bot.user.id;
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return
    if (!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.reply("i dont have enough perms for this...")
    if (!args[0]) return message.reply(' you must specify an amount to delete!');
    if (!args[0] && !mmm) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
    message.channel.fetchMessages({
    limit: args[0],
    }).then((messages) => {
    if (mmm) {
    messages = messages.filter(m => m.author.id === ffilterBy).array().slice(0, args);
    }
    message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    })
    const EMdelet = new Discord.RichEmbed()
    .setAuthor(message.author.username+ " #" + message.author.discriminator, message.author.avatarURL)
    .setColor(0xB70600)
    .setTimestamp()
    .setFooter("Delete")
    .setTitle("Deleted " + args[0] + " messages in " + message.channel.name + ".")
    var logy = message.guild.channels.find("name", "mod-log");
    if (!logy) return message.channel.send("You need to make a text channel called **mod-log** for this command to fully work!");
    message.guild.channels.get(logy.id).send(EMdelet);
    break;
    case "crole":
        let actrole = args.slice(1).join(' ')
        if (!message.member.hasPermission("MANAGE_ROLES")) return
        if (!message.guild.member(bot.user).hasPermission("MANAGE_ROLES")) return message.reply("i dont have perms for that") 
        .then(m => m.delete(2000));
        if (!actrole) return 
        message.guild.createRole(actrole)
        break;
    case "ban":
    if(!message.member.hasPermission("BAN_MEMBERS"))
    return message.reply("You dont have permissions to use this command.").catch(console.error);
  if(message.mentions.users.size === 0) 
    return message.reply("Please mention a user to ban").catch(console.error);
  let banMember = message.mentions.users.first();
  if(!banMember) 
    return message.reply("That user does not seem valid");
  let reasonxxx = args.slice(2).join(' ')
    if(!reasonxxx) 
      return message.reply("You must provide a reason for the ban")
  if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) 
    return message.reply("I don't have the permissions (BAN_MEMBER) to do this.").catch(console.error);
  if (!modlog) return message.reply("There is no `mod-log` channel in this guild...")
  banMember.ban().then(member => message.reply(`**${member.user.username}** was banned...`))
      var kembed = new Discord.RichEmbed()
        .setColor(0xFF0000)
        .addField("**Action**", "Ban")
        .setThumbnail(banMember.avatarURL)
        .addField("**Banned member:**", `${banMember.user.username}`)
        .addField("**Banned member ID:**", `${banMember.id}`)
        .addField("**Moderator:**", `${message.author.username}`)
        .addField("**Reason:**", `${reasonxxx}`)
  return message.guild.channels.get(modlog.id).sendEmbed(kembed)
       break;
    default:
         message.reply("no")
    }
});
bot.login(process.env.BOT_TOKEN);



