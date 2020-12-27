import { PlainObject, ResponseMessage } from '../_types';
import Database from './database';

interface Product {
  name: string;
  type: string;
  price: number;
  img_path: string;
}

interface QueryOption {
  name: string;
  type: string;
  [key: string]: any;
}

// ----------------------------------------SERVICE OPERATION----------------------------------------
export const getAllProducts = (callback: (err: any, list?: Array<Product>) => void) => {
  Database.serialize(() => {
    Database.all('SELECT * FROM products;', (err, rows) => {
      if (err) return callback(new ResponseMessage(500, { error: 'INTERNAL ERROR', detail: err }));
      else return callback(undefined, rows);
    });
  });
};

export const getProduct = (product_id: any, callback: (err: any, prod?: Product) => void) => {
  Database.all('SELECT * FROM products WHERE product_id=?', [product_id], (err, result) => {
    callback(err, result[0]);
  });
};

export const searchProducts = (
  queryOption: QueryOption,
  callback: (err: any, list?: Array<Product>) => void
) => {
  Database.serialize(() => {
    const queryCondition = getQueryCondition(queryOption);
    const statement = 'SELECT * FROM products' + (queryCondition && ` WHERE ${queryCondition}`);

    Database.all(statement, (err, rows) => {
      if (err) return callback(new ResponseMessage(500, { error: 'INTERNAL ERROR', detail: err }));
      else return callback(undefined, rows);
    });
  });
};

export const addProduct = (prod: PlainObject, callback: (err: any, id: number) => void) => {
  Database.serialize(() => {
    Database.all('SELECT COUNT(product_id) FROM products', [], (err, result) => {
      if (err) console.log(err);
      const prodId = result[0]['COUNT(product_id)'];

      Database.run(
        'INSERT INTO products(product_id,type,name,price,img) VALUES(?,?,?,?,?)',
        [prodId + 1, prod.type, prod.name, prod.price, String(prodId + 1)],
        err => (err ? console.log(err) : callback(undefined, prodId + 1))
      );
    });
  });
};

export const removeProduct = (id: number, callback: (err: any) => void) => {
  console.log(id);
  Database.run('DELETE FROM products WHERE product_id=?', [id], err => callback(err));
};

// ----------------------------------------UTILS----------------------------------------
const getQueryCondition = (queryOption: QueryOption) => {
  const conditions = Object.getOwnPropertyNames(queryOption);
  return conditions.reduce((conditionString, condition, index) => {
    const value = queryOption[`${condition}`];
    let option = '';
    if (value) {
      if (condition === 'name') option = `${condition} like '%${value}%'`;
      else option = `${condition}='${value}'`;
    }
    conditionString = conditionString.concat(option, '');
    return conditionString.concat(
      conditionString != '' && index != conditions.length - 1 ? ' and ' : ''
    );
  }, '');
};
