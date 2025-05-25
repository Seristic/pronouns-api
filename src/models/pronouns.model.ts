import { PrismaClient } from '@prisma/client';
import { Pronoun } from '../models/pronoun';

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

// Helper function to generate the required 'value' field from the label
function generateValue(label: string): string {
    // Convert to lowercase, replace spaces with underscores, remove non-alphanumeric except underscores
    return label
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^\w_]/g, '');
}

export async function getAllPronouns(): Promise<Pronoun[]> {
    return prisma.pronoun.findMany();
}

export async function getPronounById(id: string): Promise<Pronoun | null> {
    return prisma.pronoun.findUnique({ where: { id } });
}

export async function createPronoun(data: CreatePronounInput): Promise<Pronoun> {
    const { label, description, pronounSetId } = data;
    const value = generateValue(label);

    return prisma.pronoun.create({
        data: {
            label,
            value, // required field
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

    if (label !== undefined) {
        updateData.label = label;
        updateData.value = generateValue(label); // update 'value' if label changes
    }
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
