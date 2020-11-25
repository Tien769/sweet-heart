import sqlite3 from 'sqlite3';
import session from 'express-session';
import sqliteStoreFactory from 'express-session-sqlite';
import { SESSION_SECRET } from '../_config';

const sqliteStore = sqliteStoreFactory(session);

const sessionManager = session({
	secret: String(SESSION_SECRET),
	resave: false,
	saveUninitialized: true,
	name: 'CatJam Cookie',
	cookie: {
		httpOnly: true,
		secure: false,
		maxAge: 1 * 365 * 24 * 60 * 60 * 1000,
		sameSite: 'lax',
	},
	store: new sqliteStore({
		driver: sqlite3.Database,
		path: './temp.sqlite',
		ttl: 1 * 365 * 24 * 60 * 60 * 1000,
	}),
});

export default sessionManager;
