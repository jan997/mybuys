# Challenge Javascript - ALKEMY 

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

Con eso ya deberia de estar funcionando el servidor en el 2052.

Sobre las tablas de la bases de datos, el 'typeORM' deberia de crearlas al iniciar por primera vez.

Luego el cliente react es casi lo mismo: `npm i` y `npm start`.

El client en modo debug usa el puerto 3000, pero hace las peticiones a la api al 2052 pero por usar otro puerto las CORS lo bloquean siempre, hay usar el navegador para habilitar todas las CORS O compilar.