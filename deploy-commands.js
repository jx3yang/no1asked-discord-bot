const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const isProd = process.env.ENVIRONMENT === 'prod';

if (!isProd) {
  const dotenv = require('dotenv');
  dotenv.config();
}  

const clientId = process.env.CLIENTID;
const guildId = process.env.GUILDID;
const token = process.env.TOKEN;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commands = commandFiles.flatMap(fileName => {
  const { data, enabled } = require(`./commands/${fileName}`);
  return enabled ? [data.toJSON()] : [];
});

const getApplicationCommands = () => {
  if (isProd) {
    return Routes.applicationCommands(clientId);
  }
  return Routes.applicationGuildCommands(clientId, guildId);
}

const rest = new REST({ version: '9' }).setToken(token);
rest.put(getApplicationCommands(), { body: commands })
  .then(() => {
    console.log('Successfully registered application commands.');
  })
  .catch(console.error);
