import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PronounCreateInput {
    label: string;
    description?: string;
    pronounSetId: string;
}

interface PronounUpdateInput {
    label?: string;
    description?: string;
    pronounSetId?: string;
}

function generateValue(label: string): string {
    // Normalize label to lowercase, no spaces, no special chars, etc.
    return label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
}

export class PronounsService {
    async createPronoun(data: PronounCreateInput) {
        if (!data.label || data.label.trim().length < 1) {
            throw new Error('Label is required');
        }
        if (!data.pronounSetId) {
            throw new Error('pronounSetId is required');
        }

        const value = generateValue(data.label);

        return prisma.pronoun.create({
            data: {
                label: data.label,
                value,  // <-- required field included here
                description: data.description,
                pronounSetId: data.pronounSetId,
            },
        });
    }

    async getAllPronouns() {
        return prisma.pronoun.findMany();
    }

    async getPronounById(id: string) {
        return prisma.pronoun.findUnique({ where: { id } });
    }

    async updatePronoun(id: string, data: PronounUpdateInput) {
        // Optional: if label is updated, update value too
        let updateData: any = { ...data };
        if (data.label) {
            updateData.value = generateValue(data.label);
        }
        return prisma.pronoun.update({
            where: { id },
            data: updateData,
        });
    }

    async deletePronoun(id: string) {
        return prisma.pronoun.delete({ where: { id } });
    }
}
