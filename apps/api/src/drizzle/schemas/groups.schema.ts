import {
  text,
  serial,
  pgTable,
  integer,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const usersToGroups = pgTable(
  'users_to_groups',
  {
    groupId: integer('group_id').references(() => groups.id),
    userId: integer('user_id').references(() => users.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.groupId, table.userId] }),
  }),
);
