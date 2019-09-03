const amqp = require('amqplib/callback_api');
const { ORDER_QUEUE } = require('../queueTypes');
const { errMessage } = require('../../../helpers/httpResponse');

const publish = (userId, name, street, city, state, zip,
  country, productsToCheckout, chosenRate) => {
  amqp.connect(process.env.RABBIT_MQ_HOST, (err, connection) => {
    if (err) {
      throw new Error(errMessage.FAILED_QUEUE_CONNECTION);
    }
    connection.createChannel((err1, channel) => {
      if (err1) {
        throw new Error(errMessage.FAILED_QUEUE_CONNECTION);
      }
      const body = {
        userId,
        name,
        street,
        city,
        state,
        zip,
        country,
        productsToCheckout,
        chosenRate,
      };

      channel.assertQueue(ORDER_QUEUE, {
        durable: false,
      });
      channel.sendToQueue(ORDER_QUEUE, Buffer.from(JSON.stringify(body)));
    });
    setTimeout(() => {
      connection.close();
    }, 500);
  });
};

module.exports = {
  publish,
};
