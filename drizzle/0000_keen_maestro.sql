-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."booking_status" AS ENUM('CONFIRMED', 'CANCELLED', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('eSewa', 'Khalti', 'Card', 'Cash');--> statement-breakpoint
CREATE TYPE "public"."trip_status" AS ENUM('SCHEDULED', 'CANCELLED', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('PASSENGER', 'ADMIN', 'AGENT');--> statement-breakpoint
CREATE TABLE "operator" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"full_name" text NOT NULL,
	"contact" text,
	"email" text,
	"logo_url" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "bus" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"operator_id" uuid,
	"number_plate" text NOT NULL,
	"bus_model" text,
	"total_seats" integer NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "bus_number_plate_key" UNIQUE("number_plate"),
	CONSTRAINT "bus_total_seats_check" CHECK (total_seats > 0)
);
--> statement-breakpoint
CREATE TABLE "trip" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"bus_id" uuid,
	"route_id" uuid,
	"departure_time" timestamp NOT NULL,
	"arrival_time" timestamp,
	"price" numeric(10, 2) NOT NULL,
	"available_seats" integer NOT NULL,
	"status" "trip_status" DEFAULT 'SCHEDULED',
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "route" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"start_location" text NOT NULL,
	"end_location" text NOT NULL,
	"distance_km" numeric(6, 2),
	"estimated_time" interval,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "seat" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"trip_id" uuid,
	"seat_number" text NOT NULL,
	"is_booked" boolean DEFAULT false,
	CONSTRAINT "seat_trip_id_seat_number_key" UNIQUE("trip_id","seat_number")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"password" text NOT NULL,
	"role" "user_role" DEFAULT 'PASSENGER',
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "user_email_key" UNIQUE("email"),
	CONSTRAINT "user_phone_key" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "booking" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid,
	"trip_id" uuid,
	"seat_id" uuid,
	"booking_time" timestamp DEFAULT CURRENT_TIMESTAMP,
	"status" "booking_status" DEFAULT 'CONFIRMED'
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"booking_id" uuid,
	"amount" numeric(10, 2) NOT NULL,
	"method" "payment_method" NOT NULL,
	"payment_time" timestamp DEFAULT CURRENT_TIMESTAMP,
	"status" text DEFAULT 'PAID'
);
--> statement-breakpoint
ALTER TABLE "bus" ADD CONSTRAINT "bus_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "public"."operator"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trip" ADD CONSTRAINT "trip_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "public"."bus"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trip" ADD CONSTRAINT "trip_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "public"."route"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seat" ADD CONSTRAINT "seat_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."trip"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."trip"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "public"."seat"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_trip_departure" ON "trip" USING btree ("departure_time" timestamp_ops);--> statement-breakpoint
CREATE INDEX "idx_seat_trip_id" ON "seat" USING btree ("trip_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "idx_user_email" ON "user" USING btree ("email" text_ops);
*/