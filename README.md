# Node.js Web Service
Trabajo Fin de Grado
Se trata de un servicio web desplegado mediante node.js, capaz de servir una red neuronal mediante un modelo en tensorflow.js. Utiliza mongodb como base de datos tipo NoSQL por su fácil implementación con node.

## Requisitos
Tener instalado Node.js.
Para instalar las dependencias hace falta Python 2.7 y Visual Studio para los bindings de @tensorflow/tfjs-node conforme a la [documentación oficial](https://www.npmjs.com/package/@tensorflow/tfjs-node).

## Inicialización
1. Instalar todos los módulos necesarios mediante `npm install`
2. Ejecutar `npm start`

# Directorios
Basado en arquitectura MVC

## models
Este directorio contiene los modelos de datos del proyecto, los cuáles se comunican directamente con la base de datos.

## views
Este directorio contiene el frontend. Todos los archivos que son enviados al cliente.

## controllers
Este directorio contiene a los controladores, que se encargan de comunicarse entre las vistas y los modelos.

## routes
Contiene las disferentes routes a las que se puede acceder a través del servicio web.

## util
Contiene funciones adicionales para apoyar al resto de archivos.

# Autor
Luis Chirlaque Hernández