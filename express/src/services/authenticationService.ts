import { v4 as generateId } from 'uuid';
import { hashSync, compareSync, genSaltSync } from 'bcryptjs';
import { ResponseMessage } from '../_types';
import Database from './database';
import { BCRYPT_SALT } from '../_config';

//
// ------------------------------------------TYPE DEFINITION------------------------------------------

type Account = {
  email?: string;
  name?: string;
  password?: string;
  address?: string;
  phone?: string;
};

//
// ------------------------------------------SERVICE OPERATIONS------------------------------------------

export const signup = (
  acc: Account,
  callback: (err: ResponseMessage | undefined, data?: ResponseMessage) => void
) => {
  // Check for missing infos
  if (!acc.email || !acc.password)
    return callback(new ResponseMessage(400, { error: 'MISSING REQUIRED INFORMATION' }));

  Database.serialize(() => {
    // Insert new account
    const statement =
      'INSERT INTO accounts (account_id,email,name,address,phone,password) VALUES(?,?,?,?,?,?)';
    const params = [
      generateId(),
      acc.email,
      acc.name,
      acc.address,
      acc.phone,
      encryptPassword(String(acc.password)),
    ];
    Database.run(statement, params, err => {
      if (err)
        return callback(
          new ResponseMessage(500, {
            error: 'INTERNAL ERROR WHILE INSERTING NEW ACCOUNT',
            detail: err,
          })
        );
    });

    // Query and return newly created account
    Database.all(
      'SELECT email,name,address,phone FROM ACCOUNTS WHERE email=?',
      [acc.email],
      (err, results) => {
        if (err)
          callback(
            new ResponseMessage(500, {
              error: 'INTERNAL ERROR WHILE QUERYING FOR NEWLY CREATED ACCOUNT',
              detail: err,
            })
          );
        else return callback(undefined, new ResponseMessage(200, results[0]));
      }
    );
  });
};

export const signin = (
  acc: Account,
  callback: (err: ResponseMessage | undefined, data?: ResponseMessage) => void
) => {
  // Check for missing infos
  if (!acc.email || !acc.password)
    return callback(new ResponseMessage(400, { error: 'MISSING REQUIRED INFORMATION' }));

  Database.serialize(() => {
    // Find account with matching email
    const statement = 'SELECT email,name,address,phone,password FROM accounts WHERE email=?';
    const params = [acc.email];
    Database.all(statement, params, (err, result) => {
      if (err)
        callback(
          new ResponseMessage(500, {
            error: 'INTERNAL ERROR WHILE FINDING ACCOUNT WITH MATCHING EMAIL',
            detail: err,
          })
        );
      // can't find account with matching email
      else if (!result.length)
        callback(new ResponseMessage(400, { error: 'NO MATCHING ACCOUNT ' }));
      // account found but password doesn't match
      else if (!checkPassword(acc.password!, result[0].password))
        return callback(new ResponseMessage(400, { error: 'WRONG PASSWORD' }));
      // successfully authenticated
      else
        return callback(
          undefined,
          new ResponseMessage(200, {
            email: result[0].email,
            name: result[0].name,
            address: result[0].address,
            phone: result[0].phone,
          })
        );
    });
  });
};

//
// ------------------------------------------UTILS------------------------------------------

const encryptPassword = (password: string) => {
  const salt = genSaltSync(parseInt(BCRYPT_SALT || '10'));
  return hashSync(password, salt);
};

const checkPassword = (uncheckedPassword: string, hashedPassword: string) =>
  compareSync(uncheckedPassword, hashedPassword);
