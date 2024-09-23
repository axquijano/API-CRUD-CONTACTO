# Proyecto de Libreta de Contactos

Este es un proyecto de libreta de contactos que incluye un backend construido con Node.js, una base de datos PostgreSQL y un frontend en React.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu sistema:

- [Node.js](https://nodejs.org/en/download/) (v14 o superior)
- [npm](https://www.npmjs.com/get-npm) (incluido con Node.js)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/downloads)

## Instalación

### 1. Clona el repositorio

Abre una terminal y ejecuta el siguiente comando para clonar el repositorio:

```bash
git clone https://github.com/axquijano/API-CRUD-CONTACTO.git
```
### 2. Configurando la base de datos

Una vez dentro del SQL shell de PostgreSQL, ingresa con tus credenciales. Para ejecutar el script de creación de la base de datos y tablas, debes copiar la ruta en donde se encuentra el archivo `db.sql`, que se encuentra en la carpeta `API-CRUD-CONTACTO/Database/db.sql`. Asegúrate de copiar toda la ruta absoluta y que esté utilizando el carácter `/`.
```
\i ruta/al/proyecto/database/db.sql
```
Ejemplo 
`\i D:/Tecnologias/PERN/Prueba/API-CRUD-CONTACTO/database/db.sql`
### 3. Verifica que las tablas se han creado correctamente:

Para confirmar que la base de datos está configurada correctamente, lista las tablas ejecutando:

```bash
\dt
```
Deberías ver las siguientes tablas:

- contact
- users
- phone

### 4. Instala las dependencias del backend:

Entra al proyecto y abre una terminal en donde ejecutaras el comando
```
npm install
```
### 5. Configura las variables para la base de datos
Dirígete a la carpeta raíz del proyecto, luego entra a la carpeta `src`, y en este directorio encontrarás un archivo `db.js` que debes modificar. Cambia user, password  con tus credenciales de PostgreSQL:
```javascript
export const pool = new pg.Pool({
    user: "tu_usuario",
    password : "tu_contraseña",
    host : "localhost",
    port: 5432,
    database: "contactdb"
});
```
### 6. Ejecuta el servidor backend:

En la misma terminal ejecuta:
```
npm run dev
```
### 7. Instala las dependencias del frontend:

Navega al directorio del frontend y ejecuta:
abrir otra terminal
```
cd .\client\
npm install
```
### 8. Ejecuta el servidor frontend:

En el directorio del frontend, ejecuta:
```
npm run dev 
```
## Uso

1. Asegúrate de que ambos servidores (backend y frontend) estén en ejecución.
2. Abre tu navegador y dirígete a [http://localhost:5173/](http://localhost:5173/).
3. Utiliza las siguientes credenciales para iniciar sesión:
   - **Usuario:** axquijano@gmail.com
   - **Contraseña:** 1233

## Tecnologías Utilizadas

Aquí hay una lista de las tecnologías utilizadas en este proyecto:

<div style="display: flex; justify-content: space-around;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png" alt="Node.js" width="100" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/620px-Postgresql_elephant.svg.png" alt="PostgreSQL" width="100" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="100" />
    <img src="https://react-hook-form.com/images/logo/react-hook-form-logo-only.png" alt="React Hook Form" width="100" />
</div>

