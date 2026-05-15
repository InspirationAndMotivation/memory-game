CREATE TABLE "scores" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"score" integer NOT NULL,
	"turns" integer NOT NULL,
	"time" text NOT NULL,
	"mode" text NOT NULL,
	"difficulty" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
