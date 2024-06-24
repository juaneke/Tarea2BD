-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Correo" (
    "id" SERIAL NOT NULL,
    "emisor_correo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "favorito" BOOLEAN NOT NULL,

    CONSTRAINT "Correo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReceptorCorreo" (
    "correoId" INTEGER NOT NULL,
    "receptor" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UsuarioBloqueado" (
    "bloqueadorCorreo" TEXT NOT NULL,
    "bloqueadoCorreo" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "ReceptorCorreo_correoId_receptor_key" ON "ReceptorCorreo"("correoId", "receptor");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioBloqueado_bloqueadorCorreo_bloqueadoCorreo_key" ON "UsuarioBloqueado"("bloqueadorCorreo", "bloqueadoCorreo");

-- AddForeignKey
ALTER TABLE "Correo" ADD CONSTRAINT "Correo_emisor_correo_fkey" FOREIGN KEY ("emisor_correo") REFERENCES "Usuario"("correo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceptorCorreo" ADD CONSTRAINT "ReceptorCorreo_correoId_fkey" FOREIGN KEY ("correoId") REFERENCES "Correo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceptorCorreo" ADD CONSTRAINT "ReceptorCorreo_receptor_fkey" FOREIGN KEY ("receptor") REFERENCES "Usuario"("correo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioBloqueado" ADD CONSTRAINT "UsuarioBloqueado_bloqueadorCorreo_fkey" FOREIGN KEY ("bloqueadorCorreo") REFERENCES "Usuario"("correo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioBloqueado" ADD CONSTRAINT "UsuarioBloqueado_bloqueadoCorreo_fkey" FOREIGN KEY ("bloqueadoCorreo") REFERENCES "Usuario"("correo") ON DELETE RESTRICT ON UPDATE CASCADE;
