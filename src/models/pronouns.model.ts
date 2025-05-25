import { PrismaClient, Pronoun } from '@prisma/client';

const prisma = new PrismaClient();

interface CreatePronounInput {
    label: string;
    description?: string;
    pronounSetId: string; // required to connect to a PronounSet
}

interface UpdatePronounInput {
    label?: string;
    description?: string;
    pronounSetId?: string; // optional for update
}

export async function getAllPronouns(): Promise<Pronoun[]> {
    return prisma.pronoun.findMany();
}

export async function getPronounById(id: string): Promise<Pronoun | null> {
    return prisma.pronoun.findUnique({ where: { id } });
}

export async function createPronoun(data: CreatePronounInput): Promise<Pronoun> {
    const { label, description, pronounSetId } = data;
    return prisma.pronoun.create({
        data: {
            label,
            description,
            pronounSet: {
                connect: { id: pronounSetId },
            },
        },
    });
}

export async function updatePronoun(id: string, data: UpdatePronounInput): Promise<Pronoun> {
    const { label, description, pronounSetId } = data;

    const updateData: any = {};
    if (label !== undefined) updateData.label = label;
    if (description !== undefined) updateData.description = description;
    if (pronounSetId !== undefined) {
        updateData.pronounSet = { connect: { id: pronounSetId } };
    }

    return prisma.pronoun.update({
        where: { id },
        data: updateData,
    });
}

export async function deletePronoun(id: string): Promise<Pronoun> {
    return prisma.pronoun.delete({ where: { id } });
}
