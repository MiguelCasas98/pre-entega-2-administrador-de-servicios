Administrador de Servicios
API REST construida con Node.js + Express para gestionar un listado de servicios.
La lógica de negocio está encapsulada en la clase ServiceManager y las rutas se manejan desde services.router.js.

Instalación
Instalar dependencias:

Código
npm install
Crear un archivo .env en la raíz del proyecto:

Código
PORT=8080
NODE_ENV=development
El archivo .env no se sube al repositorio.
En .env.example se incluyen las claves sin valores.

Ejecutar el proyecto
Código
npm start
El servidor se inicia en el puerto definido en .env.

Variables de entorno
PORT → Puerto del servidor
NODE_ENV → Entorno de ejecución

Estructura del proyecto
Código
src/
  config/env.config.js
  managers/ServiceManager.js
  routes/services.router.js
  app.js
  server.js
package.json
.env.example
.gitignore
README.md
Clase ServiceManager
Administra un listado de servicios en memoria.

Cada servicio tiene:

id
name
description
duration
price
category
available

Métodos
getServices()
Código
manager.getServices();
getServiceById(id)
Código
manager.getServiceById(1);
addService(data)
Código
manager.addService({
  name: "Masaje relajante",
  description: "Masaje de 45 minutos",
  duration: 45,
  price: 5000,
  category: "salud",
  available: true
});
updateService(id, data)
Código
manager.updateService(2, { price: 6000, available: false });
deleteService(id)
Código
manager.deleteService(2);
Endpoints REST
GET /api/services
Devuelve todos los servicios.
Filtros opcionales:

?category=salud
?available=true

GET /api/services/:sid
Devuelve un servicio por id.
200 si existe
404 si no existe

POST /api/services
Crea un servicio nuevo.
201 si se crea
400 si faltan campos
El id se genera automáticamente

PUT /api/services/:sid
Actualiza un servicio existente.
200 si existe
404 si no existe
No permite modificar el id

DELETE /api/services/:sid
Elimina un servicio.
200 si existe
404 si no existe

Notas
No se sube node_modules ni .env al repositorio.
El id se genera automáticamente.
Proyecto sin base de datos, usando almacenamiento en memoria.