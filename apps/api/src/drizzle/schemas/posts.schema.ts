import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  authorId: integer('author_id').references(() => users.id),
});
