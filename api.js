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
        res.json({ estado: 200, mensaje: 'Usuario registrado correctamente' });
    } catch (error) {
        if (error.code === 'P2002') {  // Error de duplicación de correo
            res.json({ estado: 400, mensaje: 'El correo ya está registrado' });
        } else {
            res.json({ estado: 400, mensaje: 'Error al registrar el usuario' });
        }
    }
});

app.post('/api/login', async (req, res) => {
    const { correo, clave } = req.body;
    try {
        const user = await prisma.usuario.findUnique({
            where: { correo },
        });

        if (user && user.clave === clave) {
            res.json({ estado: 200, mensaje: 'Inicio de sesión exitoso' });
        } else {
            res.json({ estado: 401, mensaje: 'Credenciales incorrectas' });
        }
    } catch (error) {
        res.json({ estado: 400, mensaje: 'Error al iniciar sesión' });
    }
});

app.post('/api/bloquear', async (req, res) => {
    const { correo, clave, correo_bloquear } = req.body;
    try {
        const user = await prisma.usuario.findUnique({
            where: { correo },
        });

        const userToBlock = await prisma.usuario.findUnique({
            where: { correo: correo_bloquear },
        });

        if (user && user.clave === clave) {
            await prisma.usuarioBloqueado.create({
                data: {
                    bloqueadorId: user.id,
                    bloqueadoId: userToBlock.id
                }
            });
            res.json({ estado: 200, mensaje: 'Usuario bloqueado correctamente' });
        } else {
            res.json({ estado: 401, mensaje: 'Credenciales incorrectas' });
        }
    } catch (error) {
        res.json({ estado: 400, mensaje: 'Error al bloquear el usuario' });
    }
});

app.get('/api/informacion/:correo', async (req, res) => {
    const { correo } = req.params;
    try {
        const user = await prisma.usuario.findUnique({
            where: { correo },
        });

        if (user) {
            res.json({ estado: 200, nombre: user.nombre, correo: user.correo, descripcion: user.descripcion });
        } else {
            res.json({ estado: 404, mensaje: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.json({ estado: 400, mensaje: 'Error al obtener la información del usuario' });
    }
});

app.post('/api/marcarcorreo', async (req, res) => {
    const { correo, clave, id_correo_favorito } = req.body;
    try {
        const user = await prisma.usuario.findUnique({
            where: { correo },
        });

        if (user && user.clave === clave) {
            await prisma.correo.update({
                where: { id: id_correo_favorito },
                data: { favorito: true }
            });
            res.json({ estado: 200, mensaje: 'Correo marcado como favorito' });
        } else {
            res.json({ estado: 401, mensaje: 'Credenciales incorrectas' });
        }
    } catch (error) {
        res.json({ estado: 400, mensaje: 'Error al marcar el correo como favorito' });
    }
});

app.delete('/api/desmarcarcorreo', async (req, res) => {
    const { correo, clave, id_correo_favorito } = req.body;
    try {
        const user = await prisma.usuario.findUnique({
            where: { correo },
        });

        if (user && user.clave === clave) {
            await prisma.correo.update({
                where: { id: id_correo_favorito },
                data: { favorito: false }
            });
            res.json({ estado: 200, mensaje: 'Correo desmarcado como favorito' });
        } else {
            res.json({ estado: 401, mensaje: 'Credenciales incorrectas' });
        }
    } catch (error) {
        res.json({ estado: 400, mensaje: 'Error al desmarcar el correo como favorito' });
    }
});

app.listen(5432, () => {
    console.log('API running on http://localhost:5432');
});
