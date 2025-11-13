import app from '../app'
import request from 'supertest'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

let token: string;
let testUserId: number;
let createdBookId: number;

describe('Prueba de Integracion para Endpoint de libors', () => {
    
    beforeAll(async () => {

        const hashedPassword = await bcrypt.hash('password123', 10);

        const testUser = await prisma.usuario.create({
            data: {
                email:  `testuser-${Date.now()}@test.com`,
                nombre: 'Usuario de Prueba',
                usuario: `testuser_${Date.now()}`,
                password: hashedPassword,
                rol: 'USER'
            }
        });
        testUserId = testUser.id;

        const loginResponse = await request(app)
            .post('/api/usuarios/login')
            .send({
                email: testUser.email,
                password: 'password123'
            })

            token = loginResponse.body.token;
        });

        // TEST 1
        describe('GET /api/libros', () => {
            test('debe retornar 200 OK y un array de libros', async () => {
                
                const response = await request(app).get('/api/libros');
                
                expect(response.status).toBe(200);

                expect(response.body).toBeInstanceOf(Array);

                if (response.body.length > 0){
                    expect(response.body[0]).toHaveProperty('titulo');
                }
            
            });
        });

        // TEST 2
        describe('POST /api/libros', () => {
            test('Debe retornar 401 Unauthorized si no tiene token', async () => {

                const nuevoLibro = {
                    titulo: "TEST 2 (sin token)",
                    autor: "Tester",
                    genero: "Testing",
                    precio: "$401.00",
                    imagen: "http://test.com.img.png"
                };

                const response = await request(app)
                    .post('/api/libros')
                    .send(nuevoLibro);
                
                    expect(response.status).toBe(401);
            });
        });

        // TEST 3
        test('Debe retornar 201 Created y el libro si se provee un token', async () =>{
            const nuevoLibro = {
                titulo: "TEST 3 (con token)",
                autor: "Tester",
                genero: "Testing",
                precio: "201.00",
                imagen: "http://test.com.img.png"
            };
            const response = await request(app)
                .post('/api/libros')
                .set('Authorization', `Bearer ${token}`)
                .send(nuevoLibro);

            expect(response.status).toBe(201);
            expect(response.body.titulo).toBe(nuevoLibro.titulo);
            expect(response.body).toHaveProperty('id');

            createdBookId = response.body.id;
        });

    afterAll(async () => {
        if (createdBookId) {
            await prisma.libro.delete({ where: { id: createdBookId } }).catch(e => console.log(e));
        }
        if(testUserId){
            await prisma.usuario.delete({ where: { id: testUserId } }).catch(e => console.log(e));
        }
        await prisma.$disconnect();
    });
    
});
