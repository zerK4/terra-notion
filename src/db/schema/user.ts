import { relations, sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { pages } from './pages';
import { archived } from './archived';
import { session } from './session';

export const users = sqliteTable('user', {
  id: text('id').primaryKey().unique(),
  name: text('name'),
  total_archived: integer('total_archived'),
  email: text('email').notNull().unique(),
  image: text('image'),
  token: text('token').unique(),
  last_opened: text('last_opened'),
  phone: text('phone'),
  created_at: integer('created_at').default(sql`CURRENT_TIMESTAMP`),
  updated_at: integer('created_at'),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  pages: many(pages),
  archived: many(archived),
  session: one(session),
}));

export type UserType = typeof users;
