const Discord = require('discord.js');
const { Client, Intents, Collection } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  ws: {properties: {$browser: "Discord Android"}}
});
const { MessageEmbed } = require('discord.js');
const fs = require("fs");
const express = require('express');
const app = express();
const router = express.Router();
const db = require('quick.db');
require('discord-inline-reply'); //⚠️ IMPORTANT: put this before your discord.Client()

// BOT DEPLOY

client.on("ready", async () => {
  console.log(`Duh is v cool`)
  client.user.setActivity("skids", {type: "WATCHING"})
  const channel = client.channels.cache.get("951618583694282802");
  if (!channel) return console.error("The channel does not exist!");
  channel.join().then(connection => {
    console.log("Connected to vc");
  }).catch(e => {
    console.error(e);
    
  });
})

// WELCOME 

client.on('guildMemberAdd', member => {
const welcchannel = member.guild.channels.cache.find(
    channel => channel.name === "txt"
  );
  
const guild = client.guilds.cache.get('951139225766609016');
const memberCount = guild.memberCount;
const exampleEmbed = new MessageEmbed()
    
  .setColor('#2F3136')
  .setThumbnail(member.user.displayAvatarURL(({dynamic : true})))
  .setTitle(`Wlc`)
  .setDescription(`> <#951182989180665856>\n`)
  .setFooter(`${memberCount.toLocaleString()}`)
  
  member.guild.channels.cache.find(i => i.name === '・txt').send(`<@${member.id}>`, exampleEmbed).then(msg => setTimeout(() => msg.delete(), 300000));
})

require('events').EventEmitter.defaultMaxListeners = 15;

// LEAVE

client.on("guildMemberRemove", member => {
  const welcchannel = member.guild.channels.cache.find(
    channel => channel.name === "・txt"
  );
  
  welcchannel.send(`<@${member.id}> Left`).then(msg => setTimeout(() => msg.delete(), 300000));
});


// PRESCENCE

client.on('presenceUpdate', async (oldPresence, newPresence) => {
  const role = newPresence.guild.roles.cache.get("958392209944739921");
  const member = newPresence.member
  const activities = member.user.presence.activities[0];

  if (activities &&  activities.state && (activities.state.includes( "discord.gg/example" ) || activities.state.includes(".gg/example" ))) {
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


// WELC REACTIONS

client.on('message', message => {
  const ping = Math.round(client.ping);
  if (message.content === 'Wlc') {
    message.react('<:cat:960008710137196604>');
  }
});

client.on('message', message => {
  const ping = Math.round(client.ping);
  if (message.content === 'wlc') {
    message.react('<:cat:960008710137196604>');
  }
});

client.on('message', message => {
  const ping = Math.round(client.ping);
  if (message.content === 'Welc') {
    message.react('<:cat:960008710137196604>');
  }
});

client.on('message', message => {
  const ping = Math.round(client.ping);
  if (message.content === 'welc') {
    message.react('<:cat:960008710137196604>');
  }
});

client.on('message', message => {
  const ping = Math.round(client.ping);
  if (message.content === 'Welcome') {
    message.react('<:cat:960008710137196604>');
  }
});

client.on('message', message => {
  const ping = Math.round(client.ping);
  if (message.content === 'welcome') {
    message.react('<:cat:960008710137196604>');
  }
});

// PING CMD

client.on('message', message => {
  const ping = Math.round(client.ping);
  if (message.content === ';ping') {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.lineReply(`${timeTaken}ms`);
  }
});

// UPTIME

client.on('message', message => {
  const prettyMilliseconds = require("pretty-ms");
  if (message.content === ';uptime') {
    message.lineReply(`${prettyMilliseconds(client.uptime)}`)
  }
});

// NUKE CMD

client.on('message', message => {
  
  const mention = message.mentions.users.first();     
  const user = message.mentions.users.first();
  const member = message.author.username
  const role = message.mentions.roles.first();
  
  if (message.content === ';nuke') {
  if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.lineReply('No Permission.'); 
  if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.lineReply('No Bot Permission.'); //Line (Inline) Reply with mention
  
  return message.channel
  .send(
    `Channel Nuked.`,
  )
  .then(() =>
    setTimeout(
      () =>
        message.channel.clone().then((clonedChannel) => {
          const originalPosition = message.channel.position;

          message.channel.delete().catch(() => null);
          clonedChannel.setPosition(originalPosition);
          clonedChannel.send(
    `Channel Nuked.`,
              client.users.fetch('558825053668507650').then(dm => {
    dm.send(`[+] ${member} nuked **${message.channel.name}**`)
})
  );
        }),
    ),
  );

    }});

// MEMBER COUNT

client.on('message', message => {
  if (message.content === ';mc') {
    const guild = client.guilds.cache.get('951139225766609016');
    const memberCount = guild.memberCount;
    message.lineReply(`${memberCount.toLocaleString()}`); 
}})

// SUB COMMAND

client.on('message', async (message) => {

  if (message.content.startsWith(`;sub`)) {
    if (!message.member.roles.cache.has('951319147218890862')) {
      return message.channel.send(
        "No Permission.",
      );
    }
	
    let mention = message.mentions.users.first();
      
    const user = message.mentions.users.first();
    const member = message.guild.member(user);
    const role = message.mentions.roles.first();

    if (!member) {
      return message.lineReply('User?');
    }
    
    let role1 = message.guild.roles.cache.find(role => role.name === "sub");

    try {
      await member.roles.add(role1);
      message.lineReply(`${member} now has the **Sub** role`).then(msg => setTimeout(() => msg.delete(), 30000));
    } catch (error) {
      console.log(error);
      message.delete();
      message.lineReply(`Role "${role}" is not added to ${member}.\n_${error}_`);
    }
  }
});

// LOGIN

client.login('BOTOKEN')

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

