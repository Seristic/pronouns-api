-- CreateTable
CREATE TABLE "Pronoun" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "pronounSetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pronoun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PronounSet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PronounSet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pronoun" ADD CONSTRAINT "Pronoun_pronounSetId_fkey" FOREIGN KEY ("pronounSetId") REFERENCES "PronounSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
