const crypto = require('crypto');

class Radio {
  constructor() {
    this.topics = new Map();
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  broadcast(topic, message) {
    const key = crypto.randomBytes(16).toString('hex');
    const encryptedMessage = crypto.createCipher('aes-256-ctr', key)
                                  .update(message, 'utf8', 'hex');
    const payload = { topic, message: encryptedMessage, key };

    for (const listener of this.listeners) {
      if (listener.topics.has(topic)) {
        listener.notify(payload);
      }
    }
  }

  createTopic(topic) {
    if (!this.topics.has(topic)) {
      this.topics.set(topic, crypto.randomBytes(16).toString('hex'));
    }
  }
}

class Listener {
  constructor() {
    this.topics = new Set();
    this.radio = null;
  }

  subscribeToRadio(radio) {
    this.radio = radio;
    this.radio.subscribe(this);
  }

  unsubscribeFromRadio() {
    this.radio.unsubscribe(this);
    this.radio = null;
  }

  subscribeToTopic(topic) {
    this.topics.add(topic);
    this.radio.createTopic(topic);
  }

  unsubscribeFromTopic(topic) {
    this.topics.delete(topic);
  }

  notify(payload) {
    const { topic, message, key } = payload;
    const decryptedMessage = crypto.createDecipher('aes-256-ctr', key)
                                    .update(message, 'hex', 'utf8');
    console.log(`Topic: ${topic}; Message: ${decryptedMessage}`);
  }
}

const radio = new Radio();

const listener1 = new Listener();
listener1.subscribeToRadio(radio);
listener1.subscribeToTopic('news');

const listener2 = new Listener();
listener2.subscribeToRadio(radio);
listener2.subscribeToTopic('music');
listener2.subscribeToTopic('sports');

const listener3 = new Listener();
listener3.subscribeToRadio(radio);

setInterval(() => {
  radio.broadcast('news', 'Breaking news!');
  radio.broadcast('music', 'New album released!');
  radio.broadcast('sports', 'New champion!');
}, Math.floor(Math.random() * (1500 - 400 + 1)) + 400);

setTimeout(() => {
  listener1.unsubscribeFromTopic('news');
  listener2.unsubscribeFromTopic('music');
  listener2.unsubscribeFromTopic('sports');
}, 5000);

setTimeout(() => {
  listener1.unsubscribeFromRadio();
  listener2.unsubscribeFromRadio();
  listener3.unsubscribeFromRadio();
}, 10000);