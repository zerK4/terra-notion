import { relations, sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { v4 } from 'uuid';
import { users } from './user';

export const pages = sqliteTable('pages', {
  id: text('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => v4())
    .unique(),
  name: text('name').notNull(),
  created_at: integer('created_at').default(sql`CURRENT_TIMESTAMP`),
  editable: integer('editable', { mode: 'boolean' }).default(true),
  shared_link: text('shared_link').unique(),
  user_id: text('user_id').notNull(),
  updated_at: text('updated_at'),
  cover_image: text('cover_image'),
  icon: text('icon'),
  json: text('json', { mode: 'json' }).notNull(),
});

export const pagesRelations = relations(pages, ({ one, many }) => ({
  user: one(users, {
    fields: [pages.user_id],
    references: [users.id],
  }),
}));
