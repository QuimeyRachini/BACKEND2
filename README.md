HEAD
# BACKEND2

# FILE: /backend2/backend2/README.md
# Proyecto Backend en Node.js

Este proyecto es una aplicación backend construida con Node.js y Express. Proporciona un sistema de autenticación de usuarios utilizando JWT y Passport, así como la gestión de usuarios con un modelo de datos definido en MongoDB.

## Estructura del Proyecto

```
backend2
├── src
│   ├── controllers        # Controladores para manejar la lógica de negocio
│   ├── models             # Modelos de datos utilizando Mongoose
│   ├── routes             # Rutas de la API
│   ├── middlewares        # Middleware para autenticación
│   ├── utils              # Utilidades como encriptación de contraseñas
│   ├── config             # Configuración de Passport
│   ├── app.js             # Punto de entrada de la aplicación
│   └── index.js           # Inicialización de la aplicación
├── package.json           # Configuración de npm y dependencias
└── README.md              # Documentación del proyecto
```

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/QuimeyRachini/BACKEND2.git
   cd backend2
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

## Uso

1. Inicia la aplicación:
   ```
   npm start
   ```

2. La aplicación se ejecutará en `http://localhost:3000`.

## Endpoints

- `POST /api/users/register`: Crea un nuevo usuario.
- `POST /api/users/login`: Inicia sesión y devuelve un token JWT.
- `GET /api/users/current`: Devuelve los datos del usuario logueado.

## Dependencias

- Express
- Mongoose
- Bcrypt
- Passport
- JSON Web Token (JWT)

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.