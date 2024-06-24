/*
  Warnings:

  - You are about to drop the `ReceptorCorreo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `receptor_correo` to the `Correo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReceptorCorreo" DROP CONSTRAINT "ReceptorCorreo_correoId_fkey";

-- DropForeignKey
ALTER TABLE "ReceptorCorreo" DROP CONSTRAINT "ReceptorCorreo_receptor_fkey";

-- AlterTable
ALTER TABLE "Correo" ADD COLUMN     "receptor_correo" TEXT NOT NULL;

-- DropTable
DROP TABLE "ReceptorCorreo";

-- AddForeignKey
ALTER TABLE "Correo" ADD CONSTRAINT "Correo_receptor_correo_fkey" FOREIGN KEY ("receptor_correo") REFERENCES "Usuario"("correo") ON DELETE RESTRICT ON UPDATE CASCADE;
