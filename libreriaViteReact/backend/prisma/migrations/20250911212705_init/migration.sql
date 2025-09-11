-- CreateTable
CREATE TABLE "libros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "precio" TEXT NOT NULL,
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
