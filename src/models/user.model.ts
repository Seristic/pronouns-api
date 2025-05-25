import { PrismaClient, User, PronounSet } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserById(id: string): Promise<(User & { pronounSet: PronounSet | null }) | null> {
    return prisma.user.findUnique({
        where: { id },
        include: {
            pronounSet: true,
        },
    });
}