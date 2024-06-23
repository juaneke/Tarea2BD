import requests

API_URL = "http://localhost:3000"

def login():
    while True:
        correo = input("Correo electrónico: ")
        clave = input("Clave: ")
        response = requests.post(f"{API_URL}/login", json={"direccion_correo": correo, "clave": clave})
        data = response.json()
        if response.status_code == 200:
            print(data['mensaje'])
            return correo, clave
        else:
            print(data['mensaje'])
            retry = input("¿Desea intentar nuevamente? (s/n): ")
            if retry.lower() != 's':
                return None, None

def registrar():
    while True:
        nombre = input("Nombre: ")
        correo = input("Correo electrónico: ")
        clave = input("Clave: ")
        descripcion = input("Descripción: ")
        response = requests.post(f"{API_URL}/registrar", json={
            "nombre": nombre,
            "direccion_correo": correo,
            "clave": clave,
            "descripcion": descripcion
        })
        data = response.json()
        print(response.status_code)
        if response.status_code == 200:
            return True, correo, clave
        else:
            retry = input("¿Desea intentar nuevamente? (s/n): ")
            if retry.lower() != 's':
                return False, None, None

def r_correo():
    remitente = input("ID del Remitente (número): ")
    destinatarios = input("IDs de los Destinatarios (separados por comas): ")
    asunto = input("Asunto: ")
    contenido = input("Contenido: ")
    response = requests.post(f"{API_URL}/enviarcorreo", json={
        "remitenteId": int(remitente),
        "destinatarios": [int(id) for id in destinatarios.split(',')],
        "asunto": asunto,
        "contenido": contenido
    })
    data = response.json()
    print(data.get('mensaje', 'No hay mensaje de respuesta'))

def menu():
    print("1. Bloquear un usuario")
    print("2. Ver información de una dirección de correo electrónico")
    print("3. Marcar correo como favorito")
    print("4. Desmarcar correo como favorito")
    print("n5. Redactar un correo")
    print("5. Terminar con la ejecución del cliente")
    return input("Seleccione una opción: ")

def bloquear_usuario(correo, clave):
    correo_bloquear = input("Correo del usuario a bloquear: ")
    response = requests.post(f"{API_URL}/bloquear", json={
        "correo": correo,
        "clave": clave,
        "correo_bloquear": correo_bloquear
    })
    print(response.json())

def ver_informacion():
    correo = input("Correo electrónico: ")
    response = requests.get(f"{API_URL}/informacion/{correo}")
    print(response.json())

def marcar_favorito(correo, clave):
    id_correo = input("ID del correo a marcar como favorito: ")
    response = requests.post(f"{API_URL}/marcarcorreo", json={
        "correo": correo,
        "clave": clave,
        "id_correo_favorito": int(id_correo)
    })
    print(response.json())

def desmarcar_favorito(correo, clave):
    id_correo = input("ID del correo a desmarcar como favorito: ")
    response = requests.delete(f"{API_URL}/desmarcarcorreo", json={
        "correo": correo,
        "clave": clave,
        "id_correo_favorito": int(id_correo)
    })
    print(response.json())

def main():
    print("Bienvenido a CorreosCTM")
    while True:
        print("1: Iniciar sesión")
        print("2: Registrarse")
        respuesta = input("Seleccione una opción: ")
        if respuesta == "1":
            correo, clave = login()
            if correo and clave:
                while True:
                    opcion = menu()
                    if opcion == '1':
                        bloquear_usuario(correo, clave)
                    elif opcion == '2':
                        ver_informacion()
                    elif opcion == '3':
                        marcar_favorito(correo, clave)
                    elif opcion == '4':
                        desmarcar_favorito(correo, clave)
                    elif opcion == '5':
                        print("Terminando la ejecución del cliente...")
                        break
                    else:
                        print("Opción inválida, por favor intente de nuevo.")
            else:
                print("Inicio de sesión fallido, terminando la ejecución del cliente...")
                break
        elif respuesta == "2":
            exito, correo, clave = registrar()
            if exito:
                print("Registro exitoso. Ahora puede acceder al menú.")
                while True:
                    opcion = menu()
                    if opcion == '1':
                        bloquear_usuario(correo, clave)
                    elif opcion == '2':
                        ver_informacion()
                    elif opcion == '3':
                        marcar_favorito(correo, clave)
                    elif opcion == '4':
                        desmarcar_favorito(correo, clave)
                    elif opcion == '5':
                        print("Terminando la ejecución del cliente...")
                        break
                    else:
                        print("Opción inválida, por favor intente de nuevo.")
            else:
                print("Registro fallido.")
        else:
            print("Opción inválida, por favor intente de nuevo.")

main()
