const amqp = require('amqplib');
const { ORDER_QUEUE } = require('../queueTypes');
const orderAction = require('../../../actions/order.action');

const consume = (connection, channel) => new Promise(async (resolve, reject) => {
  channel.consume(ORDER_QUEUE, async (msg) => {
    const {
      userId,
      name,
      street,
      city,
      state,
      zip,
      country,
      productsToCheckout,
      chosenRate,
    } = JSON.parse(msg.content);

    try {
      await orderAction.create(userId, name, street, city, state,
        zip, country, productsToCheckout, chosenRate);
    } catch (err) {
      // log error
    } finally {
      await channel.ack(msg);
    }

    connection.on('close', err => reject(err));
    connection.on('error', err => reject(err));
  });
});

const listen = async () => {
  const connection = await amqp.connect(process.env.RABBIT_MQ_HOST);
  const channel = await connection.createChannel();
  await channel.prefetch(1);

  try {
    await consume(connection, channel);
  } catch (err) {
    // log error
  }
};

module.exports = {
  consume,
  listen,
};
