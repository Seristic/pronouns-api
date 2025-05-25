import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient, User, PronounSet } from "@prisma/client";

const prisma = new PrismaClient();

interface UserResponse {
    id: string;
    email: string;
    username: string;
    pronounSet?: PronounSet | null;
}

interface RegisterInput {
    email: string;
    password: string; // raw password from user
    username: string;
    pronounSetId?: string;
}

interface UpdateUserInput {
    email?: string;
    username?: string;
    password?: string;
    pronounSetId?: string | null;
}

// Register a new user
export async function registerUser(req: Request, res: Response) {
    try {
        const { email, password, username, pronounSetId } = req.body as RegisterInput;

        if (!email || !password || !username) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user, optionally link pronounSet if provided
        const user = await prisma.user.create({
            data: {
                email,
                username,
                passwordHash: hashedPassword,
                pronounSet: pronounSetId ? { connect: { id: pronounSetId } } : undefined,
            },
            include: { pronounSet: true },
        });

        // Remove sensitive info before sending response
        const responseUser: UserResponse = {
            id: user.id,
            email: user.email,
            username: user.username,
            pronounSet: user.pronounSet,
        };

        return res.status(201).json(responseUser);
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

// Login user and issue JWT token
export async function loginUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Missing email or password." });
        }

        // Find user by email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Create JWT token payload
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "1d" }
        );

        return res.json({ token });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

// Get currently authenticated user info
export async function getCurrentUser(req: Request, res: Response) {
    try {
        // Assume auth middleware sets req.user.id
        const userId = (req as any).user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized." });
        }

        // Fetch user + pronounSet relation
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                username: true,
                pronounSet: true,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.json(user);
    } catch (error) {
        console.error("Error fetching current user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

// Update user by ID
export async function updateUser(req: Request, res: Response) {
    try {
        const userId = req.params.id;
        const data = req.body as UpdateUserInput;

        // Prepare update data object
        const updateData: any = {};

        if (data.email) updateData.email = data.email;
        if (data.username) updateData.username = data.username;

        if (data.password) {
            updateData.passwordHash = await bcrypt.hash(data.password, 10);
        }

        if (data.pronounSetId !== undefined) {
            if (data.pronounSetId === null) {
                updateData.pronounSet = { disconnect: true };
            } else {
                updateData.pronounSet = { connect: { id: data.pronounSetId } };
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                email: true,
                username: true,
                pronounSet: true,
            },
        });

        return res.json(updatedUser);
    } catch (error: any) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "User not found." });
        }
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

// Delete user by ID
export async function deleteUser(req: Request, res: Response) {
    try {
        const userId = req.params.id;

        await prisma.user.delete({ where: { id: userId } });

        return res.status(204).send();
    } catch (error: any) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "User not found." });
        }
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

// Get all users (maybe admin only)
export async function getUsers(req: Request, res: Response) {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, email: true, username: true, pronounSet: true }
        });
        return res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

// Get user by ID (admin or self)
export async function getUserById(req: Request, res: Response) {
    try {
        const userId = req.params.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, username: true, pronounSet: true }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

// Create user (could be same as registerUser, but returning User)
export async function createUser(req: Request, res: Response) {
    try {
        const { email, password, username, pronounSetId } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({ message: "Missing required fields." });
        }
        // Check existing user
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                username,
                passwordHash: hashedPassword,
                pronounSet: pronounSetId ? { connect: { id: pronounSetId } } : undefined,
            },
            include: { pronounSet: true }
        });
        return res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

