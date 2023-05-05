# Challenge Storydots - Fullstack React Node.js

Este proyecto es una aplicación web que permite a los usuarios crear, ver, actualizar y eliminar productos. 
La aplicación está construida con una arquitectura fullstack utilizando React y Node.js. 

Frontend: https://brian-cabrera-story-dots-challenge.vercel.app/
Backend: https://story-dots-server.onrender.com/


# Funcionalidades

- Header de navegación:  el header contiene los enlaces a las diferentes vistas de la aplicación, 
 incluyendo la vista de inicio, la vista de administración, y el login y resgistro.
 
- Registro y Login: la aplicación permite a los usuarios registrarse y loguearse para acceder a las funcionalidades exclusivas de usuario.

- Creación, actualización y eliminación de productos: una vez que el usuario ha iniciado sesión, puede crear , 
  actualizar y eliminar los productos.

- Home: la vista de inicio muestra una lista de productos, incluyendo una imagen del producto, 
 la marca, el nombre y el precio.
 
- Vista de detalles de producto: al hacer clic en un producto en la vista de inicio, el usuario es llevado a la vista de detalles del producto que muestra la marca, el nombre, el precio y la descripción. Dependiendo si el usuario ha iniciado sesión o no, se mostrarán los botones para actualizar o eliminar el producto.
  
- Paginación: la vista de inicio carga un máximo de 8 productos y se puede paginar para obtener los siguientes productos en la base de datos.
 
# Dependencias

Frontend
- [Typescript](https://www.typescriptlang.org/) : Un superconjunto de JavaScript que agrega tipos estáticos al lenguaje
- [React](https://reactjs.org/) : Una biblioteca de JavaScript para construir interfaces de usuario
- [react-router-dom](https://reactrouter.com/en/main) : Una biblioteca para el manejo de rutas en aplicaciones de React
- [@vitejs/plugin-react](https://github.com/vitejs/vite/tree/main/packages/plugin-react) : un complemento para el compilador Vite que permite la compilación de archivos de React.
- [@tanstack/react-query](https://tanstack.com/query/v4/) :  una biblioteca de administración de estados que simplifica la gestión de la caché y el estado remoto.
- [Firebase](https://firebase.google.com/) : Para almacenar las imagenes
- [Formik](https://formik.org/) :una biblioteca de React para construir formularios complejos y validaciones.
- [Yup](https://github.com/jquense/yup) : una biblioteca de validación de esquemas para JavaScript.
- [SweetAlert2](https://sweetalert2.github.io/) : una biblioteca para mostrar ventanas modales personalizadas, como alertas y confirmaciones.
- [UUID](https://github.com/jquense/yup) : una biblioteca para generar identificadores únicos universales (UUID). Lo utilicé para almacenar las imagenes
- [ESLint](https://eslint.org/) : una herramienta de análisis estático de código para identificar y reportar patrones problemáticos en el código JavaScript.

Backend

 -Funcionamiento: El backend funciona recibiendo solicitudes a través de Express, manejando estas solicitudes en los controladores correspondientes y realizando operaciones en la base de datos utilizando Mongoose. 
  Los resultados de estas operaciones se envian al cliente a través de la respuesta HTTP

- Typescript
- [Express](https://expressjs.com/) : Un marco de servidor para aplicaciones de Node.js
- [Express-validator](https://express-validator.github.io/docs/) : Una biblioteca para validar datos en aplicaciones de Express
- [Mongoose](https://mongoosejs.com/) : una biblioteca de modelado de objetos de MongoDB para Node.js.
- [Dotenv](https://www.npmjs.com/package/dotenv) : una biblioteca para cargar variables de entorno desde un archivo .env.
- [CORS](https://github.com/expressjs/cors) : una biblioteca para habilitar CORS en las solicitudes HTTP.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) : Una biblioteca para trabajar con tokens JWT
- [bcrypt](https://www.npmjs.com/package/bcrypt) : una biblioteca para cifrar contraseñas.
- [Jest](https://jestjs.io/) : un framework de pruebas para JavaScript.
- [Supertest](https://www.npmjs.com/package/supertest) : Stripe es una plataforma de pagos en línea segura y fácil de usar para aceptar pagos en aplicaciones web.
- [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) : una biblioteca para ejecutar una instancia de MongoDB en memoria durante las pruebas.

# Instalación 
 ```javascript 
  npm run install-all
```
# Configuración de variables de entorno
```javascript 
- MONGO_DB_URL=tu base de datos mongoDB
- PORT=3001
- SECRET=secreto-de-tu-token-jwt
```

# Uso
 ```javascript
-backend: cd server | npm run dev
-frontend: cd client | npm run dev
 
