import { relations } from "drizzle-orm";
import {
	bigint,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	email: text("email").notNull(),
	name: text("name").notNull(),
	passwordHash: text("password_hash").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});


export const admins = pgTable("admins", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	passwordHash: text("password_hash").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
})

export const folders = pgTable("folders", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	parentId: integer("parent_id").references((): any => folders.id, {
		onDelete: "cascade",
	}),
	ownerId: integer("integer")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const files = pgTable("files", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	folderId: integer("folder_id").references(() => folders.id, {
		onDelete: "cascade",
	}),
	ownerId: integer("owner_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	storagePath: text("storage_path").notNull(),
	size: bigint("size", { mode: "number" }).notNull().default(0),
	mimeType: text("mime_type"),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});

// --- relations (optional, but makes joins/queries nicer) ---
export const usersRelations = relations(users, ({ many }) => ({
	folders: many(folders),
	files: many(files),
}));

export const foldersRelations = relations(folders, ({ one, many }) => ({
	owner: one(users, { fields: [folders.ownerId], references: [users.id] }),
	parent: one(folders, {
		fields: [folders.parentId],
		references: [folders.id],
		relationName: "folder_tree",
	}),
	children: many(folders, { relationName: "folder_tree" }),
	files: many(files),
}));

export const filesRelations = relations(files, ({ one }) => ({
	owner: one(users, { fields: [files.ownerId], references: [users.id] }),
	folder: one(folders, { fields: [files.folderId], references: [folders.id] }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Folder = typeof folders.$inferSelect;
export type NewFolder = typeof folders.$inferInsert;
export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;
export type Admin = typeof admins.$inferSelect;