# Backend de la Aplicación FastAPI

Este es el backend de la aplicación, que integra la generación de consultas SQL utilizando la API de Groq y la ejecución de las consultas en una base de datos MySQL. Además, se incluye una interfaz web construida con Streamlit para interactuar con el sistema.

# Características

- **Conexión con la base de datos MySQL:** Conexión segura a la base de datos mediante configuraciones dinámicas.
- **Generación de consultas SQL:** Utiliza la API de Groq para generar consultas SQL basadas en el esquema de la base de datos y el historial de conversación.

- **Gestión de la conversación:** Historial de conversación con la IA, que recuerda los mensajes anteriores para generar respuestas coherentes y útiles.
- **Ejecución de consultas SQL:** Ejecución de las consultas generadas en MySQL y visualización de los resultados en una interfaz limpia.

# Requisitos
1. Python 3.8+
2. Instalar las dependencias
```
pip install -r requirements.txt
```
3. Configuración del archivo .env con las claves necesarias:

- **GROQ_API_KEY:** La clave API de Groq.
- **DB_HOST:** Dirección del servidor de la base de datos MySQL.
- **DB_PORT:** Puerto de la base de datos MySQL.
- **DB_USER:** Usuario de la base de datos MySQL.
- **DB_PASSWORD:** Contraseña de la base de datos MySQL.
- **DB_DATABASE:** Nombre de la base de datos.


### USO

1. Iniciar la aplicación:

```
uvicorn app.main:app --reload
```

2. En el navegador, accede a la interfaz en:

```
http://127.0.0.1:8000/docs
```
3. Configura los parámetros de la base de datos en la barra lateral y establece la conexión.

4. Escribe preguntas en el chat y la IA generará consultas SQL automáticamente, que se ejecutarán en la base de datos y se mostrarán los resultados.

### Estructura del proyecto

```plaintext
/backend
    ├── app.py              # Archivo principal de Streamlit
    ├── .env                # Variables de entorno (clave API y credenciales de base de datos)
    ├── requirements.txt     # Dependencias del proyecto
    └── README.md           # Documentación del backend
```

