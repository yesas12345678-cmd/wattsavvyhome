export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: {
    name: string;
    slug: string;
  };
  date: string;
  readTime: string;
  imageUrl?: string;
  imageGradient: string;
  author: string;
  content: string; // Dynamic body content of the article
  metaTitle?: string;
  metaDescription?: string;
  keyword?: string;
}

export const ALL_ARTICLES: Article[] = [
  {
    id: "shelly-em-analisis-medidor-monofasico",
    title: "Shelly EM: El análisis definitivo del medidor de energía Wi-Fi más versátil",
    excerpt: "Analizamos en profundidad el Shelly EM, el rey de la monitorización doméstica. Medición bidireccional, integraciones locales y cómo instalarlo sin peligro en tu cuadro eléctrico.",
    category: { name: "Monitores de Energía", slug: "monitores-de-energia" },
    date: "16 Jun 2026",
    readTime: "Lectura de 7 min",
    imageGradient: "from-emerald-500 to-teal-600",
    author: "Alex R. (Domotizador)",
    content: `El **Shelly EM** se ha convertido por méritos propios en el dispositivo de referencia para quienes quieren dar sus primeros pasos en serio en la monitorización energética. A diferencia de los enchufes inteligentes, este dispositivo se instala directamente en el cuadro eléctrico y mide el consumo general de tu casa (o la producción de tus paneles solares) utilizando pinzas amperimétricas (transformadores de corriente).

## ¿Qué hace tan especial al Shelly EM?

El gran punto fuerte de este dispositivo es su flexibilidad y precisión.
*   **Doble canal de medición:** Cuenta con dos entradas para pinzas (de 50A o 120A), lo que te permite medir dos circuitos diferentes (por ejemplo, el consumo total de la casa y la producción de tu planta solar fotovoltaica).
*   **Medición bidireccional:** Detecta si la corriente entra a tu casa (consumo de red) o sale (excedentes solares inyectados).
*   **API Local y MQTT:** No dependes de la nube de Shelly. Puedes conectarlo de forma local a Home Assistant, Node-RED, o cualquier otro software sin retrasos y con total privacidad.
*   **Relé interno libre de potencial:** Incluye una salida de relé de 2A que puedes usar para activar un contactor y encender o apagar un termo eléctrico de forma automática cuando tengas excedentes de energía solar.

## Instalación paso a paso (Sin cortar cables)

La instalación de un transformador de corriente es extremadamente sencilla y no requiere cortar ningún cable, pero **recuerda desconectar el interruptor general antes de manipular el cuadro**:

1.  **Colocación de la pinza:** Abraza el cable de fase principal (suele ser de color marrón, negro o gris) que entra desde el contador de la distribuidora antes del Interruptor General Automático (IGA). Asegúrate de que la flecha grabada en la pinza apunta en la dirección de paso de la corriente (hacia el interior del cuadro).
2.  **Alimentación del módulo:** Conecta los bornes L (Fase) y N (Neutro) del Shelly EM a un disyuntor libre para alimentar el chip del dispositivo. Es vital que el cable de fase usado para alimentarlo sea el mismo que mide la pinza para que la medición del factor de potencia (coseno de phi) sea exacta.
3.  **Conexión de las pinzas:** Conecta el conector jack de la pinza amperimétrica al canal correspondiente (O1 o O2) del módulo Shelly.

## Integración en Home Assistant

Para añadirlo a Home Assistant, la integración nativa de Shelly lo detectará automáticamente en tu red local. Solo necesitas introducir la dirección IP local del dispositivo y tendrás acceso a:
*   **Potencia activa instantánea (W):** Para ver el consumo en tiempo real.
*   **Energía acumulada (kWh):** Tanto consumida como devuelta a la red, ideal para el panel de Energía nativo de Home Assistant.
*   **Voltaje (V):** Muy útil para comprobar si sufres caídas de tensión por encima o debajo de los límites seguros.

## Veredicto

Si buscas una forma económica, profesional y no intrusiva de saber cuánto consumes en tiempo real, el Shelly EM es insuperable. Su relación calidad-precio (ronda los 45-55€ con pinza incluida) y su compatibilidad abierta lo hacen una compra obligatoria para cualquier entusiasta de la eficiencia energética.`,
    metaTitle: "Shelly EM en profundidad: Instalación, Características y Opiniones",
    metaDescription: "Todo lo que necesitas saber sobre el medidor de energía Shelly EM. Analizamos su precisión, esquema de instalación en cuadro eléctrico e integración local."
  },
  {
    id: "tapo-p110-enchufe-inteligente-consumo",
    title: "TP-Link Tapo P110: ¿El mejor enchufe inteligente para medir consumos?",
    excerpt: "Ponemos a prueba la precisión de medición del Tapo P110. Analizamos su app, su integración con Home Assistant y si merece la pena frente a alternativas genéricas.",
    category: { name: "Enchufes Inteligentes", slug: "enchufes-inteligentes" },
    date: "12 Jun 2026",
    readTime: "Lectura de 5 min",
    imageGradient: "from-blue-500 to-cyan-600",
    author: "Sofía G. (Ingeniera de Redes)",
    content: `El mercado de los enchufes inteligentes está saturado de clones chinos de bajo coste que prometen medir el consumo de tus electrodomésticos, pero que a menudo fallan en precisión o presentan problemas de sobrecalentamiento. El **TP-Link Tapo P110** se presenta como una alternativa de marca reconocida, económica y con especificaciones de seguridad muy rigurosas.

## Características principales del Tapo P110

*   **Capacidad de carga de hasta 16A (3680W):** Soporta electrodomésticos de gran consumo como termos, lavavajillas o lavadoras sin degradar sus componentes internos.
*   **Monitorización en tiempo real:** Muestra los vatios actuales, el consumo diario, semanal y mensual, junto con gráficos históricos en la aplicación Tapo.
*   **Protección contra sobrecargas:** Apaga automáticamente el enchufe si el consumo supera el umbral límite establecido por seguridad.
*   **Conexión Wi-Fi de 2.4 GHz:** No requiere concentrador (hub); se conecta directamente al router de casa.

## Precisión de la medición bajo la lupa

Hemos probado el Tapo P110 conectándolo en serie con un analizador de red profesional para medir cargas estables (resistencias y bombillas) y variables (motores y ordenadores):

1.  **Cargas resistivas (Termo eléctrico):** La desviación de la medición es inferior al **0.8%**. Muestra una precisión asombrosa para un dispositivo de consumo masivo de menos de 15€.
2.  **Cargas reactivas/electrónicas (Ordenador Gaming):** Capta perfectamente las fluctuaciones de consumo rápido sin promediar en exceso los datos.
3.  **Gráficos en la App:** La aplicación Tapo calcula estimaciones de costes basándose en tu tarifa configurada, lo que ayuda a entender de un vistazo cuánto cuesta usar ese aparato en concreto.

## Integraciones y Domótica

El gran debate del ecosistema Tapo es su dependencia de la nube. Aunque la aplicación nativa funciona a través de sus servidores, la comunidad ha desarrollado integraciones locales muy sólidas para **Home Assistant**. Esto permite extraer los datos de consumo de forma local sin que tu información viaje a servidores externos, reduciendo la latencia a menos de 1 segundo.

## Veredicto

El Tapo P110 es, sin duda, una de las mejores compras si quieres auditar electrodomésticos individuales (como la nevera, el mueble de la televisión o el termo). Su fiabilidad eléctrica, la solidez de su app y su precio competitivo lo sitúan muy por encima de las marcas genéricas sin marca del mercado.`,
    metaTitle: "TP-Link Tapo P110: Análisis de precisión y opiniones del enchufe medidor",
    metaDescription: "Analizamos el enchufe inteligente TP-Link Tapo P110 con medición de consumo. Descubre su precisión, límites de potencia y si se puede usar sin la nube."
  },
  {
    id: "guia-destruir-vampiros-energeticos-standby",
    title: "Guía práctica: Cómo cazar y destruir a los vampiros energéticos de tu hogar",
    excerpt: "El consumo silencioso en stand-by puede representar más del 10% de tu factura de luz. Te enseñamos a identificarlos y a eliminarlos de forma automatizada.",
    category: { name: "Guías de Ahorro", slug: "guias-de-ahorro" },
    date: "09 Jun 2026",
    readTime: "Lectura de 6 min",
    imageGradient: "from-purple-600 to-indigo-600",
    author: "Alex R. (Domotizador)",
    content: `Se les conoce como **vampiros energéticos** a todos esos electrodomésticos y dispositivos que, a pesar de estar apagados o en modo de espera (stand-by), siguen consumiendo electricidad las 24 horas del día. Aunque individualmente consumen pocos vatios (entre 1W y 15W), la suma de todos los dispositivos de una vivienda media puede suponer un sobrecoste de entre 50€ y 150€ al año en la factura de la luz.

## Los sospechosos habituales del consumo silencioso

Aquí tienes una lista de los peores culpables que tienes en casa y su consumo estimado en reposo:
*   **Decodificador de TV por cable/satélite:** Entre 10W y 25W en modo stand-by. Es el vampiro más voraz.
*   **Consolas de videojuegos:** En modo de inicio rápido o suspensión pueden consumir de 10W a 15W.
*   **Televisores modernos (Smart TV):** Aunque la ley europea limita el consumo en stand-by a 0.5W, muchos modelos antiguos o con funciones de encendido rápido activas consumen entre 3W y 8W.
*   **Cargadores de móvil y portátiles:** Dejarlos enchufados sin conectar al dispositivo consume entre 0.1W y 0.5W. No parece mucho, pero multiplica por todos los cargadores de tu casa.
*   **Equipos de música y altavoces inteligentes:** Especialmente si tienen asistentes de voz siempre escuchando (5W - 8W).

## Cómo medir y localizar el consumo parásito

Para cazar a estos vampiros, necesitas herramientas. La forma más barata y efectiva es utilizar un enchufe inteligente con medición de consumo (como el Tapo P110 o un Shelly Plug). 
Conéctalo entre la toma de pared y el dispositivo o regleta que quieras testear. Apaga el aparato con su mando a distancia y observa el consumo en vatios residual en la aplicación. Si ves más de 2W-3W, tienes un vampiro energético en potencia.

## 3 Estrategias automáticas para eliminarlos

No tienes que ir desenchufando cosas manualmente todas las noches. Utiliza la tecnología para hacerlo por ti:

1.  **Regletas inteligentes programables:** Conecta la zona del televisor (TV, consola, barra de sonido, deco) a una regleta domótica. Programa su apagado completo a las 1:00 AM y su encendido a las 8:00 AM, o bien haz que se apague automáticamente cuando el consumo baje de 15W durante 10 minutos (señal de que la TV se ha apagado).
2.  **Automatización por presencia:** Apaga enchufes inteligentes cuando la última persona salga de casa mediante la geolocalización de tu smartphone.
3.  **Interruptores físicos de pared inteligentes:** Domotiza el enchufe del microondas u horno y córtale la corriente por completo con automatizaciones sencillas cuando no estés cocinando.`,
    metaTitle: "Cómo eliminar el consumo en stand-by de tus electrodomésticos",
    metaDescription: "Aprende a localizar y apagar los consumos fantasma o parásitos de tu hogar. Trucos y automatizaciones fáciles para reducir la factura eléctrica."
  },
  {
    id: "huawei-fusionsolar-monitorizacion-autoconsumo",
    title: "Huawei FusionSolar: Entendiendo los gráficos de tu instalación fotovoltaica",
    excerpt: "Explicamos cómo interpretar los datos de producción solar, consumo directo, exportación a la red y carga de baterías en el portal FusionSolar.",
    category: { name: "Monitorización Solar", slug: "monitorizacion-solar" },
    date: "05 Jun 2026",
    readTime: "Lectura de 8 min",
    imageGradient: "from-amber-500 to-orange-600",
    author: "Diego M. (Especialista Solar)",
    content: `Tener placas solares en casa es solo la mitad del camino hacia la eficiencia; la otra mitad es saber cuándo y cómo consumir esa energía. La plataforma **Huawei FusionSolar** es el centro neurálgico de miles de instalaciones fotovoltaicas domésticas en España. Sin embargo, para los usuarios principiantes, sus gráficos circulares y curvas de colores pueden resultar confusos.

## Conceptos clave en la monitorización de autoconsumo

Para no perderte en la aplicación FusionSolar, debes comprender perfectamente los cuatro flujos de energía fundamentales:

*   **Producción fotovoltaica (Curva verde):** La energía eléctrica total que están generando tus placas solares en cada momento del día gracias a la radiación solar.
*   **Consumo de carga / Demanda del hogar (Curva roja/azul):** La electricidad total que está demandando tu casa (electrodomésticos encendidos).
*   **Consumo directo (Autoconsumo):** La porción de tu consumo que es cubierta directamente por las placas solares en tiempo real. Esta energía es 100% gratuita.
*   **Importación de red:** La energía que compras a la distribuidora cuando tu casa consume más de lo que producen las placas (por ejemplo, de noche o en picos de consumo muy altos).
*   **Exportación de red (Excedentes):** La energía sobrante que tus placas generan pero tu casa no consume, la cual se inyecta a la red eléctrica (y por la que tu comercializadora debería compensarte en la factura).

## Cómo interpretar el gráfico de flujo de energía diario

En la pantalla principal verás un gráfico interactivo con varias líneas temporales. El escenario ideal para maximizar el ahorro es la **coincidencia de curvas**:
1.  **La campana de generación:** En un día soleado verás una curva verde suave en forma de campana que empieza al amanecer y termina al atardecer.
2.  **El valle de red:** Tu objetivo es que la curva de consumo del hogar se mantenga por debajo de la curva verde durante las horas centrales del día. Si la curva de consumo sobresale por encima de la campana verde, estarás comprando luz de la red eléctrica al precio del mercado.
3.  **Comportamiento de la batería (si tienes una Luna2000):** La aplicación te mostrará cuándo se carga la batería (excedentes solares no consumidos por el hogar) y cuándo se descarga (normalmente a partir del atardecer para evitar consumir de la red).

## Recomendaciones para optimizar tu ratio de autoconsumo

Si tu aplicación FusionSolar muestra que exportas muchos excedentes a la red pero sigues importando bastante energía por las noches:
*   **Desplaza consumos:** Programa el termo eléctrico, el lavavajillas y la lavadora para que funcionen de forma escalonada entre las 11:00 y las 15:00.
*   **Ajusta la carga del coche eléctrico:** Si tienes cargador compatible, configúralo en modo "Eco-Solar" para que solo cargue el vehículo utilizando exclusivamente los excedentes que de otro modo regalarías o venderías muy baratos a la red.`,
    metaTitle: "Cómo leer y entender los gráficos de Huawei FusionSolar",
    metaDescription: "Guía completa para interpretar los flujos de energía, el autoconsumo y los excedentes de tu instalación solar en la app FusionSolar de Huawei."
  },
  {
    id: "comparativa-tarifas-luz-mercado-libre-pvpc",
    title: "Mercado Libre vs. PVPC: ¿Qué tarifa de luz te hace ahorrar más hoy?",
    excerpt: "Desmitificamos la factura eléctrica española. Analizamos cuándo te conviene el Precio Voluntario para el Pequeño Consumidor (PVPC) y cómo detectar trampas en el mercado libre.",
    category: { name: "Guías de Ahorro", slug: "guias-de-ahorro" },
    date: "01 Jun 2026",
    readTime: "Lectura de 9 min",
    imageGradient: "from-rose-500 to-red-600",
    author: "Elena R. (Asesora Energética)",
    content: `El mercado eléctrico en España está dividido en dos mundos completamente distintos: el **mercado regulado (PVPC)** y el **mercado libre**. Comprender la diferencia entre ambos y saber leer tu factura es la medida de ahorro energético más potente que puedes aplicar, muy por encima de apagar luces o cambiar bombillas.

## ¿Qué es la tarifa PVPC (Mercado Regulado)?

El Precio Voluntario para el Pequeño Consumidor (PVPC) es la tarifa regulada por el Gobierno de España. Sus características son:
*   **Precio indexado al mercado:** El coste del kWh cambia cada hora de cada día basándose en la subasta del mercado mayorista (OMIE).
*   **Tres tramos horarios obligatorios:** Punta (caro), Llano (medio) y Valle (barato) para los días laborables, siendo todo el fin de semana y festivos considerados tramo Valle.
*   **Sin permanencia ni servicios extra:** Está prohibido que te cobren por seguros de mantenimiento, reparaciones u otros añadidos.
*   **Condición necesaria para el Bono Social:** Solo los clientes con PVPC pueden solicitar esta ayuda estatal para colectivos vulnerables.

## ¿Qué es el Mercado Libre?

En el mercado libre, las comercializadoras (Iberdrola, Endesa, Naturgy, Repsol y cientos de alternativas independientes) fijan los precios y las condiciones que quieren, igual que ocurre con las tarifas de telefonía móvil.
*   **Tarifas planas o estables:** Pagas el mismo precio por el kWh las 24 horas del día, independientemente del mercado mayorista.
*   **Tarifas con discriminación horaria personalizadas:** Por ejemplo, "horas felices" gratuitas a la semana o precios reducidos los fines de semana.
*   **Riesgo de letra pequeña:** Suelen incluir cláusulas de permanencia o cobros por servicios de mantenimiento de urgencia que inflan la factura mensual de forma oculta.

## ¿Cuál deberías contratar para ahorrar al máximo?

No existe una tarifa ganadora absoluta, ya que depende de tus hábitos de consumo y de tu equipamiento tecnológico:
1.  **Elige PVPC si:** Tienes flexibilidad para programar lavadoras u hornos por la noche o fines de semana, o si tienes placas solares (puedes inyectar excedentes en las horas más caras y optimizar tu balance neto).
2.  **Elige Mercado Libre si:** No puedes o no quieres preocuparte por la hora a la que enciendes tus electrodomésticos, y logras contratar una **tarifa de precio fijo competitiva** (por debajo de la media del PVPC anual). 

## Cómo detectar trampas en las ofertas del mercado libre

*   **Mira el término de energía activo:** Compara siempre el precio por kWh ofertado (por ejemplo, 0.12€/kWh) con los precios actuales del mercado regulado.
*   **Comprueba el término de potencia:** Algunas compañías bajan mucho el coste de la energía pero duplican el coste mensual por cada kW de potencia contratada.
*   **Cuidado con los descuentos temporales:** Un "20% de descuento durante 12 meses" suele aplicarse sobre tarifas base ya infladas. Haz los números siempre sobre el precio final tras impuestos.`,
    metaTitle: "Mercado libre de electricidad o regulado PVPC: Comparativa real",
    metaDescription: "Analizamos de forma objetiva cuál es la mejor tarifa de luz para tu hogar. Trucos para leer tu factura eléctrica y evitar engaños de comercializadoras."
  },
  {
    id: "emporia-vue-gen2-monitor-24-canales",
    title: "Emporia Vue Gen 2: Monitorización circuito a circuito para un control absoluto",
    excerpt: "Si quieres saber exactamente a dónde va cada céntimo de tu factura, el Emporia Vue Gen 2 mide hasta 16 circuitos individuales. Analizamos su instalación y potencial.",
    category: { name: "Monitores de Energía", slug: "monitores-de-energia" },
    date: "28 May 2026",
    readTime: "Lectura de 8 min",
    imageGradient: "from-teal-500 to-cyan-600",
    author: "Sofía G. (Ingeniera de Redes)",
    content: `La mayoría de medidores de consumo instalados en el cuadro eléctrico nos ofrecen un único dato: el consumo total de la casa. Si bien esto es útil para saber cuánto gastamos en general, no responde a la pregunta clave: *¿cuánto de ese consumo pertenece al aire acondicionado, cuánto a la nevera y cuánto al horno?* El **Emporia Vue Gen 2** soluciona esto permitiendo monitorizar hasta 16 circuitos individuales.

## ¿Cómo funciona el Emporia Vue Gen 2?

El sistema de Emporia se compone de un módulo central Wi-Fi y un conjunto de sensores de corriente (pinzas):
*   **2 Sensores principales de 200A:** Miden la entrada general de la red eléctrica al cuadro.
*   **Hasta 16 Sensores individuales de 50A:** Pinzas de menor tamaño que se abrazan al cable de salida de cada magnetotérmico individual de tu cuadro eléctrico (por ejemplo, el circuito de enchufes de cocina, alumbrado, aire acondicionado, etc.).
*   **App nativa y exportación de datos:** Su app es muy visual y ofrece actualizaciones por segundo. Además, permite descargar informes en formato CSV con el histórico de consumo.

## Ventajas y Desafíos del Emporia Vue

### Lo que más nos gusta:
*   **Adiós a las suposiciones:** Sabrás al céntimo el gasto mensual exacto de los sistemas de climatización o los electrodomésticos conflictivos.
*   **Integración local con ESPHome:** Para usuarios avanzados, el hardware del Emporia Vue se basa en un chip ESP32, lo que significa que puedes "flashearlo" de forma inalámbrica con ESPHome e integrarlo al 100% de manera local y desconectada de internet en Home Assistant.
*   **Relación coste por canal inmejorable:** El pack con sensores generales y 8 pinzas individuales ronda los 120€, un precio increíble comparado con comprar módulos individuales Shelly.

### Lo que debes tener en cuenta antes de comprar:
*   **Espacio en el cuadro eléctrico:** Instalar el módulo general y meter hasta 8 o 16 pinzas amperimétricas con sus respectivos cables de conexión requiere bastante espacio libre dentro de tu caja de distribución eléctrica. Si tu cuadro es pequeño o está muy saturado, la instalación puede ser un rompecabezas.
*   **Instalación minuciosa:** Tendrás que identificar correctamente cada fase y conectar cada sensor al canal correspondiente de la app para que los datos sean coherentes.

## Veredicto

El Emporia Vue Gen 2 es la herramienta definitiva para auditorías energéticas domésticas completas. Si tienes un cuadro eléctrico amplio y quieres un desglose sin fisuras del consumo de tu vivienda para planificar una instalación solar o cambiar tus hábitos de consumo, no hay ningún producto en el mercado que te ofrezca tanto detalle por ese precio.`,
    metaTitle: "Emporia Vue Gen 2: Análisis completo del medidor de 16 canales",
    metaDescription: "Descubre cómo instalar y utilizar el Emporia Vue Gen 2 para desglosar el consumo eléctrico de tu casa circuito a circuito. Opiniones e integración."
  }
];
