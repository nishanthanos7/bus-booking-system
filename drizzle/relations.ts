import { relations } from "drizzle-orm/relations";
import { operator, bus, trip, route, seat, user, booking, payment } from "./schema";

export const busRelations = relations(bus, ({one, many}) => ({
	operator: one(operator, {
		fields: [bus.operatorId],
		references: [operator.id]
	}),
	trips: many(trip),
}));

export const operatorRelations = relations(operator, ({many}) => ({
	buses: many(bus),
}));

export const tripRelations = relations(trip, ({one, many}) => ({
	bus: one(bus, {
		fields: [trip.busId],
		references: [bus.id]
	}),
	route: one(route, {
		fields: [trip.routeId],
		references: [route.id]
	}),
	seats: many(seat),
	bookings: many(booking),
}));

export const routeRelations = relations(route, ({many}) => ({
	trips: many(trip),
}));

export const seatRelations = relations(seat, ({one, many}) => ({
	trip: one(trip, {
		fields: [seat.tripId],
		references: [trip.id]
	}),
	bookings: many(booking),
}));

export const bookingRelations = relations(booking, ({one, many}) => ({
	user: one(user, {
		fields: [booking.userId],
		references: [user.id]
	}),
	trip: one(trip, {
		fields: [booking.tripId],
		references: [trip.id]
	}),
	seat: one(seat, {
		fields: [booking.seatId],
		references: [seat.id]
	}),
	payments: many(payment),
}));

export const userRelations = relations(user, ({many}) => ({
	bookings: many(booking),
}));

export const paymentRelations = relations(payment, ({one}) => ({
	booking: one(booking, {
		fields: [payment.bookingId],
		references: [booking.id]
	}),
}));