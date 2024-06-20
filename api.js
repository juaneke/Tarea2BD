import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = new Elysia();

app.post('/api/registrar', async (req, res) => {
    const { nombre, correo, clave, descripcion } = req.body;
    try {
        const user = await prisma.usuario.create({
            data: { nombre, correo, clave, descripcion}
        });
        res.json({ estado: 200, mensaje: 'Se realizo la peticion correctamente' });
    } catch (error) {
        res.json({ estado: 400, mensaje: 'Ha existido un error al realizar la peticion' });
    }
});



app.listen(5432, () => {
    console.log('API running on http://localhost:5432');
});
