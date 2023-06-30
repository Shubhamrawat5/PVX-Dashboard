-- CreateTable
CREATE TABLE "bday" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "month" TEXT NOT NULL,
    "place" TEXT NOT NULL,

    CONSTRAINT "bday_pkey" PRIMARY KEY ("id")
);
