const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');

if (process.env.ENVIRONMENT !== 'prod') {
  const dotenv = require('dotenv');
  dotenv.config();
}

const token = process.env.TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS ]});
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
commandFiles.forEach(fileName => {
  const { data, command, enabled } = require(`./commands/${fileName}`);
  if (enabled) {
    client.commands.set(data.name, command);
  }
});

client.once('ready', () => {
  console.log('ready');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const command = client.commands.get(interaction.commandName);
  if (!command) {
    return;
  }

  try {
    await command(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
  }
});

client.login(token);
