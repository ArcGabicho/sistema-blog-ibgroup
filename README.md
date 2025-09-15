# 🚀 Sistema Blog - IBGroup S.A.C.

![Portada](https://i.imgur.com/rZUEUjl.png)

Este proyecto es una aplicación web de blog desarrollada para IBGroup, utilizando [Next.js](https://nextjs.org) como framework principal. Permite la gestión y publicación de artículos, así como la administración de usuarios y comentarios.

## ✨ Características

- 📝 Publicación y edición de artículos de blog  
- 👥 Gestión de usuarios y roles  
- 💬 Comentarios en los artículos  
- 📱 Interfaz moderna y responsiva  
- 🔒 Autenticación de usuarios (Firebase Auth)  
- ☁️ Almacenamiento y base de datos en la nube (Firebase Firestore)

## 🛠️ Tecnologías principales

- ⚡ [Next.js](https://nextjs.org)
- ⚛️ React
- 🟦 TypeScript
- 🎨 CSS Modules / Tailwind CSS (según configuración)
- 🔥 Firebase (Auth & Firestore)
- ➕ (Agregar otras tecnologías relevantes si aplica)

## 📦 Instalación

Clona el repositorio y navega al directorio del proyecto:

```bash
git clone https://github.com/ArcGabicho/sistema-blog-ibgroup.git
```

```bash
cd sistema-blog-ibgroup
```

```bash
npm install
```

## ⚙️ Configuración de entorno

Crea un archivo `.env.local` en la raíz del proyecto y agrega tus credenciales de Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

## 🧪 Uso en desarrollo

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## 🚀 Despliegue

Consulta la [documentación de Next.js sobre despliegue](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.

## 📄 Licencia

Este proyecto está bajo la licencia MIT.