# La Nit - Formulario de Briefing Estratégico

Formulario interactivo para el cuestionario de descubrimiento de identidad y direccionalidad de La Nit.

## 🚀 Deploy en Vercel (Recomendado)

### Opción 1: Deploy desde GitHub (MÁS FÁCIL)

1. **Sube el proyecto a GitHub:**
   ```bash
   # En tu terminal, dentro de la carpeta del proyecto:
   git init
   git add .
   git commit -m "Initial commit: La Nit briefing form"
   
   # Crea un nuevo repositorio en GitHub y luego:
   git remote add origin https://github.com/TU_USUARIO/la-nit-briefing.git
   git push -u origin main
   ```

2. **Deploy en Vercel:**
   - Ve a [vercel.com](https://vercel.com) y haz login
   - Click en "Add New" → "Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Vite
   - Click en "Deploy"
   - ¡Listo! Tendrás una URL tipo: `https://la-nit-briefing.vercel.app`

### Opción 2: Deploy directo con Vercel CLI

```bash
# Instala Vercel CLI
npm i -g vercel

# Dentro de la carpeta del proyecto:
vercel

# Sigue las instrucciones en terminal
# Al final tendrás tu URL de producción
```

## 💻 Desarrollo Local

Si quieres ver el formulario en local antes de subirlo:

```bash
# Instala dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev

# Abre http://localhost:5173 en tu navegador
```

## 📊 Configuración de Google Sheets

El formulario ya está configurado para enviar las respuestas a tu Google Sheet.

**URL del webhook actual:** 
```
https://script.google.com/macros/s/AKfycbwwQv6ME6OogE7H9rmxq249SIQu4NxckCup-Lo2Zt5iKw26JaZBOqymYukvx1CACQI/exec
```

Las respuestas se guardarán automáticamente en formato:
- **Timestamp** | **Pregunta** | **Respuesta**

## 🎨 Personalización

### Cambiar colores

Los colores principales están en el `<style>` del componente:
- **Verde boreal:** `#82FF7A`
- **Violeta polar:** `#4A546A`
- **Negro carbón:** `#1B1B1A`

### Modificar preguntas

Edita el array `formStructure` en `src/LaNitBriefingForm.jsx`

## 📱 Características

- ✅ Totalmente responsive (móvil y desktop)
- ✅ Validación en tiempo real
- ✅ Barra de progreso
- ✅ Sliders visuales para rangos
- ✅ Validación flexible de porcentajes (95-105%)
- ✅ Guardado automático en Google Sheets
- ✅ Diseño con la paleta de colores de ESES

## 🔧 Troubleshooting

### No se envían las respuestas a Google Sheets

1. Verifica que el script de Google Apps Script esté deployado
2. Asegúrate que "Who has access" está en "Anyone"
3. Comprueba la URL del webhook en el componente

### Errores al instalar

```bash
# Limpia node_modules e intenta de nuevo
rm -rf node_modules package-lock.json
npm install
```

## 📞 Soporte

Creado por ESES Agency
Para dudas: [tu-email@eses.agency]

---

**Último update:** Noviembre 2025
