import request from 'supertest';
import app from '../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const testEmail = `test-user-${Date.now()}@test.com`;
let testUserId: number;

describe('Prueba de Integracion para Endpoints de Usuario', () => {

    // TEST 4
    describe('POST /api/usuarios/registro', () => {
        
        test('Debe registrar un nuevo usuario y retornar 201', async () => {
            const nuevoUsuario = {
                email: testEmail,
                nombre: 'Test Registro',
                usuario: `test_registro_${Date.now()}`,
                password: 'password123',
                rol: 'USER'
            };

            const response = await request(app)
                .post('/api/usuarios/registro')
                .send(nuevoUsuario);

            expect(response.status).toBe(201);
            expect(response.body.email).toBe(nuevoUsuario.email);
            expect(response.body).toHaveProperty('id');
            
            testUserId = response.body.id;
        });
    });

    // TEST 5
    describe('POST /api/usuarios/login', () => {
        
        test('Debe retornar 401 si la contraseña es incorrecta', async () => {
            const loginData = {
                email: testEmail,
                password: 'password_INCORRECTA'
            };

            const response = await request(app)
                .post('/api/usuarios/login')
                .send(loginData);

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Credenciales inválidas');
        });
    });

    afterAll(async () => {
        if (testUserId) {
            await prisma.usuario.delete({ where: { id: testUserId } }).catch(e => console.log(e));
        }
        await prisma.$disconnect();
    });
});