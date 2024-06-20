import requests

BASE_URL = 'http://localhost:5432/api'

def login():
    correo = input("Correo: ")
    clave = input("Clave: ")
    return correo, clave

def mostrar_menu():
    print("1. Enviar un correo")
    print("2. Ver información de una dirección de correo electrónico")
    print("3. Ver correos marcados como favoritos")
    print("4. Marcar correo como favorito")
    print("5. Terminar con la ejecución del cliente")

def main():
    correo, clave = login()
    while True:
        mostrar_menu()
        opcion = input("Seleccione una opción: ")
        if opcion == '1':
            # Código para enviar un correo
            pass
        elif opcion == '2':
            # Código para ver información
            pass
        elif opcion == '3':
            # Código para ver correos favoritos
            pass
        elif opcion == '4':
            # Código para marcar correo como favorito
            pass
        elif opcion == '5':
            print("Terminando la ejecución del cliente.")
            break
        else:
            print("Opción no válida, intente de nuevo.")

if __name__ == "__main__":
    main()
