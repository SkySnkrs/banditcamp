const WebSocket = require('ws');

const ws = new WebSocket('wss://api.bandit.camp/', {
  headers: {
    'Pragma': 'no-cache',
    'Origin': 'https://bandit.camp',
    'Accept-Language': 'en-US,en;q=0.9',
    'Sec-WebSocket-Key': 'uhS3yZBH/JJRAoZdcKXIqQ==',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 OPR/96.0.0.0',
    'Upgrade': 'websocket',
    'Cache-Control': 'no-cache',
    'Connection': 'Upgrade',
    'Sec-WebSocket-Version': '13',
    'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits'
  }
});

ws.on('open', function open() {
  console.log('WebSocket connection established.');

  const connectMsg = {
    "a": ["connect", {isTrusted: true}]
  };
  
  ws.send(JSON.stringify(connectMsg));

  const getTradeHistoryMsg = {
    "a": ["user.getTradeHistory", {pending: true, page: 1, limit: 25, sortBy: "createdAt", asc: false}],
    "i": 1
  };
  
  ws.send(JSON.stringify(getTradeHistoryMsg));

  const subscribeMsg = {
    "a": ["game.caseBattles.new"],
    "i": 2
  };
  
  ws.send(JSON.stringify(subscribeMsg));

  const subscribeChat = {
    "a": ["subscribe", "chat"],
    "i": 3
  };
  
  ws.send(JSON.stringify(subscribeChat));

  const chatHistory = {
    "a": ["chat.history", "lang-en"],
    "i": 4
  };
  
  ws.send(JSON.stringify(chatHistory));
});

ws.on('message', function incoming(data) {
  const message = JSON.parse(data.toString());
  console.log(message);
});
