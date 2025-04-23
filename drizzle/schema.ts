import { pgTable, uuid, text, timestamp, foreignKey, unique, check, integer, index, numeric, interval, boolean, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const bookingStatus = pgEnum("booking_status", ['CONFIRMED', 'CANCELLED', 'COMPLETED'])
export const paymentMethod = pgEnum("payment_method", ['eSewa', 'Khalti', 'Card', 'Cash'])
export const tripStatus = pgEnum("trip_status", ['SCHEDULED', 'CANCELLED', 'COMPLETED'])
export const userRole = pgEnum("user_role", ['PASSENGER', 'ADMIN', 'AGENT'])


export const operator = pgTable("operator", {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	fullName: text("full_name").notNull(),
	contact: text(),
	email: text(),
	logoUrl: text("logo_url"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const bus = pgTable("bus", {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	operatorId: uuid("operator_id"),
	numberPlate: text("number_plate").notNull(),
	busModel: text("bus_model"),
	totalSeats: integer("total_seats").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.operatorId],
			foreignColumns: [operator.id],
			name: "bus_operator_id_fkey"
		}).onDelete("cascade"),
	unique("bus_number_plate_key").on(table.numberPlate),
	check("bus_total_seats_check", sql`total_seats > 0`),
]);

export const trip = pgTable("trip", {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	busId: uuid("bus_id"),
	routeId: uuid("route_id"),
	departureTime: timestamp("departure_time", { mode: 'string' }).notNull(),
	arrivalTime: timestamp("arrival_time", { mode: 'string' }),
	price: numeric({ precision: 10, scale:  2 }).notNull(),
	availableSeats: integer("available_seats").notNull(),
	status: tripStatus().default('SCHEDULED'),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_trip_departure").using("btree", table.departureTime.asc().nullsLast().op("timestamp_ops")),
	foreignKey({
			columns: [table.busId],
			foreignColumns: [bus.id],
			name: "trip_bus_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.routeId],
			foreignColumns: [route.id],
			name: "trip_route_id_fkey"
		}),
]);

export const route = pgTable("route", {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	startLocation: text("start_location").notNull(),
	endLocation: text("end_location").notNull(),
	distanceKm: numeric("distance_km", { precision: 6, scale:  2 }),
	estimatedTime: interval("estimated_time"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const seat = pgTable("seat", {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	tripId: uuid("trip_id"),
	seatNumber: text("seat_number").notNull(),
	isBooked: boolean("is_booked").default(false),
}, (table) => [
	index("idx_seat_trip_id").using("btree", table.tripId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.tripId],
			foreignColumns: [trip.id],
			name: "seat_trip_id_fkey"
		}).onDelete("cascade"),
	unique("seat_trip_id_seat_number_key").on(table.tripId, table.seatNumber),
]);

export const user = pgTable("user", {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	fullName: text("full_name").notNull(),
	email: text().notNull(),
	phone: text().notNull(),
	password: text().notNull(),
	role: userRole().default('PASSENGER'),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_user_email").using("btree", table.email.asc().nullsLast().op("text_ops")),
	unique("user_email_key").on(table.email),
	unique("user_phone_key").on(table.phone),
]);

export const booking = pgTable("booking", {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	userId: uuid("user_id"),
	tripId: uuid("trip_id"),
	seatId: uuid("seat_id"),
	bookingTime: timestamp("booking_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	status: bookingStatus().default('CONFIRMED'),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "booking_user_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.tripId],
			foreignColumns: [trip.id],
			name: "booking_trip_id_fkey"
		}),
	foreignKey({
			columns: [table.seatId],
			foreignColumns: [seat.id],
			name: "booking_seat_id_fkey"
		}),
]);

export const payment = pgTable("payment", {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	bookingId: uuid("booking_id"),
	amount: numeric({ precision: 10, scale:  2 }).notNull(),
	method: paymentMethod().notNull(),
	paymentTime: timestamp("payment_time", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	status: text().default('PAID'),
}, (table) => [
	foreignKey({
			columns: [table.bookingId],
			foreignColumns: [booking.id],
			name: "payment_booking_id_fkey"
		}).onDelete("cascade"),
]);


//summary or minimal schema format for better understanding



// import { pgTable, uuid, text, timestamp, foreignKey, unique, check, integer, index, numeric, interval, boolean, pgEnum } from "drizzle-orm/pg-core"
// import { sql } from "drizzle-orm"

// // Enums
// export const bookingStatus = pgEnum("booking_status", ['CONFIRMED', 'CANCELLED', 'COMPLETED']);
// export const paymentMethod = pgEnum("payment_method", ['eSewa', 'Khalti', 'Card', 'Cash']);
// export const tripStatus = pgEnum("trip_status", ['SCHEDULED', 'CANCELLED', 'COMPLETED']);
// export const userRole = pgEnum("user_role", ['PASSENGER', 'ADMIN', 'AGENT']);

// // Tables (copy all your table definitions here)
// export const operator = pgTable("operator", { /* ... */ });
// export const bus = pgTable("bus", { /* ... */ });
// export const trip = pgTable("trip", { /* ... */ });
// export const route = pgTable("route", { /* ... */ });
// export const seat = pgTable("seat", { /* ... */ });
// export const user = pgTable("user", { /* ... */ });
// export const booking = pgTable("booking", { /* ... */ });
// export const payment = pgTable("payment", { /* ... */ });

