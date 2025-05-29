-- CreateTable
CREATE TABLE "Requests" (
    "id" SERIAL NOT NULL,
    "guestPhone" TEXT NOT NULL,
    "requestText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("id")
);
