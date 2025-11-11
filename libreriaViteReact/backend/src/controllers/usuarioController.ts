import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = 10;

export const listarUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await prisma.usuario.findMany({
            orderBy: { createdAt: 'desc' }
        });
        const usuariosSinPassword = usuarios.map(({ password, ...usuario }) => usuario);
        res.json(usuariosSinPassword);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al obtener usuarios' });
    }
};

export const registrarUsuario = async (req: Request, res: Response) => {
    try {
        const { password, ...dataUsuario } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const nuevoUsuario = await prisma.usuario.create({
            data: { ...dataUsuario, password: hashedPassword }
        });

        const { password: _, ...usuarioSinPassword } = nuevoUsuario;
        res.status(201).json(usuarioSinPassword);

    } catch (error: any) {
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'El email o nombre de usuario ya existe' });
        }
        res.status(500).json({ error: 'Error interno del servidor al registrar usuario' });
    }
};
