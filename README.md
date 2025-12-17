# TodoApp / Aplicación de Tareas

## English

### Project
TodoApp is a simple full-stack todo application. The repository contains two main parts:
- Backend: `node2` — Express + Prisma (Postgres) API
- Frontend: `ToddoApp-Frontend` — React (Vite) + Tailwind CSS

### Features
- User authentication (register/login)
- Create, read, update, delete todos
- Todo priority and state fields (migrated via Prisma)

### Tech stack
- Backend: Node.js, Express, Prisma, PostgreSQL
- Frontend: React, Vite, Tailwind CSS

### Project structure (top-level)
- `node2/` — backend source, Prisma client, migrations
- `ToddoApp-Frontend/` — frontend source and assets

### Getting started
Prerequisites: `node` (v16+), `npm` or `pnpm`, PostgreSQL.

Backend (development):

1. Install dependencies

```bash
cd node2
npm install
```

2. Provide environment variables

Create a `.env` file in `node2/` with at least:

```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
```

3. Run Prisma migrations (if you need to apply migrations locally):

```bash
cd node2
npx prisma migrate deploy   # or `npx prisma migrate dev` for local development
```

4. Start the backend

```bash
npm run dev
```

Frontend (development):

1. Install dependencies

```bash
cd ToddoApp-Frontend
npm install
```

2. Start the dev server

```bash
npm run dev
```

The frontend expects the backend API to be running. Configure the frontend service endpoints in `ToddoApp-Frontend/src/services` if needed.

### Useful scripts
- Backend: in `node2/package.json` commonly `dev`, `start`, `migrate` scripts
- Frontend: in `ToddoApp-Frontend/package.json` commonly `dev`, `build`, `preview`

### Notes
- Prisma client code is generated into `node2/generated/prisma`.
- Migrations are stored under `node2/prisma/migrations`.

### Contributing
- Open an issue or fork and create a pull request. Add clear descriptions for changes.

### License
Specify your license here (e.g., MIT) or add a `LICENSE` file.

---

## Español

### Proyecto
TodoApp es una aplicación simple de tareas full-stack. El repositorio contiene dos partes principales:
- Backend: `node2` — API con Express y Prisma (Postgres)
- Frontend: `ToddoApp-Frontend` — React (Vite) y Tailwind CSS

### Funcionalidades
- Autenticación de usuarios (registro/inicio de sesión)
- Crear, leer, actualizar y eliminar tareas
- Campos de prioridad y estado en las tareas (agregados con migraciones de Prisma)

### Tecnologías
- Backend: Node.js, Express, Prisma, PostgreSQL
- Frontend: React, Vite, Tailwind CSS

### Estructura (nivel superior)
- `node2/` — código del backend, cliente Prisma, migraciones
- `ToddoApp-Frontend/` — código y recursos del frontend

### Cómo ejecutar
Requisitos: `node` (v16+), `npm` o `pnpm`, PostgreSQL.

Backend (desarrollo):

1. Instalar dependencias

```bash
cd node2
npm install
```

2. Crear variables de entorno

Crear un archivo `.env` en `node2/` con al menos:

```
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_bd
JWT_SECRET=tu_secreto_jwt
```

3. Aplicar migraciones de Prisma (si hace falta):

```bash
cd node2
npx prisma migrate deploy   # o `npx prisma migrate dev` para desarrollo local
```

4. Iniciar el backend

```bash
npm run dev
```

Frontend (desarrollo):

1. Instalar dependencias

```bash
cd ToddoApp-Frontend
npm install
```

2. Iniciar el servidor de desarrollo

```bash
npm run dev
```

El frontend espera que la API del backend esté en ejecución. Configure los endpoints en `ToddoApp-Frontend/src/services` si es necesario.

### Scripts útiles
- Backend: en `node2/package.json` usualmente `dev`, `start`, `migrate`
- Frontend: en `ToddoApp-Frontend/package.json` usualmente `dev`, `build`, `preview`

### Notas
- El cliente de Prisma se genera en `node2/generated/prisma`.
- Las migraciones están en `node2/prisma/migrations`.

### Contribuir
- Abra un issue o haga fork y un pull request. Describa claramente los cambios.

### Licencia
Agregue aquí la licencia (por ejemplo MIT) o añada un archivo `LICENSE`.

---

If you want, I can: add a short demo GIF, expand setup steps for Docker, or add CI instructions.
