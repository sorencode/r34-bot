const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.TOKEN;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  if (message.content.startsWith('!r34')) {

    if (!message.channel.nsfw) {
      return message.reply('❌ هذا الأمر يعمل فقط في قنوات NSFW');
    }

    const tag = message.content.split(' ').slice(1).join(' ');

    const url = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=${tag}+-ai_generated+-stable_diffusion+score:100`;

    try {

      const res = await axios.get(url);

      if (!res.data.length) {
        return message.reply('ماكو نتائج 😅');
      }

      const random = res.data[Math.floor(Math.random() * res.data.length)];

      message.channel.send(random.file_url);

    } catch (err) {
      console.log(err);
      message.reply('صار خطأ بالسحب');
    }
  }
});

client.login(TOKEN);