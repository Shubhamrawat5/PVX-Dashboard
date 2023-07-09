-- CreateTable
CREATE TABLE "bday" (
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER,
    "place" TEXT NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "bday_pkey" PRIMARY KEY ("number")
);
