import { relations, sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { v4 } from 'uuid';
import { pages } from './pages';
import { archived } from './archived';

export const users = sqliteTable('users', {
  id: text('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => v4())
    .unique(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  total_archived: integer('total_archived'),
  email: text('email').notNull().unique(),
  last_opened: text('last_opened'),
  phone: text('phone'),
  created_at: integer('created_at').default(sql`CURRENT_TIMESTAMP`),
  updated_at: integer('created_at'),
});

export const usersRelations = relations(users, ({ many }) => ({
  pages: many(pages),
  archived: many(archived),
}));
