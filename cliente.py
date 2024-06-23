import requests

API_URL = "http://localhost:3000"

def login():
    while True:
        correo = input("Correo electrónico: ")
        clave = input("Clave: ")
        response = requests.post(f"{API_URL}/login", json={"direccion_correo": correo, "clave": clave})
        data = response.json()
        if data['estado'] == 200:
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
        if data['estado'] == 200:
            print(data['mensaje'])
            return True, correo, clave
        else:
            print(data['mensaje'])
            retry = input("¿Desea intentar nuevamente? (s/n): ")
            if retry.lower() != 's':
                return False, None, None

def r_correo(correo):
    
    destinatario = input("Correo destinatario: ")
    contenido = input("Contenido: ")
    response = requests.post(f"{API_URL}/enviarcorreo", json={
        "emisor": correo,
        "destinatario": destinatario,
        "contenido": contenido,
        "favorito" : False
    })
    data = response.json()
    print('Error: ',data['estado'],' ',data['mensaje'])

def menu():
    print("1. Bloquear un usuario")
    print("2. Ver información de una dirección de correo electrónico")
    print("3. Marcar correo como favorito")
    print("4. Desmarcar correo como favorito")
    print("5. Redactar un correo")
    print("6. Terminar con la ejecución del cliente")
    return input("Seleccione una opción: ")

def bloquear_usuario(correo, clave):
    correo_bloquear = input("Correo del usuario a bloquear: ")
    response = requests.post(f"{API_URL}/bloquear", json={
        "correo": correo,
        "clave": clave,
        "correo_bloquear": correo_bloquear
    })
    print('Error: ',data['estado'],' ',data['mensaje'])
    

def ver_informacion():
    correo = input("Correo electrónico: ")
    response = requests.get(f"{API_URL}/informacion/{correo}")
    print('Error: ',data['estado'],' ',data['mensaje'])

def marcar_favorito(correo, clave):
    id_correo = input("ID del correo a marcar como favorito: ")
    response = requests.post(f"{API_URL}/marcarcorreo", json={
        "correo": correo,
        "clave": clave,
        "id_correo_favorito": int(id_correo)
    })
    print('Error: ',data['estado'],' ',data['mensaje'])

def desmarcar_favorito(correo, clave):
    id_correo = input("ID del correo a desmarcar como favorito: ")
    response = requests.delete(f"{API_URL}/desmarcarcorreo", json={
        "correo": correo,
        "clave": clave,
        "id_correo_favorito": int(id_correo)
    })
    print('Error: ',data['estado'],' ',data['mensaje'])

def main():
    print("Bienvenidos a CommuniKen ")
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
                        r_correo(correo)
                    elif opcion == '6':
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
                        r_correo(correo)
                    elif opcion == '6':
                        print("Terminando la ejecución del cliente...")
                        break
                    else:
                        print("Opción inválida, por favor intente de nuevo.")
            else:
                print("Registro fallido.")
        else:
            print("Opción inválida, por favor intente de nuevo.")

main()