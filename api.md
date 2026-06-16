# Guía de Automatización Editorial con IA

Este documento describe cómo automatizar la generación en lote (batch) de 100 artículos estructurados para SEO y maquetados en HTML/Tailwind CSS directamente en tu base de datos, listo para cualquier proyecto web futuro.

---

## 1. Requisitos Previos

1. **API Key de la IA**: Cuenta con saldo en la plataforma de desarrollo de DeepSeek (o cualquier otra IA compatible).
2. **PostgreSQL pre-poblado**: Una tabla `articles` que contenga los artículos planificados (título, keyword, slug, categoría, fecha, etc.) pero con el cuerpo (`content`) vacío (`''`).
3. **Variables de Entorno**: El archivo `.env.local` debe contener:
   ```env
   DEEPSEEK_API_KEY=tu_clave_api_aqui
   DATABASE_URL=tu_conexion_postgresql_aqui
   ```

---

## 2. Archivos Necesarios en el Proyecto

### A. Plantilla de Instrucciones (`template_general.md`)
Crea un archivo en la raíz llamado `template_general.md`. Este archivo contiene las directivas exactas que la IA debe seguir. Su estructura es crítica para evitar errores en el parseado del blog:
- **Longitud**: Entre 2000 y 2500 palabras de contenido útil.
- **Sin emojis**: Prohibido usar emojis.
- **Tailwind CSS + HTML**: Indicarle a la IA que use clases CSS específicas para tablas de comparación, grillas de tarjetas, llamadas de atención (callouts) y acordeones nativos de preguntas frecuentes (`<details>`).
- **Salida JSON Estricta**: Pedirle a la IA que devuelva el contenido estructurado en un objeto JSON con las propiedades `title`, `meta_title`, `meta_description`, `excerpt` y `content` (cuerpo HTML usando comillas simples para las clases de CSS).

### B. Script de Generación (`scripts/generateArticles.mjs`)
Crea este archivo en tu proyecto. El script se encarga de:
1. Conectarse a PostgreSQL.
2. Buscar todos los artículos que estén vacíos (`content = ''`).
3. Para cada uno, llamar a la API de DeepSeek pasando la plantilla de instrucciones y los datos del artículo.
4. Habilitar el formato JSON (`response_format: { type: "json_object" }`).
5. Parsear la respuesta y realizar una consulta `UPDATE` en PostgreSQL para rellenar el cuerpo y las meta-etiquetas del artículo automáticamente.
6. Esperar un delay (ej. 4 segundos) entre llamadas para no saturar la tasa de la API.

---

## 3. Instrucción para pasarle a la IA en futuros proyectos

Cuando inicies una nueva web y quieras que una IA (como Antigravity, Claude, ChatGPT, etc.) configure y ejecute este proceso de forma 100% automática, **cópiale y pégale el siguiente texto literal**:

```text
=== INSTRUCCIONES DE AUTOMATIZACIÓN EDITORIAL ===
Hola. Necesito que automatices la generación de contenido para mi nueva web. Por favor, haz lo siguiente:

1. Crea un script en la carpeta 'scripts/generateArticles.mjs' que:
   - Cargue las variables de entorno de '.env.local' (incluyendo DEEPSEEK_API_KEY y DATABASE_URL).
   - Lea un archivo de plantilla llamado 'template_general.md' en la raíz.
   - Obtenga todos los artículos de la base de datos PostgreSQL que tengan el campo 'content' vacío ('').
   - Llame de forma secuencial a la API de DeepSeek (model: 'deepseek-chat', endpoint: 'https://api.deepseek.com/chat/completions') pasándole la plantilla y los metadatos de cada artículo (título, keyword, categoría).
   - Habilite el formato JSON en la API y parsee las propiedades del JSON devuelto: 'title', 'meta_title', 'meta_description', 'excerpt' y 'content'.
   - Realice un UPDATE en la base de datos PostgreSQL para rellenar estos campos del artículo correspondiente.
   
2. Crea un archivo 'template_general.md' en la raíz con directivas SEO estrictas: de 2000 a 2500 palabras, estructurado en HTML con Tailwind CSS (tablas de comparativa, callouts), tono experto (EEAT) y sin emojis bajo ninguna circunstancia.

3. Ejecuta el script localmente para procesar los artículos y actualizar la base de datos de producción/desarrollo de forma automática.
```
