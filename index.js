require('dotenv').config();

const Discord = require('discord.js');
const axios = require('axios');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  if (message.content.startsWith('!nfl player')) {
    const playerName = message.content.split(' ').slice(2).join(' ');
    try {
      const response = await axios.get(`https://api.sportsdata.io/v3/nfl/stats/json/PlayerSeasonStatsByPlayerID/2022/${playerName}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.NFL_API_KEY
        }
      });
      const playerData = response.data[0];
      message.channel.send(`**${playerData.Name}**\nPosition: ${playerData.Position}\nTeam: ${playerData.Team}\nTotal Yards: ${playerData.TotalYards}\nTotal Touchdowns: ${playerData.TotalTouchdowns}`);
    } catch (error) {
      console.error(error);
      message.channel.send(`Sorry, I couldn't find information about the ${playerName} player.`);
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
