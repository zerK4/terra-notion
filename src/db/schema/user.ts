import { relations, sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { pages } from './pages';
import { archived } from './archived';

export const users = sqliteTable('user', {
  id: text('id').primaryKey().unique(),
  first_name: text('first_name'),
  last_name: text('last_name'),
  total_archived: integer('total_archived'),
  email: text('email').notNull().unique(),
  image: text('image'),
  last_opened: text('last_opened'),
  phone: text('phone'),
  created_at: integer('created_at').default(sql`CURRENT_TIMESTAMP`),
  updated_at: integer('created_at'),
});

export const usersRelations = relations(users, ({ many }) => ({
  pages: many(pages),
  archived: many(archived),
}));
