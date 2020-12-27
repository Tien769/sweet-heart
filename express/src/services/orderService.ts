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

    Database.run(
      'INSERT INTO orders(order_id,email,total) VALUES(?,?,?)',
      [order_id, user.email, total],
      err => {
        return callback(new ResponseMessage(500, { error: 'INTERNAL ERROR', detail: err }));
      }
    );

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
        Database.all(
          'SELECT product_id,quantity FROM orders_products WHERE order_id=?',
          [o.order_id],
          (err, prodResult) => {
            if (err)
              return callback(new ResponseMessage(500, { error: 'INTERNAL ERROR', detail: err }));
            data[i] = { ...data[i], detail: o, items: prodResult };
            if (i === result.length - 1)
              return callback(undefined, new ResponseMessage(200, { orders: data }));
          }
        );
      }
    });
  });
};

export const removeOrder = (id: any, callback: (err: any) => void) => {
  Database.serialize(() => {
    Database.run('DELETE FROM orders_products WHERE order_id=?', [id], err => {
      if (err) callback(err);
    });

    Database.run('DELETE FROM orders WHERE order_id=?', [id], err => callback(err));
  });
};

const generateOrderId = () => `ord-${v4()}`;
