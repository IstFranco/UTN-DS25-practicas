const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


//pobla la base de datos. Comando: "node prisma/seed.js"
const libros = [
    {
        titulo: 'Atomic Habits',
        autor: 'James Clear',
        imagen: '/images/AtomicHabits.webp',
        genero: 'DesarrolloPersonal',
        precio: '$9.999,99',
        destacado: true,
    },
    {
        titulo: "Cómo ganar amigos e influir sobre las personas",
        autor: "Dale Carnegie",
        imagen: "/images/AmigosYPersonas.webp",
        genero: 'DesarrolloPersonal',
        precio: '$9.299,00',
        destacado: false,
    },
    {
        titulo: "Eat that frog",
        autor: "Brian Tracy",
        imagen: "/images/frog.webp",
        genero: 'DesarrolloPersonal',
        precio: '$8.750,00',
        destacado: false,
    },
    {
        titulo: "Mindset: La actitud del éxito",
        autor: "Carol S. Dweck",
        imagen: "/images/mindset.jpg",
        genero: 'DesarrolloPersonal',
        precio: '$10.900,00',
        destacado: false,
    },
    {
        titulo: "El monje que vendió su Ferrari",
        autor: "Robin Sharma",
        imagen: "/images/monje.jpeg",
        genero: 'DesarrolloPersonal',
        precio: '$7.800,00',
        destacado: false,
    },
    {
        titulo: "La magia del orden",
        autor: "Marie Kondo",
        imagen: "/images/orden.webp",
        genero: 'DesarrolloPersonal',
        precio: '$6.990,00',
        destacado: false,
    },
    {
        titulo: 'El universo en una cáscara de nuez',
        autor: 'Stephen Hawking',
        imagen: '/images/universo.jpg',
        genero: 'Fisica',
        precio: '$12.000,00',
        destacado: false,
    },
    {
        titulo: 'Breves respuestas a las grandes preguntas',
        autor: 'Stephen Hawking',
        imagen: '/images/respuestas.jpg',
        genero: 'Fisica',
        precio: '$10.800,00',
        destacado: true,
    },
    {
        titulo: 'La física del futuro',
        autor: 'Michio Kaku',
        imagen: '/images/futuro.jpg',
        genero: 'Fisica',
        precio: '$13.499,00',
        destacado: false,
    },
    {
        titulo: 'La partícula divina',
        autor: 'Leon Lederman',
        imagen: '/images/particula.jpg',
        genero: 'Fisica',
        precio: '$11.250,00',
        destacado: false,
    },
    {
        titulo: 'El gran diseño',
        autor: 'Stephen Hawking',
        imagen: '/images/diseño.jpg',
        genero: 'Fisica',
        precio: '$9.990,00',
        destacado: false,
    },
    {
        titulo: 'Física para futuros presidentes',
        autor: 'Richard A. Muller',
        imagen: '/images/presidentes.jpg',
        genero: 'Fisica',
        precio: '$8.800,00',
        destacado: false,
    },
    {
        titulo: 'El enigma de Fermat',
        autor: 'Simon Singh',
        imagen: '/images/fermat.jpg',
        genero: 'Matematicas',
        precio: '$10.400,00',
        destacado: false,
    },
    {
        titulo: 'El libro de las matemáticas',
        autor: 'Clifford A. Pickover',
        imagen: '/images/libromatematicas.webp',
        genero: 'Matematicas',
        precio: '$12.600,00',
        destacado: false,
    },
    {
        titulo: 'Los Simpson y las matemáticas',
        autor: 'Simon Singh',
        imagen: '/images/simpson.jpg',
        genero: 'Matematicas',
        precio: '$9.750,00',
        destacado: true,
    },
    {
        titulo: 'Matemática... ¿Estás ahí?',
        autor: 'Adrián Paenza',
        imagen: '/images/paenza1.jpg',
        genero: 'Matematicas',
        precio: '$7.300,00',
        destacado: false,
    },
    {
        titulo: 'El hombre que calculaba',
        autor: 'Malba Tahan',
        imagen: '/images/calculaba.jpg',
        genero: 'Matematicas',
        precio: '$8.200,00',
        destacado: false,
    },
    {
        titulo: 'Historia del cero',
        autor: 'Charles Seife',
        imagen: '/images/cero.jpeg',
        genero: 'Matematicas',
        precio: '$6.990,00',
        destacado: false,
    },
    {
        titulo: 'Harry Potter y la piedra filosofal',
        autor: 'J.K. Rowling',
        imagen: '/images/harry1.webp',
        genero: 'Fantasia',
        precio: '$9.999,00',
        destacado: false,
    },
    {
        titulo: 'Harry Potter y el prisionero de Azkaban',
        autor: 'J.K. Rowling',
        imagen: '/images/harry3.webp',
        genero: 'Fantasia',
        precio: '$10.499,00',
        destacado: false,
    },
    {
        titulo: 'El Hobbit',
        autor: 'J.R.R. Tolkien',
        imagen: '/images/hobbit.jpeg',
        genero: 'Fantasia',
        precio: '$11.000,00',
        destacado: false,
    },
    {
        titulo: 'El nombre del viento',
        autor: 'Patrick Rothfuss',
        imagen: '/images/viento.webp',
        genero: 'Fantasia',
        precio: '$13.250,00',
        destacado: false,
    },
    {
        titulo: 'Las crónicas de Narnia: El león, la bruja y el ropero',
        autor: 'C.S. Lewis',
        imagen: '/images/narnia.webp',
        genero: 'Fantasia',
        precio: '$9.200,00',
        destacado: false,
    },
    {
        titulo: 'Eragon',
        autor: 'Christopher Paolini',
        imagen: '/images/eragon.jpg',
        genero: 'Fantasia',
        precio: '$12.100,00',
        destacado: false,
    },
    {
        titulo: 'Lobizón: la maldición de la séptima generación',
        autor: 'Clara González',
        imagen: '/images/lobizon.jpg',
        genero: 'Fantasia',
        precio: '$8.200,00',
        destacado: false,
    },
    {
        titulo: 'El hombre gato de los montes',
        autor: 'Ramiro Vega',
        imagen: '/images/hombregato.webp',
        genero: 'Fantasia',
        precio: '$7.600,00',
        destacado: false,
    },
    {
        titulo: 'El Silbón: ecos en la oscuridad',
        autor: 'Luciana Cabrera',
        imagen: '/images/silbon.jpg',
        genero: 'Fantasia',
        precio: '$9.100,00',
        destacado: true,
    },
];

async function main() {
    console.log('Empezando a poblar la base de datos...')
    
    for (const libro of libros) {
        await prisma.libro.create({
            data: libro
        })
    }
    
    console.log('Base de datos poblada con éxito!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })