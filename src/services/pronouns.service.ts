import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PronounCreateInput {
    label: string;
    description?: string;
    pronounSetId: string; // required to link to PronounSet
}

interface PronounUpdateInput {
    label?: string;
    description?: string;
    pronounSetId?: string; // optional on update, if you want to allow changing the set
}

export class PronounsService {
    async createPronoun(data: PronounCreateInput) {
        if (!data.label || data.label.trim().length < 1) {
            throw new Error('Label is required');
        }
        if (!data.pronounSetId) {
            throw new Error('pronounSetId is required');
        }
        return prisma.pronoun.create({
            data: {
                label: data.label,
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
        return prisma.pronoun.update({
            where: { id },
            data,
        });
    }

    async deletePronoun(id: string) {
        return prisma.pronoun.delete({ where: { id } });
    }
}
