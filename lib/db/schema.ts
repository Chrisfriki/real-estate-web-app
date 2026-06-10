import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  integer,
} from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- Leads table -----------------------------------------------------------
export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  // Paso 1
  provincia: text('provincia').notNull(),
  municipio: text('municipio').notNull(),
  direccion: text('direccion').notNull(),
  codigoPostal: text('codigo_postal').notNull(),
  // Paso 2
  tipo: text('tipo_inmueble').notNull(),
  metros: integer('metros').notNull(),
  habitaciones: integer('habitaciones').notNull(),
  banos: integer('banos').notNull(),
  // Paso 3
  estado: text('estado_conservacion').notNull(),
  planta: text('planta').notNull(),
  ascensor: boolean('ascensor').notNull().default(false),
  anio: integer('anio_edificacion'),
  vistas: text('vistas'),
  // Paso 4
  garaje: text('garaje').notNull(),
  trastero: boolean('trastero').notNull().default(false),
  exteriores: text('exteriores'),
  climatizacion: text('climatizacion'),
  orientacion: text('orientacion'),
  piscina: boolean('piscina').notNull().default(false),
  // Paso 5
  nombre: text('nombre').notNull(),
  telefono: text('telefono').notNull(),
  email: text('email').notNull(),
  plazo: text('plazo_venta').notNull(),
  comentarios: text('comentarios'),
  // Catastral document
  catastralDocPathname: text('catastral_doc_pathname'),
  catastralDocName: text('catastral_doc_name'),
})

export type LeadRow = typeof leads.$inferSelect
