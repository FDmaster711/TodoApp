# TodoApp / Aplicación de Tareas

> 🚀 **PROYECTO DESPLEGADO / DEPLOYED PROJECT**
>
> 🔗 **Live Demo:** [https://todo-app-sooty-three-18.vercel.app](https://todo-app-sooty-three-18.vercel.app)

---

### 🔑 Acceso Rápido / Demo Access
Para probar la aplicación sin registrarte / To test the app without signing up:

- **Usuario / User:** `admin`
- **Contraseña / Password:** `123456`

---

## 🇪🇸 Español

### Proyecto
TodoApp es una aplicación "Full Stack" para la gestión de tareas. El repositorio contiene dos partes principales:
- **Backend:** `node2` — API construida con Node.js, Express y Prisma (PostgreSQL). **(Desplegado en Render)**
- **Frontend:** `ToddoApp-Frontend` — Interfaz de usuario construida con React, Vite y Tailwind CSS. **(Desplegado en Vercel)**

### Características
- 🔐 Autenticación segura de usuarios (JWT, registro/login).
- 📝 Crear, leer, actualizar y eliminar tareas (CRUD).
- 🚦 Gestión de prioridad y estado de las tareas.
- ☁️ **Base de datos en la nube:** PostgreSQL alojada en Render.

### Stack Tecnológico
- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router.
- **Backend:** Node.js, Express, Prisma ORM.
- **Base de Datos:** PostgreSQL.
- **Despliegue:** Vercel (Frontend) & Render (Backend + DB).

### Instalación y Ejecución Local

**Requisitos:** `node` (v16+), `npm` o `pnpm`, PostgreSQL.

#### 1. Backend (Servidor)

```bash
cd node2
npm install

###Crea un archivo .env dentro de la carpeta node2/ con las siguientes variables:
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_bd
JWT_SECRET=tu_secreto_jwt
PORT=3000

##Ejecuta las migraciones y el servidor:
npx prisma migrate dev  # Crea las tablas en tu DB local
npm run dev             # Inicia el servidor en modo desarrollo

##2. Frontend (Cliente)
cd ToddoApp-Frontend
npm install

##3(Opcional) Crea un archivo .env en ToddoApp-Frontend/:
VITE_API_URL=http://localhost:3000

###Inicia el frontend:
npm run dev

###English
Project
TodoApp is a simple full-stack todo application. The repository contains two main parts:

Backend: node2 — Express + Prisma (Postgres) API. (Deployed on Render)

Frontend: ToddoApp-Frontend — React (Vite) + Tailwind CSS. (Deployed on Vercel)

Features
🔐 Secure User authentication (JWT, register/login).

📝 Create, read, update, delete todos.

🚦 Todo priority and state management.

☁️ Cloud Database: PostgreSQL hosted on Render.

Tech stack
Frontend: React, Vite, Tailwind CSS, Axios, React Router.

Backend: Node.js, Express, Prisma ORM.

Database: PostgreSQL.

Deployment: Vercel (Frontend) & Render (Backend + DB).

Getting Started (Local Setup)
Prerequisites: node (v16+), npm or pnpm, PostgreSQL..

#### 1. Backend (Server)

```bash
cd node2
npm install

###Create a .env file inside node2/ with:
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_bd
JWT_SECRET=tu_secreto_jwt
PORT=3000

##Run migrations and start server:
npx prisma migrate dev  
npm run dev             

##2. Frontend (Client)
cd ToddoApp-Frontend
npm install

##3(Opcional) (Optional) Create a .env file inside ToddoApp-Frontend/:
VITE_API_URL=http://localhost:3000

###Start the client:
npm run dev

