# SportsCoLab Website

Este repositorio contiene el código fuente del sitio web de SportsCoLab, incluyendo el frontend desarrollado con React y el backend de administración desarrollado con Flask.

## Estructura del Proyecto

```
sportscolab/
├── frontend/          # Aplicación React (Sitio web principal)
├── backend/           # Aplicación Flask (Panel de administración)
├── README.md          # Documentación principal del proyecto
└── .gitignore         # Archivos y directorios a ignorar por Git
```

## Frontend (React)

El frontend es la aplicación web principal de SportsCoLab, construida con React. Muestra información sobre la metodología, casos de éxito, diplomados, tienda y contacto.

### Configuración y Ejecución

1.  Navega al directorio `frontend`:
    ```bash
    cd frontend
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
    El sitio estará disponible en `http://localhost:5173` (o un puerto similar).
4.  Para construir la aplicación para producción:
    ```bash
    npm run build
    ```
    Los archivos de producción se generarán en el directorio `dist/`.

## Backend (Flask)

El backend es un panel de administración desarrollado con Flask que permite gestionar el contenido del sitio, como artículos de blog, casos de éxito, testimonios y productos de la tienda.

### Configuración y Ejecución

1.  Navega al directorio `backend`:
    ```bash
    cd backend
    ```
2.  Crea un entorno virtual (recomendado):
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # En Linux/macOS
    # venv\Scripts\activate   # En Windows
    ```
3.  Instala las dependencias:
    ```bash
    pip install -r requirements.txt
    ```
4.  Inicia la aplicación Flask:
    ```bash
    python app.py
    ```
    El panel de administración estará disponible en `http://localhost:5000`.

    **Credenciales de Acceso (por defecto):**
    - Usuario: `admin`
    - Contraseña: `admin123`

## Despliegue

Para desplegar el sitio web y el panel de administración en un entorno de producción, consulta la documentación específica de tu proveedor de hosting. Se recomienda utilizar servicios que soporten aplicaciones React (para el frontend) y Flask (para el backend), como Vercel/Netlify para el frontend y Heroku/DigitalOcean/AWS para el backend.

## Contribución

Si deseas contribuir a este proyecto, por favor, sigue los siguientes pasos:

1.  Haz un fork de este repositorio.
2.  Crea una nueva rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3.  Realiza tus cambios y commitea (`git commit -m 'feat: Añadir nueva funcionalidad X'`).
4.  Haz push a tu rama (`git push origin feature/nueva-funcionalidad`).
5.  Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.


