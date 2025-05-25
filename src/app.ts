import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

import { errorHandler } from './middleware/errorHandler';
import { config } from './config';

import pronounsRoutes from './routes/pronouns.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

// Load the Swagger documentation
const swaggerDocument = YAML.load('swagger.yaml');

export function createApp() {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(morgan('dev'));

    // Swagger docs
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // API routes
    app.use('/api/pronouns', pronounsRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);

    // Health check
    app.get('/health', (_, res) => res.status(200).json({ status: 'ok' }));

    // Global error handler
    app.use(errorHandler);

    return app; // Make sure to return the app
}
