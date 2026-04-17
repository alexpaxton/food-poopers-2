ALTER TABLE "Poop" ADD COLUMN "idempotencyKey" TEXT;
UPDATE "Poop" SET "idempotencyKey" = gen_random_uuid()::TEXT WHERE "idempotencyKey" IS NULL;
ALTER TABLE "Poop" ALTER COLUMN "idempotencyKey" SET NOT NULL;
CREATE UNIQUE INDEX "Poop_idempotencyKey_key" ON "Poop"("idempotencyKey");
