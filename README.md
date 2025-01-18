# Boxful Backend - Prueba Técnica 🚀

Este repositorio contiene la implementación de un **backend** para la prueba técnica de  **Boxful**. El sistema está diseñado para manejar operaciones relacionadas con el registro de usuarios, inicio de sesión y la creación de órdenes.

## Endpoints ✨

Este backend cuenta con 3 **endpoints** principales:

1. **Registro de usuario** (`POST /register`)  
   Permite registrar un nuevo usuario, donde la contraseña es almacenada de manera **encriptada** para mejorar la seguridad.

2. **Inicio de sesión** (`POST /login`)  
   Permite a los usuarios autenticarse, devolviendo un **token JWT** para autenticar futuras solicitudes.

3. **Crear orden** (`POST /orders`)  
   Este endpoint permite a los usuarios crear una nueva orden. Este **está protegido** por **JWT** y solo puede ser accedido por usuarios autenticados. Para acceder, es necesario enviar el **token JWT** en los headers.

## Implementación de JWT 🔐

- **JSON Web Token (JWT)** se ha implementado para la autenticación de usuarios.
- Tanto el **registro** como el **login** devuelven un **token JWT**, el cual deberá ser usado para autenticar las solicitudes a los endpoints protegidos.
- El endpoint de **crear orden** está protegido por JWT, por lo que es necesario enviar el token en los headers para poder realizar la operación.

## Base de Datos 📚

- El sistema utiliza **MongoDB** para el almacenamiento de los datos.
- Todos los registros de usuarios y órdenes son almacenados en la base de datos alojada en MongoDB.

## Variables de Entorno ⚙️

El proyecto depende de **dos variables de entorno**:

1. `DATABASE_URL`: La URL de conexión a la base de datos MongoDB.
2. `JWT_SECRET`: La clave secreta utilizada para firmar los tokens JWT.

## Seguridad 🔒

- La **contraseña** de los usuarios es **encriptada** antes de ser almacenada en la base de datos, asegurando que la información personal esté protegida.

## Colección de Postman 🛠️

En el repositorio se encuentra una carpeta llamada **Coleccion**, que contiene una **colección de Postman** con ejemplos de uso para los tres endpoints. Esto te permitirá probar las funcionalidades del backend de manera rápida y eficiente.

# Instalación ⚙️

1. 📁**Clona el repositorio:**

   Ejecuta el siguiente comando para clonar el repositorio:
   ```bash
   git clone https://github.com/Roberto640Alvarado/boxful-api-2025.git

2. 📁 Navega a la carpeta del proyecto:
   ```
   cd boxful-api-2025
3. 🔑En la raíz del proyecto, crea un archivo llamado .env y debe tener las siguientes variables de entorno:
```
"DATABASE_URL=La_URL_de_conexión_a_tu_base_de_datos_MongoDB"
"JWT_SECRET=La_clave_secreta_para_firmar_los_tokens_JWT"
```
4. 📦 Instala las dependencias necesarias:
   ```
   npm install
5. 🚀 Ejecuta el proyecto:
   ```
   npm run start

