import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

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

export const loginUsuario = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validar variables de entorno
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET no configurado');
            return res.status(500).json({ error: 'Error de configuración del servidor' });
        }

        const usuario = await prisma.usuario.findUnique({ where: { email } });
        
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const passwordValida = await bcrypt.compare(password, usuario.password);
        
        if (!passwordValida) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const tokenPayload = {
            id: usuario.id,
            email: usuario.email,
            rol: usuario.rol
        };

        const token = (jwt as any).sign(
            tokenPayload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
        );

        const { password: _, ...usuarioSinPassword } = usuario;

        res.json({
            mensaje: 'Login exitoso',
            token,
            usuario: usuarioSinPassword
        });
    } catch (error) {
        console.error('Error en loginUsuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};