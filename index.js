// hey skids, if your gonna use my shit at least give me credits :pray:

// PACKAGES INSTALL THEM 

const Discord = require('discord.js');
const client = new Discord.Client({ws: {properties: {$browser: "Discord Android"}}}) // lol mobile status remove this if u want
const { MessageEmbed } = require('discord.js');
const express = require('express');
const app = express();
const router = express.Router();
const db = require('quick.db');
require('discord-inline-reply');

// Vars for speds like mxrsik LMAO

const guildID = 'UR GUILD ID'
const statusActivty = 'ACTIVY MESSAGE'
const welcomeChannel = 'WELCOME CHANNEL NAME' // dont fucking put in the id, i made it easier for dumbasses
const leaveChannel = 'Leave CHANNEL' // dont fucking put in the id, i made it easier for dumbasses
const boostChannel = 'BOOST CHANNEL' // dont fucking put in the id, i made it easier for dumbasses
const statusRole = 'STATUS ROLE ID'

// STARTUP

let server = app.listen(6000, function(){
  console.log("App server is running on port 6000");
  console.log("to end press Ctrl + C");
});

client.on("ready", async () => {
  console.log(`Bot is has been deployed 🚀`)
  client.user
    .setActivity(statusActivty, { type: "WATCHING" }) //status code
    .catch(error => console.log(error))
})

// WELCOME

client.on('guildMemberAdd', member => {
const welcchannel = member.guild.channels.cache.find(
    channel => channel.name === welcomeChannel
  );
  
const guild = client.guilds.cache.get(guildID);
const memberCount = guild.memberCount;
const exampleEmbed = new MessageEmbed()

  .setColor('#2F3136')
  .setThumbnail(member.user.displayAvatarURL(({dynamic : true})))
  .setTitle(`Wlc`)
  .setDescription(`> Desc`)
  .setFooter(`${memberCount.toLocaleString()}`)
  
  welcchannel.send(`<@${member.id}>`,exampleEmbed).then(msg => setTimeout(() => msg.delete(), 300000));

})

// LEAVE 

client.on("guildMemberRemove", member => {
  const welcchannel = member.guild.channels.cache.find(
    channel => channel.name === leaveChannel
  );
  
  welcchannel.send(`<@${member.id}> Left`).then(msg => setTimeout(() => msg.delete(), 300000));
});

// BOOST

client.on("guildMemberUpdate", (oldMember, newMember) => {
    const oldstatus = oldMember.premiumsince;
    const newStatus = newMember.premiumsince;
  
    if (!oldstatus && newStatus) {
        client.channels.cache
            .get(channel.name === boostChannel)
            .send(`${newMember.user.tag} has boosted the server!`); I
        newMember.send('Thanks for boosting the server!')
    }
    if (oldstatus && !newstatus) {
        client.channels.cache
            .get (channel.name === boostChannel)
            .send(`${newMember.user.tag} has unboosted the server!`);
    }
});


// PRESCENCE

client.on('presenceUpdate', async (oldPresence, newPresence) => {
  const role = newPresence.guild.roles.cache.get(statusRole);
  const member = newPresence.member
  const activities = member.user.presence.activities[0];

  if (activities &&  activities.state && (activities.state.includes( "test" ) || activities.state.includes(".gg/changethislol" ))) {
      return newPresence.member.roles.add(role)
      .catch(err => {
      console.log(err)
      return;
      })

    }
  else {
    if(member.roles.cache.get(role.id)) {
      newPresence.member.roles.remove(role)
    }
  }
})

// PING CMD ( doesn't really work and outputs sum dumbass letters )

client.on('message', message => {
  const ping = Math.round(client.ping);
  if (message.content === ';ping') {
    message.channel.send('**Pong!**').then(message => {
      message.edit("**Pong!** Bot Latency : ``" + ping + "ms``")
    })
  }
});

// UPTIME CMD

client.on('message', message => {
  const prettyMilliseconds = require("pretty-ms");
  if (message.content === ';uptime') {
    message.lineReply(`${prettyMilliseconds(client.uptime)}`)
  }
});

// NUKE CHANNEL COMMAND ( Go fuck yourself if you thought this was for nuking a server u clown )

client.on('message', message => {
  if (message.content === ';nuke') {
  if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.lineReply('No Permission.'); 
  if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.lineReply('No Bot Permission.'); //Line (Inline) Reply with mention
  
  message.channel.clone().then(channel => channel.send('Channel Nuked'));
  message.channel.delete();
    }});

// MEMBER COUNT

client.on('message', message => {
  if (message.content === ';mc') {
    const guild = client.guilds.cache.get(guildID);
    const memberCount = guild.memberCount;
    message.lineReply(`${memberCount.toLocaleString()}`); 
}})

// SNIPE

client.on('messageDelete', async (message) => {
    db.set(`snipemsg_${message.channel.id}`, message.content)
    db.set(`snipesender_${message.channel.id}`, message.author.id)
})

client.on('message', message => {
    if(message.content === ';snipe') {
        let msg = db.get(`snipemsg_${message.channel.id}`)
        let senderid = db.get(`snipesender_${message.channel.id}`)
        if(!msg) {
            return message.channel.send(`Nothing to snipe.`)
        }
        let embed = new Discord.MessageEmbed()
        .setTitle(client.users.cache.get(senderid).username, client.users.cache.get(senderid).displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(` > ${msg} `)
        .setColor("#2F3136")
        .setTimestamp()
        message.channel.send(embed)
    }
})

// LOGIN

client.login(process.env.TOKEN)

// ANTI CRASH

const colors = require(`colors`);

process.on('unhandledRejection', (reason, p) => {
    console.log('\n\n\n\n\n[🚩 Anti-Crash] unhandled Rejection:'.toUpperCase().red.dim);
    console.log(reason.stack.yellow.dim ? String(reason.stack).yellow.dim : String(reason).yellow.dim);
    console.log('=== unhandled Rejection ===\n\n\n\n\n'.toUpperCase().red.dim);
  });
  process.on("uncaughtException", (err, origin) => {
    console.log('\n\n\n\n\n\n[🚩 Anti-Crash] uncaught Exception'.toUpperCase().red.dim);
    console.log(err.stack.yellow.dim ? err.stack.yellow.dim : err.yellow.dim)
    console.log('=== uncaught Exception ===\n\n\n\n\n'.toUpperCase().red.dim);
  })
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('[🚩 Anti-Crash] uncaught Exception Monitor'.toUpperCase().red.dim);
  });
  process.on('beforeExit', (code) => {
    console.log('\n\n\n\n\n[🚩 Anti-Crash] before Exit'.toUpperCase().red.dim);
    console.log(code.yellow.dim);
    console.log('=== before Exit ===\n\n\n\n\n'.toUpperCase().red.dim);
  });
  process.on('exit', (code) => {
    console.log('\n\n\n\n\n[🚩 Anti-Crash] exit'.toUpperCase().red.dim);
    console.log(code.yellow.dim);
    console.log('=== exit ===\n\n\n\n\n'.toUpperCase().red.dim);
  });
  process.on('multipleResolves', (type, promise, reason) => {
    console.log('\n\n\n\n\n[🚩 Anti-Crash] multiple Resolves'.toUpperCase().red.dim);
    console.log(type, promise, reason.yellow.dim);
    console.log('=== multiple Resolves ===\n\n\n\n\n'.toUpperCase().red.dim);
  });

