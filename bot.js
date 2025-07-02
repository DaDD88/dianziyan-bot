const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

const products = [
  {
    name: '芒果口味',
    desc: '清新香甜，夏日必备',
    img: 'https://www.dianziyan.plus/images/flavor_mango.jpg',
    meta: '销量 10000+ · 满减包邮',
  },
  {
    name: '荔枝口味',
    desc: '清爽多汁，甜而不腻',
    img: 'https://www.dianziyan.plus/images/flavor_lychee.jpg',
    meta: '销量 9000+ · 新品推荐',
  },
  {
    name: '葡萄口味',
    desc: '经典紫葡萄，香气浓郁',
    img: 'https://www.dianziyan.plus/images/flavor_grape.jpg',
    meta: '销量 8000+ · 果香浓郁',
  },
  {
    name: '原味',
    desc: '回归本真，顺滑自然',
    img: 'https://www.dianziyan.plus/images/flavor_original.jpg',
    meta: '销量 7500+ · 百搭口味',
  },
  {
    name: '菠萝口味',
    desc: '酸甜平衡，清爽怡人',
    img: 'https://www.dianziyan.plus/images/flavor_pineapple.jpg',
    meta: '销量 7200+ · 果香清新',
  },
  {
    name: '苹果口味',
    desc: '红苹果风味，清脆口感',
    img: 'https://www.dianziyan.plus/images/flavor_apple.jpg',
    meta: '销量 6800+ · 烟气饱满',
  },
];

bot.start((ctx) => {
  ctx.reply('欢迎来到倩倩商城 Bot！发送 /products 查看全部产品或输入口味关键词搜索。');
});

bot.command('products', async (ctx) => {
  for (const item of products) {
    await ctx.replyWithPhoto(
      { url: item.img },
      {
        caption: `【${item.name}】\n${item.desc}\n${item.meta}`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '点击联系', url: 'https://t.me/lllkkk9900' }],
          ],
        },
      }
    );
  }
});

bot.on('text', async (ctx) => {
  const keyword = ctx.message.text.trim();
  const found = products.find((p) => p.name.includes(keyword) || p.desc.includes(keyword));
  if (found) {
    await ctx.replyWithPhoto(
      { url: found.img },
      {
        caption: `【${found.name}】\n${found.desc}\n${found.meta}`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '点击联系', url: 'https://t.me/lllkkk9900' }],
          ],
        },
      }
    );
  } else {
    ctx.reply('未找到匹配的产品，请重试关键词（如“芒果”、“原味”等）');
  }
});

bot.launch();
