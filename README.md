# LTI - Sistema de Seguimiento de Talento (ATS)

Este proyecto es una aplicación full-stack de **Applicant Tracking System (ATS)** diseñada para reclutadores. Incluye funcionalidades completas para gestionar candidatos con un frontend moderno en React y un backend robusto en Express con TypeScript.

## 🚀 Funcionalidades Implementadas

### ✅ **"Añadir Candidato al Sistema"** - COMPLETADO

- **Formulario completo** con validaciones para datos del candidato
- **Upload de CV** en formato PDF con validación de tamaño (5MB max)
- **Visualización de candidatos** en formato de cards responsivo
- **Descarga de CVs** desde la lista de candidatos
- **Validaciones robustas** tanto en frontend como backend
- **UI/UX moderna** con animaciones y diseño responsive
- **Manejo de errores** y mensajes de confirmación

### 🎯 Criterios de Aceptación Cumplidos:

1. ✅ **Accesibilidad**: Botón visible para añadir candidatos
2. ✅ **Formulario completo**: Todos los campos requeridos implementados
3. ✅ **Validaciones**: Email, campos obligatorios, formatos correctos
4. ✅ **Carga de documentos**: Upload de CV en PDF con drag & drop
5. ✅ **Confirmación**: Mensajes de éxito al añadir candidatos
6. ✅ **Manejo de errores**: Validaciones y mensajes informativos
7. ✅ **Compatibilidad**: Responsive design y cross-browser

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js + Express + TypeScript
- **Frontend**: React + TypeScript
- **Base de datos**: PostgreSQL (configurada con Docker)
- **ORM**: Prisma (preparado para futuras implementaciones)
- **Upload de archivos**: Multer
- **Styling**: CSS3 con gradientes y animaciones
- **Validaciones**: Frontend (React) + Backend (Express)

## Explicación de Directorios y Archivos

- `backend/`: Contiene el código del lado del servidor escrito en Node.js + TypeScript.
  - `src/`: Contiene el código fuente para el backend.
    - `index.ts`: El punto de entrada para el servidor backend.
    - `controllers/`: Controladores para manejar las rutas de la API.
    - `routes/`: Definición de rutas y endpoints.
    - `services/`: Lógica de negocio y servicios (memoria e implementación futura con Prisma).
    - `types/`: Definiciones de tipos TypeScript.
  - `uploads/`: Directorio para almacenar archivos CV subidos.
  - `prisma/`: Contiene el archivo de esquema de Prisma para ORM (preparado para uso futuro).
  - `tsconfig.json`: Archivo de configuración de TypeScript.
- `frontend/`: Contiene el código del lado del cliente escrito en React + TypeScript.
  - `src/`: Contiene el código fuente para el frontend.
    - `components/`: Componentes React reutilizables.
    - `services/`: Servicios para comunicación con la API.
    - `types/`: Definiciones de tipos TypeScript.
    - `utils/`: Utilidades y funciones de validación.
  - `public/`: Contiene archivos estáticos como el archivo HTML e imágenes.
- `docker-compose.yml`: Configuración de Docker Compose para PostgreSQL.
- `prompts-iniciales.md`: Documentación del prompt utilizado para desarrollar el proyecto.
- `README.md`: Este archivo con información del proyecto e instrucciones.

## Estructura del Proyecto

El proyecto está dividido en dos directorios principales: `frontend` y `backend`.

### Frontend

El frontend es una aplicación React y sus archivos principales están ubicados en el directorio `src`. El directorio `public` contiene activos estáticos y el directorio `build` contiene la construcción de producción de la aplicación.

### Backend

El backend es una aplicación Express escrita en TypeScript.

- El directorio `src` contiene el código fuente
- El directorio `prisma` contiene el esquema de Prisma.

## Primeros Pasos

Para comenzar con este proyecto, sigue estos pasos:

### 1. Clonar e instalar dependencias

```bash
# Clonar el repositorio
git clone <repository-url>
cd AI4Devs-lab-ides-RO-1

# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install
```

### 2. Configurar la base de datos (opcional)

```bash
# Iniciar PostgreSQL con Docker
docker-compose up -d
```

### 3. Ejecutar el proyecto

**Terminal 1 - Backend:**

```bash
cd backend
npm run build
npm start
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm start
```

### 4. Acceder a la aplicación

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3010
- **Base de datos PostgreSQL**: localhost:5432

## ✨ Cómo usar la aplicación

1. **Navegar al frontend** en http://localhost:3000
2. **Añadir candidatos** usando el formulario en la pestaña "Añadir Candidato"
3. **Subir CVs** en formato PDF (drag & drop disponible)
4. **Ver candidatos** en la pestaña "Lista de Candidatos"
5. **Descargar CVs** usando el botón de descarga en cada card de candidato

## 🔧 API Endpoints

- `GET /api/candidates` - Obtener todos los candidatos
- `POST /api/candidates` - Crear nuevo candidato
- `GET /api/candidates/:id` - Obtener candidato por ID
- `PUT /api/candidates/:id` - Actualizar candidato
- `DELETE /api/candidates/:id` - Eliminar candidato
- `POST /api/candidates/upload-cv/:id` - Subir CV para candidato
- `GET /api/candidates/download-cv/:id` - Descargar CV de candidato

## 🐳 Docker y PostgreSQL

Este proyecto usa Docker para ejecutar una base de datos PostgreSQL. Para configurarla:

```bash
# Iniciar PostgreSQL con Docker
docker-compose up -d

# Detener el contenedor
docker-compose down
```

### Detalles de conexión PostgreSQL:

- **Host**: localhost
- **Port**: 5432
- **User**: LTIdbUser
- **Password**: D1ymf8wyQEGthFR1E9xhCq
- **Database**: LTIdb

## 📝 Notas de desarrollo

- **Persistencia actual**: El proyecto utiliza almacenamiento en memoria para demostración
- **Base de datos**: PostgreSQL está configurada y lista para implementación futura
- **Esquema Prisma**: Preparado para migración cuando se implemente persistencia real
- **Archivos**: Los CVs se almacenan en `/backend/uploads/`

## 🚀 Estado del proyecto

✅ **COMPLETADO** - Funcionalidad "Añadir Candidato al Sistema"

- Todos los criterios de aceptación implementados
- Frontend y backend completamente funcionales
- Upload y descarga de CVs operativa
- Validaciones robustas implementadas
- UI/UX moderna y responsive

¡El proyecto está listo para entrega y revisión!
