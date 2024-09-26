# Control de Asistencia

## Descripción

Este proyecto es una aplicación web para el control de asistencia de trabajadores. Permite registrar la hora de entrada y salida de los empleados, así como buscar información detallada de cada trabajador.

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **React DOM**: Paquete que proporciona métodos específicos del DOM que se pueden usar en el nivel superior de tu aplicación.
- **React Router DOM**: Biblioteca para manejar el enrutamiento en aplicaciones React.
- **Vite**: Herramienta de construcción rápida para proyectos web modernos.
- **Material-UI**: Biblioteca de componentes de interfaz de usuario para React.
  - **@mui/material**: Componentes de Material-UI.
  - **@mui/icons-material**: Iconos de Material-UI.
  - **@mui/x-date-pickers**: Componentes de selección de fecha de Material-UI.
- **Emotion**: Biblioteca para escribir estilos CSS con JavaScript.
  - **@emotion/react**: API de Emotion para React.
  - **@emotion/styled**: API de Emotion para estilos basados en componentes.
- **@fontsource/roboto**: Paquete para incluir la fuente Roboto en tu proyecto.
- **@iconify/react**: Biblioteca para usar iconos de Iconify en React.
- **@tanstack/react-query**: Biblioteca para manejar el estado de datos asíncronos en React.
- **Day.js**: Biblioteca para manipulación y formateo de fechas.
- **jsPDF**: Biblioteca para generar archivos PDF en el navegador.
- **jsPDF-AutoTable**: Plugin para jsPDF que permite crear tablas en archivos PDF.
- **Lodash**: Biblioteca de utilidades de JavaScript que proporciona funciones para tareas comunes de programación.

## DevDependencies

- `@types/react`: Proporciona las definiciones de TypeScript para React.
- `@types/react-dom`: Proporciona las definiciones de TypeScript para ReactDOM.
- `@vitejs/plugin-react-swc`: Un plugin de Vite que permite el uso de SWC para transpilar archivos React.
- `autoprefixer`: Un plugin de PostCSS que parsea CSS y añade prefijos de proveedores a las reglas CSS.
- `eslint`: Una herramienta de análisis de código estático para identificar patrones problemáticos encontrados en el código JavaScript.
- `eslint-plugin-react`: Reglas específicas de ESLint para proyectos React.
- `eslint-plugin-react-hooks`: Reglas de ESLint para los Hooks de React.
- `eslint-plugin-react-refresh`: Un plugin de ESLint para integrar React Fast Refresh en tu flujo de trabajo.
- `postcss`: Una herramienta para transformar estilos con plugins de JavaScript.
- `tailwindcss`: Un marco de CSS de utilidad de bajo nivel para construir diseños personalizados.
- `vite`: Un entorno de desarrollo que sirve a tu código a través de Native ES Modules (ESM) para un rápido tiempo de recarga.

## Estructura del Proyecto

```.
├── src
│   ├── api
│   │   └── configApi.js
│   ├── components
│   │   ├── Button.jsx
│   │   ├── CloseModal.jsx
│   │   ├── DateRangeCalenderValue.jsx
│   │   ├── Header.jsx
│   │   ├── Iconify.jsx
│   │   ├── ModalLogin.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── SelectDeparments.jsx
│   │   ├── Table.jsx
│   │   ├── UserListToolbar.jsx
│   │   └── WorkerDetails.jsx
│   ├── context
│   │   └── userContext.js
│   ├── hooks
│   │   ├── useAttendace.jsx
│   │   └── useWorker.js
│   ├── pages
│   │   ├── PageHome.jsx
│   │   └── PageAsistencia.jsx
│   ├── utils
│   │   ├── date.js
│   │   ├── convertDateFormat.js
│   │   ├── departments.js
│   │   └── exportPDF.js
│   └── index.js
├── public
│   └── cintillo_ministerio.png
├── .gitignore
├── package.json
└── README.md
```

## Instalación

Para instalar y ejecutar este proyecto en tu máquina local, sigue estos pasos:

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

### Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/control_de_asistencia.git
cd control_de_asistencia
```

## Instalar Dependencias y ejecutar el proyecto en local

```bash
npm install
npm run dev
```

## Scripts Disponibles

```bash
Inicia la aplicación en modo de desarrollo.
npm run dev

Ejecuta las pruebas unitarias utilizando Jest.
npm test

Construye la aplicación para producción en la carpeta dist.
npm run build
```

## Agregar nuevas features al proyecto:

1. Haz un fork(clonar) del proyecto.
2. Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
3. Realiza tus cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').
4. Haz push a la rama (git push origin feature/nueva-funcionalidad).
5. Abre un Pull Request.
