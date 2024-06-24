import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function registrarUsuario(body: any) {
  const { nombre, direccion_correo, clave, descripcion } = body;

  try {
    await prisma.usuario.create({
      data: { nombre, correo: direccion_correo, clave, descripcion }
    });
    return { estado: 200, mensaje: 'Usuario registrado correctamente' };
  } catch (error) {
    console.error(error);
    return { estado: 400, mensaje: 'Ha existido un error al registrar el usuario' };
  }
}

export async function enviarMensaje(body: any) {
  const { emisor, destinatario, contenido, favorito } = body;

  try {
    await prisma.correo.create({
      data: { emisor_correo: emisor, receptor_correo: destinatario, contenido, favorito}
    });
    return { estado: 200, mensaje: 'Mensaje enviado correctamente' };
  } catch (error) {
    console.error(error);
    return { estado: 400, mensaje: 'Ha existido un error al enviar el mensaje' };
  }
}


export async function login(body: any) {
  const { direccion_correo, clave } = body;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { correo: direccion_correo, clave }
    });
    
    if (usuario) {
      return { estado: 200, mensaje: 'Inicio de sesión exitoso'};
    } else {
      return { estado: 401, mensaje: 'Credenciales inválidas' };
    }
  } catch (error) {
    console.error(error);
    return { estado: 500, mensaje: 'Ha ocurrido un error al iniciar sesión' };
  }
}

export async function bloquearUsuario(body: any) {
  const { correo, clave, correo_bloquear } = body;

  try {
    const user = await prisma.usuario.findUnique({ where: { correo, clave } });
    if (user) {
      const bloqueado = await prisma.usuario.findUnique({ where: { correo: correo_bloquear } });
      if (bloqueado) {
        await prisma.usuarioBloqueado.create({
          data: { bloqueadorCorreo: user.correo, bloqueadoCorreo: bloqueado.correo }
        });
        return { estado: 200, mensaje: 'Usuario bloqueado correctamente' };
      } else {
        return { estado: 400, mensaje: 'Usuario a bloquear no encontrado' };
      }
    } else {
      return { estado: 400, mensaje: 'Usuario no encontrado o clave incorrecta' };
    }
  } catch (error) {
    console.error(error);
    return { estado: 400, mensaje: 'Ha existido un error al bloquear el usuario' };
  }
}

export async function obtenerInformacionUsuario(correo: string) {
  try {
    const user = await prisma.usuario.findUnique({ where: { correo } });

    if (user) {
      const { nombre, descripcion } = user;
      return { estado: 200, nombre, correo, descripcion };
    } else {
      return { estado: 400, mensaje: 'Usuario no encontrado' };
    }
  } catch (error) {
    console.error(error);
    return { estado: 400, mensaje: 'Ha existido un error al obtener la información del usuario' };
  }
}

export async function marcarCorreoFavorito(body: any) {
  const { correo, clave, id_correo_favorito } = body;

  try {
    const user = await prisma.usuario.findUnique({ where: { correo, clave } });
    if (user) {
      await prisma.correo.update({
        where: { id: id_correo_favorito },
        data: { favorito: true }
      });
      return { estado: 200, mensaje: 'Correo marcado como favorito' };
    } else {
      return { estado: 400, mensaje: 'Usuario no encontrado o clave incorrecta' };
    }
  } catch (error) {
    console.error(error);
    return { estado: 400, mensaje: 'Ha existido un error al marcar el correo como favorito' };
  }
}

export async function desmarcarCorreoFavorito(body: any) {
  const { correo, clave, id_correo_favorito } = body;

  try {
    const user = await prisma.usuario.findUnique({ where: { correo, clave } });
    if (user) {
      await prisma.correo.update({
        where: { id: id_correo_favorito },
        data: { favorito: false }
      });
      return { estado: 200, mensaje: 'Correo desmarcado como favorito' };
    } else {
      return { estado: 400, mensaje: 'Usuario no encontrado o clave incorrecta' };
    }
  } catch (error) {
    console.error(error);
    return { estado: 400, mensaje: 'Ha existido un error al desmarcar el correo como favorito' };
  }
}

