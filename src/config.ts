import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config = {
    app: {
        env: process.env.NODE_ENV || 'development',
        port: parseInt(process.env.PORT || '4000', 10),
    },

    jwt: {
        secret: process.env.JWT_SECRET || "supersecretkey",
        expiresIn: process.env.JWT_EXPIRES_IN || '7h',
    },
    db: {
        url: process.env.DATABASE_URL || "file:./dev.db",
    },

    swagger: {
        title: 'Pronouns API',
        description: 'Inclusive Pronouns API for LGBTQ+ community.',
        version: '1.0.0',
    },
};