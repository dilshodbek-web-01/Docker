-- CreateTable
CREATE TABLE "language" (
    "id" UUID NOT NULL,
    "title" VARCHAR(3) NOT NULL DEFAULT 'uz',

    CONSTRAINT "language_pkey" PRIMARY KEY ("id")
);
