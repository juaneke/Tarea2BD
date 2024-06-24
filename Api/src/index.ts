import { Elysia, t } from 'elysia';
import {
  registrarUsuario,
  bloquearUsuario,
  obtenerInformacionUsuario,
  marcarCorreoFavorito,
  desmarcarCorreoFavorito,
  login,
  enviarMensaje
} from './handlers';

const api = new Elysia()
  .post('/registrar', ({ body }) => registrarUsuario(body), {
    body: t.Object({
      nombre: t.String(),
      direccion_correo: t.String(),
      clave: t.String(),
      descripcion: t.String()
    })
  })
  .post('/login', ({ body }) => login(body), {
    body: t.Object({
      direccion_correo: t.String(),
      clave: t.String(),
    })
  })
  .post('/bloquear', ({ body }) => bloquearUsuario(body), {
    body: t.Object({
      correo: t.String(),
      clave: t.String(),
      correo_bloquear: t.String()
    })
  })
  .get('/informacion/:correo', ({ params: { correo } }) => obtenerInformacionUsuario(correo), {
    params: t.Object({
      correo: t.String()
    })
  })
  .post('/marcarcorreo', ({ body }) => marcarCorreoFavorito(body), {
    body: t.Object({
      correo: t.String(),
      clave: t.String(),
      id_correo_favorito: t.Number()
    })
  })
  .delete('/desmarcarcorreo', ({ body }) => desmarcarCorreoFavorito(body), {
    body: t.Object({
      correo: t.String(),
      clave: t.String(),
      id_correo_favorito: t.Number()
    })
  })
  .post('/enviarcorreo', ({ body }) => enviarMensaje(body), {
    body: t.Object({
      emisor: t.String(),
      destinatario: t.String(),
      contenido: t.String(),
      favorito: t.Boolean()
    })
  });
export default api;
