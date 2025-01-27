CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL UNIQUE,
    "password" VARCHAR(120) NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS "courses" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(15) NOT NULL,
    "description" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "userCourses" (
    "id" SERIAL PRIMARY KEY,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE,
    FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE
);