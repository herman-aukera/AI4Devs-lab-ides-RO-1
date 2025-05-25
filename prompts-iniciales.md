# 🧠 prompts-iniciales.md - Ejercicio Ticket ATS LTI

Este archivo documenta el **prompt inicial** utilizado para resolver el ticket técnico:

> Añadir Candidato al Sistema (proyecto LTI - GitHub Copilot)

---

## 📋 Historia de Usuario

Como reclutador,  
Quiero tener la capacidad de añadir candidatos al sistema ATS,  
Para gestionar sus datos y procesos de selección eficientemente.

---

## ✅ Prompt Utilizado

```markdown
Actúa como un **ingeniero senior fullstack** con experiencia en **Node.js/Express**, **TypeScript**, **React**, **PostgreSQL**, y prácticas como **Clean Architecture**, **validaciones robustas** y **UX/UI moderno**.

Desarrolla la funcionalidad **"Añadir Candidato"** como parte del sistema ATS del proyecto LTI. Esta funcionalidad será usada por reclutadores desde el dashboard principal.

## Requerimientos de la Historia de Usuario:

### Backend (Node.js + TypeScript + Express):

1. **Modelo de datos**: Crear interfaz `Candidate` con campos: firstName, lastName, email, phone, address, education, workExperience, cvPath
2. **API REST**: Implementar endpoints CRUD para candidatos
3. **Validaciones**: Email válido, campos requeridos, archivos PDF (max 5MB)
4. **Subida de archivos**: Implementar upload de CV en PDF con multer
5. **Persistencia**: Servicio en memoria (preparado para PostgreSQL)
6. **CORS**: Configurar para frontend React

### Frontend (React + TypeScript):

1. **Formulario responsivo**: Secciones para datos personales, educación, experiencia
2. **Validaciones cliente**: Tiempo real con feedback visual
3. **Upload de archivos**: Drag & drop para CVs PDF
4. **Lista de candidatos**: Vista en cards con información y descarga de CV
5. **UI/UX moderna**: Gradientes, animaciones, responsive design
6. **Estados de carga**: Spinners, mensajes de éxito/error

### Funcionalidades específicas:

- Botón visible para añadir candidato desde dashboard
- Formulario con todos los campos solicitados
- Validación completa frontend/backend
- Carga de CV en PDF/DOCX (enfoque en PDF)
- Mensajes de confirmación y manejo de errores
- Compatibilidad cross-browser y responsive

### Criterios técnicos:

- Arquitectura limpia y modular
- Separación de responsabilidades
- Código TypeScript tipado
- Manejo de errores robusto
- Interfaz intuitiva y accesible
```

---

## 💡 Justificación

Este prompt fue diseñado para asegurar que el asistente de código genere una solución completa, moderna y escalable. Incluye:

- **Arquitectura modular**: Separación clara entre backend y frontend
- **Validaciones completas**: Cliente y servidor para robustez
- **Experiencia de usuario**: UI/UX moderna con feedback visual
- **Escalabilidad**: Preparado para PostgreSQL y funcionalidades adicionales
- **Mejores prácticas**: TypeScript, manejo de errores, responsive design

---

## 🛠️ Archivos creados/modificados

### Backend:

- `backend/src/types/candidate.types.ts` - Interfaces de TypeScript
- `backend/src/types/index.ts` - Exportaciones de tipos
- `backend/src/services/candidate.service.memory.ts` - Servicio en memoria
- `backend/src/controllers/candidate.controller.ts` - Controladores de API
- `backend/src/routes/candidate.routes.ts` - Rutas y upload de archivos
- `backend/src/routes/index.ts` - Router principal
- `backend/src/index.ts` - Servidor Express con CORS
- `backend/uploads/` - Directorio para archivos CV

### Frontend:

- `frontend/src/types/candidate.ts` - Tipos TypeScript
- `frontend/src/services/candidateService.ts` - Cliente API
- `frontend/src/utils/validation.ts` - Validaciones
- `frontend/src/components/CandidateForm.tsx` - Formulario principal
- `frontend/src/components/CandidateForm.css` - Estilos del formulario
- `frontend/src/components/CandidateList.tsx` - Lista de candidatos
- `frontend/src/components/CandidateList.css` - Estilos de la lista
- `frontend/src/components/FileUpload.tsx` - Componente de upload
- `frontend/src/components/FileUpload.css` - Estilos del upload
- `frontend/src/App.tsx` - Aplicación principal con navegación
- `frontend/src/App.css` - Estilos globales

---

## 🧪 Funcionalidades Implementadas

### ✅ Criterios de Aceptación Cumplidos:

1. **Accesibilidad**: Navegación por tabs entre formulario y lista
2. **Formulario completo**: Todos los campos requeridos implementados
3. **Validaciones**: Frontend y backend con feedback visual
4. **Carga de documentos**: Upload de PDF con drag & drop (5MB max)
5. **Confirmación**: Mensajes de éxito tras añadir candidato
6. **Manejo de errores**: Validación robusta y mensajes informativos
7. **Compatibilidad**: Responsive design, cross-browser

### 🎯 Funcionalidades Extra:

- Descarga de CVs desde la lista de candidatos
- Animaciones y transiciones suaves
- Diseño moderno con gradientes
- Vista en cards para candidatos
- Estados de carga con spinners
- Feedback visual inmediato

---

## 🔧 Tecnologías Utilizadas

### Backend:

- **Node.js + Express**: Servidor web
- **TypeScript**: Tipado estático
- **Multer**: Upload de archivos
- **CORS**: Comunicación frontend-backend

### Frontend:

- **React + TypeScript**: Framework y tipado
- **CSS3**: Animaciones y responsive design
- **Fetch API**: Comunicación con backend

---

## 🚀 Cómo ejecutar

```bash
# Backend
cd backend
npm install
npm run build
npm start  # Puerto 3010

# Frontend
cd frontend
npm install
npm start  # Puerto 3000
```

---

## 📝 Notas de Desarrollo

- **Persistencia**: Actualmente en memoria, fácilmente migrable a PostgreSQL
- **Validaciones**: Implementadas tanto en cliente como servidor
- **UX/UI**: Diseño moderno siguiendo mejores prácticas
- **Escalabilidad**: Arquitectura preparada para funcionalidades adicionales
- **Testing**: Estructura preparada para pruebas unitarias e integración

---

## 🔍 Observaciones

- Este prompt fue iterado para generar código funcional y completo
- Se mantuvieron buenas prácticas de desarrollo fullstack
- El sistema fue probado localmente y es completamente funcional
- La interfaz es intuitiva y minimiza el tiempo de entrenamiento
- Preparado para integración con autocompletado futuro

---

_Archivo generado como parte de la entrega del ejercicio ATS LTI - Fecha: 2025-05-25_
