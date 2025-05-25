import { Request, Response } from 'express';
import { PronounsService } from '../services/pronouns.service';

const pronounsService = new PronounsService();

export class PronounsController {
    // POST /pronouns
    async create(req: Request, res: Response) {
        try {
            // Expecting body to have label (string), description? (string), pronounSetId (string)
            const { label, description, pronounSetId } = req.body;

            if (!label || !pronounSetId) {
                return res.status(400).json({ message: 'label and pronounSetId are required' });
            }

            const created = await pronounsService.createPronoun({
                label,
                description,
                pronounSetId,
            });

            return res.status(201).json(created);
        } catch (error: any) {
            return res.status(400).json({ message: error.message || 'Failed to create pronoun' });
        }
    }

    // GET /pronouns
    async getAll(req: Request, res: Response) {
        try {
            const pronouns = await pronounsService.getAllPronouns();
            return res.json(pronouns);
        } catch (error: any) {
            return res.status(500).json({ message: error.message || 'Failed to get pronouns' });
        }
    }

    // GET /pronouns/:id
    async getById(req: Request, res: Response) {
        try {
            const id: string = req.params.id; // id is a string UUID
            const pronoun = await pronounsService.getPronounById(id);

            if (!pronoun) {
                return res.status(404).json({ message: 'Pronoun not found' });
            }
            return res.json(pronoun);
        } catch (error: any) {
            return res.status(500).json({ message: error.message || 'Failed to get pronoun' });
        }
    }

    // PUT /pronouns/:id
    async update(req: Request, res: Response) {
        try {
            const id: string = req.params.id;
            const { label, description, pronounSetId } = req.body;

            // Optional: add validation on what fields can be updated
            const updated = await pronounsService.updatePronoun(id, {
                label,
                description,
                pronounSetId,
            });

            return res.json(updated);
        } catch (error: any) {
            return res.status(400).json({ message: error.message || 'Failed to update pronoun' });
        }
    }

    // DELETE /pronouns/:id
    async delete(req: Request, res: Response) {
        try {
            const id: string = req.params.id;
            await pronounsService.deletePronoun(id);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(500).json({ message: error.message || 'Failed to delete pronoun' });
        }
    }
}
