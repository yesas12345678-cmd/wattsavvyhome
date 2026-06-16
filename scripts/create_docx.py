import subprocess
import sys
import os

def install(package):
    print(f"Instalando {package}...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    import docx
except ImportError:
    install("python-docx")
    import docx

from docx import Document
from docx.shared import Inches, Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH

def create_document():
    doc = Document()

    # Modificar estilos básicos
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Courier New'
    font.size = Pt(10.5)

    prompt_text = (
        "=== INSTRUCCIONES DE AUTOMATIZACIÓN EDITORIAL ===\n\n"
        "Hola. Necesito que automatices la generación de contenido para mi nueva web. Por favor, haz lo siguiente:\n\n"
        "1. Crea un script en la carpeta 'scripts/generateArticles.mjs' que:\n"
        "   - Cargue las variables de entorno de '.env.local' (incluyendo DEEPSEEK_API_KEY (clave a usar: sk-177cec30fdd74db1ac9b23e204deade4) y DATABASE_URL).\n"
        "   - Lea el archivo de plantilla llamado 'template_general.md' en la raíz.\n"
        "   - Obtenga todos los artículos de la base de datos PostgreSQL que tengan el campo 'content' vacío ('') o con longitud cero.\n"
        "   - Llame de forma secuencial a la API de DeepSeek (model: 'deepseek-chat', endpoint: 'https://api.deepseek.com/chat/completions') pasándole la plantilla y los metadatos de cada artículo (título, keyword, categoría).\n"
        "   - Habilite el formato JSON en la API y parsee las propiedades del JSON devuelto: 'title', 'meta_title', 'meta_description', 'excerpt' y 'content'.\n"
        "   - Realice un UPDATE en la base de datos PostgreSQL para rellenar estos campos del artículo correspondiente.\n\n"
        "2. Usa el archivo 'template_general.md' en la raíz con directivas SEO estrictas: de 2500 a 3500+ palabras, estructurado en HTML con Tailwind CSS (tablas de comparativa, callouts), tono experto (EEAT) y sin emojis bajo ninguna circunstancia.\n\n"
        "3. Ejecuta el script localmente para procesar los artículos y actualizar la base de datos de producción/desarrollo de forma automática."
    )

    # Añadir el prompt al documento
    doc.add_paragraph(prompt_text)

    # Guardar documento
    output_filename = "api.docx"
    try:
        doc.save(output_filename)
        print(f"[OK] Documento '{output_filename}' creado con éxito en la raíz del proyecto.")
    except PermissionError:
        alternative = "api_new.docx"
        doc.save(alternative)
        print(f"[ERROR] No se pudo guardar en '{output_filename}' porque está abierto en Word.")
        print(f"[OK] Se ha guardado una copia en '{alternative}' en su lugar. Cierra Word y renombra el archivo.")

if __name__ == "__main__":
    create_document()
