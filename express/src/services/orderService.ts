import { v4 } from 'uuid';
import { PlainObject, ResponseMessage } from '../_types';

import Database from './database';

export const addOrder = (
  user: PlainObject,
  items: PlainObject[],
  total: number,
  callback: (err: undefined | ResponseMessage, response?: ResponseMessage) => void
) => {
  Database.serialize(() => {
    const order_id = generateOrderId();
    Database.all('SELECT account_id FROM accounts WHERE email=?', [user.email], (err, result) => {
      if (err) callback(new ResponseMessage(500, { error: 'INTERNAL ERROR', detail: err }));
      if (result.length === 0)
        return callback(new ResponseMessage(500, { error: 'FOUND NOW MATCHING EMAIL' }));

      const account_id = result[0].account_id;
      Database.run(
        'INSERT INTO orders(order_id,account_id,total) VALUES(?,?,?)',
        [order_id, account_id, total],
        err => {
          return callback(new ResponseMessage(500, { error: 'INTERNAL ERROR', detail: err }));
        }
      );
    });

    items.forEach(item => {
      Database.run(
        'INSERT INTO orders_products(order_id,product_id,quantity) VALUES(?,?,?)',
        [order_id, item.product_id, item.quantity],
        err => {
          if (err)
            return callback(new ResponseMessage(500, { error: 'INTERNAL ERROR', detail: err }));
        }
      );
    });

    return callback(undefined, new ResponseMessage(200, { message: 'DONE' }));
  });
};

export const getAllOrders = (
  callback: (err: undefined | ResponseMessage, data?: ResponseMessage) => void
) => {
  Database.serialize(() => {
    Database.all('SELECt * FROM orders', (err, result) => {
      let data: PlainObject[] = [];
      if (err) return callback(new ResponseMessage(500, { error: 'INTERNAL ERROR', detail: err }));
      if (result.length === 0)
        return callback(
          undefined,
          new ResponseMessage(200, { message: 'No orders found', orders: result })
        );

      for (let i = 0; i < result.length; i++) {
        const o = result[i];
        let mail = '';
        Database.serialize(() => {
          Database.all(
            'SELECT email FROM accounts WHERE account_id=?',
            [o.account_id],
            (err, userResult) => {
              if (err)
                return callback(new ResponseMessage(500, { error: 'INTERNAL ERROR', detail: err }));
              mail = userResult[0].email;
              data[i] = { ...data[i], user: mail };
            }
          );

          Database.all(
            'SELECT product_id,quantity FROM orders_products WHERE order_id=?',
            [o.order_id],
            (err, prodResult) => {
              if (err)
                return callback(new ResponseMessage(500, { error: 'INTERNAL ERROR', detail: err }));
              data[i] = { ...data[i], items: prodResult };
              if (i === result.length - 1)
                return callback(undefined, new ResponseMessage(200, { orders: data }));
            }
          );
        });
      }
    });
  });
};
const generateOrderId = () => `ord-${v4()}`;
