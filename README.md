# Liteflix Challenge

Este proyecto es un catálogo de películas dinámico desarrollado con Next.js, Tailwind, TypeScript, Cloudinary y animaciones con Framer Motion.

## Requisitos

Antes de comenzar con el proyecto, asegúrate de tener instalados los siguientes elementos:

- [Node.js](https://nodejs.org) (versión 14 o superior)
- [npm](https://www.npmjs.com/) o [Yarn](https://yarnpkg.com/) (se recomienda Yarn)

## Configuración del proyecto

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

1. Clona este repositorio en tu máquina local o descárgalo como archivo ZIP.

2. Abre una terminal y navega hasta la carpeta raíz del proyecto.

3. Instala las dependencias del proyecto ejecutando el siguiente comando:

   ```shell
   npm install
   ```

   o

   ```shell
   yarn install
   ```
4. Se debe crear un archivo `.env.local` en el directorio raíz del proyecto, si se desea, solicitar las envs


5. Una vez completada la instalación de las dependencias, puedes ejecutar el proyecto con el siguiente comando:

   ```shell
   npm run dev
   ```

   o

   ```shell
   yarn dev
   ```

   Esto iniciará el servidor de desarrollo y podrás acceder al proyecto en tu navegador en la dirección que indique la consola.
   
## Estructura del proyecto
 ```shell
├── app            # Pagina y componentes que se renderizan del lado del servidor
     ├── api              #  Api's del lado del servidor
├── components     # Componentes que se crean del lado del cliente
├── services       # Archivos con funciones que conectan a los distintos endpoints
   ```
