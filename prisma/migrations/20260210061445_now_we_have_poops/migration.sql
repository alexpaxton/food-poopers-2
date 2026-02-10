-- CreateTable
CREATE TABLE "Poop" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "color" TEXT NOT NULL,
    "spicy" BOOLEAN NOT NULL,
    "type" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Poop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Poop" ADD CONSTRAINT "Poop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
