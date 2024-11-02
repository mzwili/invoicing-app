import { pgTable,pgEnum, serial, timestamp, integer, text } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum('status',['open', 'paid', 'void', 'uncollectable'])

export const Invoices = pgTable( "invoices",{
    id: serial('id').primaryKey().notNull(),
    createTs: timestamp('createTs').defaultNow().notNull(),
    status: statusEnum('status'),
    amount: integer('amount').notNull(),
    description: text('description').notNull()
})