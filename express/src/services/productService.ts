import { Statement } from 'sqlite3';
import { callbackify } from 'util';
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

export const searchProducts = (queryOption: QueryOption, callback: (err: any, list?: Array<Product>) => void) => {
	Database.serialize(() => {
		const queryCondition = getQueryCondition(queryOption);
		const statement = 'SELECT * FROM products' + (queryCondition && ` WHERE ${queryCondition}`);

		Database.all(statement, (err, rows) => {
			if (err) return callback(new ResponseMessage(500, { error: 'INTERNAL ERROR', detail: err }));
			else return callback(undefined, rows);
		});
	});
};

// ----------------------------------------UTILS----------------------------------------
const getQueryCondition = (queryOption: QueryOption) => {
	const conditions = Object.getOwnPropertyNames(queryOption);
	return conditions.reduce((conditionString, condition, index) => {
		const option = (queryOption as PlainObject)[`${condition}`]
			? `${condition}='${(queryOption as PlainObject)[`${condition}`]}'`
			: '';
		conditionString = conditionString.concat(option, ' ');
		return conditionString.concat(conditionString != '' && index != conditions.length - 1 ? 'and ' : '');
	}, '');
};
