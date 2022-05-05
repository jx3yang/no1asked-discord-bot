const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('no1asked')
    .setDescription('Who asked? Exactly no one.'),
  command: async (interaction) => {
    const embed = new MessageEmbed()
      .setTitle('Now Playing - Who Asked? (feat. No one)')
      .setDescription('───────────⚪──────── \n ◄◄⠀▐▐ ⠀►► 2:40/4:20 ───○ 🔊⠀ ᴴᴰ ⚙️');
    interaction.reply({ embeds: [embed] });
  },
  enabled: true,
}
