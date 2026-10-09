CREATE TABLE "attempts" (
	"id" serial PRIMARY KEY,
	"device_id" text NOT NULL,
	"nickname" text NOT NULL,
	"mode" text NOT NULL,
	"subjects" jsonb NOT NULL,
	"correct" integer NOT NULL,
	"total_questions" integer NOT NULL,
	"score" integer NOT NULL,
	"max_score" integer NOT NULL,
	"duration_seconds" integer NOT NULL,
	"breakdown" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
