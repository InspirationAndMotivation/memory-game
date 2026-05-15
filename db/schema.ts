import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const scores = pgTable("scores", {
  id: serial().primaryKey(),
  name: text().notNull(),
  score: integer().notNull(),
  turns: integer().notNull(),
  time: text().notNull(),
  mode: text().notNull(),
  difficulty: text().notNull(),
  created_at: timestamp("created_at").defaultNow(),
});
