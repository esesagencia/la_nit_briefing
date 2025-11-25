// ========================================
// PREGUNTAS DEL BRIEFING LA NIT
// ========================================
//
// 📝 CÓMO AÑADIR UNA PREGUNTA:
// 
// 1. Ve al bloque donde quieres añadirla
// 2. Copia una pregunta existente similar
// 3. Cambia el 'id' (debe ser único, ej: '4.9', '5.6b', etc.)
// 4. Cambia 'label' (el texto de la pregunta)
// 5. ¡Listo!
//
// 📝 TIPOS DE PREGUNTAS DISPONIBLES:
//
// - 'text' → Campo de texto corto
// - 'textarea' → Campo de texto largo (respuestas extensas)
// - 'number' → Solo números
// - 'radio' → Una sola opción (círculos)
// - 'checkbox' → Múltiples opciones (cuadrados)
// - 'slider' → Barra deslizante (de 0-100 o el rango que pongas)
// - 'percentage_group' → Varios campos de % que deben sumar 100
// - 'section_header' → Solo un título (no es pregunta)
//
// 📝 CAMPOS IMPORTANTES:
//
// - id: Identificador único (OBLIGATORIO)
// - label: Texto de la pregunta (OBLIGATORIO)
// - type: Tipo de pregunta (OBLIGATORIO)
// - required: true/false - ¿Es obligatoria?
// - sublabel: Texto explicativo adicional (opcional)
// - placeholder: Texto de ayuda dentro del campo (opcional)
// - options: Array de opciones (para radio/checkbox)
// - min/max: Rango de valores (para slider/number)
// - unit: Unidad a mostrar (para slider, ej: '%', '/10')
//
// 📝 EJEMPLO DE CÓMO AÑADIR UNA PREGUNTA:
//
// {
//   id: '4.9',  // ← Número único
//   label: '¿Qué DJ os gustaría traer para la inauguración?',
//   type: 'text',
//   required: true
// }
//
// ========================================

export const formStructure = [
  {
    id: 'bloque1',
    title: 'BLOQUE 1: Visión y ADN del Proyecto',
    subtitle: 'Entendiendo qué os motiva y qué queréis construir',
    questions: [
      {
        id: '1.1',
        label: '¿Qué es lo que más os ilusiona de abrir La Nit?',
        type: 'textarea',
        placeholder: 'Responded libremente, sin filtros...',
        required: true
      },
      {
        id: '1.2',
        label: 'La fiesta ideal: Si pudierais organizar "vuestra fiesta perfecta" en La Nit sin pensar en restricciones, ¿cómo sería?',
        type: 'textarea',
        placeholder: 'Describid el ambiente, energía, música, público, qué la haría memorable...',
        required: true
      },
      {
        id: '1.3',
        label: '¿Qué clubs, venues o espacios os inspiran?',
        sublabel: 'Nombrarnos 3-5 y explicar brevemente qué os gusta de cada uno',
        type: 'textarea',
        placeholder: 'Ej: Berghain - La libertad y autenticidad...',
        required: true
      },
      {
        id: '1.4',
        label: 'Si tuvierais que elegir UNA palabra que capture la esencia de lo que queréis que sea La Nit, ¿cuál sería?',
        type: 'text',
        placeholder: 'Libertad, exclusividad, música, comunidad...',
        required: true
      },
      {
        id: '1.4b',
        label: '¿Por qué esa palabra?',
        type: 'textarea',
        required: true
      },
      {
        id: '1.5',
        label: 'Aspiración a 3 años: Dentro de 3 años, cuando habléis de La Nit con amigos o familia, ¿qué os gustaría poder decir que habéis conseguido?',
        type: 'textarea',
        required: true
      },
      // ✨ PREGUNTA CON PERSONALIDAD #1
      {
        id: '1.6',
        label: 'Imaginad que La Nit aparece en Resident Advisor o Mixmag dentro de un año. ¿Qué titular os gustaría leer?',
        sublabel: 'Ejemplo: "La Nit redefine la escena mediterránea" o "El nuevo templo del techno en la costa"',
        type: 'textarea',
        placeholder: 'Escribid el titular que os haría sentir orgullosos...',
        required: false
      }
    ]
  },
  {
    id: 'bloque2',
    title: 'BLOQUE 2: Arquitectura de Espacios y Concepto',
    subtitle: 'Entendiendo la relación entre las dos salas',
    questions: [
      {
        id: '2.1',
        label: '¿Cómo conectáis conceptualmente la sala techno con la sala comercial?',
        sublabel: '¿Hay un hilo conductor, una historia que las une bajo "La Nit"? ¿O son dos experiencias independientes?',
        type: 'textarea',
        required: true
      },
      {
        id: '2.2',
        label: '¿Hay una sala "principal" y otra "secundaria" en vuestra mente, o ambas tienen el mismo peso?',
        type: 'radio',
        options: [
          'Ambas igual de importantes',
          'Sala techno es la principal',
          'Sala comercial es la principal',
          'Aún no lo hemos definido'
        ],
        required: true
      },
      {
        id: '2.2b',
        label: 'Si hay jerarquía, ¿cómo se reflejará eso en comunicación, presupuesto, capacidad?',
        type: 'textarea'
      },
      {
        id: '2.3',
        label: '¿Qué representa "La Nit" para vosotros?',
        type: 'radio',
        options: [
          'El nombre del club físico (un lugar)',
          'Un concepto de experiencia nocturna que podría exportarse',
          'Una marca paraguas con posibles sub-marcas'
        ],
        required: true
      },
      {
        id: '2.3b',
        label: '¿Habéis pensado en hacer eventos de La Nit fuera del club?',
        type: 'radio',
        options: [
          'Sí, nos interesa',
          'Quizás en el futuro',
          'No, es solo el club'
        ],
        required: true
      },
      {
        id: '2.4',
        label: '¿Cómo imagináis que se moverá la gente entre las dos salas?',
        type: 'radio',
        options: [
          'Flujo libre - pueden ir y venir como quieran',
          'Cada sala tiene su entrada/ambiente separado',
          'Aún no lo hemos decidido'
        ],
        required: true
      },
      {
        id: '2.5a',
        label: 'Capacidad total del local (personas)',
        type: 'number',
        required: true
      },
      {
        id: '2.5b',
        label: 'Capacidad sala techno (personas)',
        type: 'number',
        required: true
      },
      {
        id: '2.5c',
        label: 'Capacidad sala comercial (personas)',
        type: 'number',
        required: true
      },
      {
        id: '2.5d',
        label: '¿Qué ocupación consideraríais "una buena noche"? - Sala techno',
        type: 'slider',
        min: 0,
        max: 100,
        unit: '%',
        required: true
      },
      {
        id: '2.5e',
        label: '¿Qué ocupación consideraríais "una buena noche"? - Sala comercial',
        type: 'slider',
        min: 0,
        max: 100,
        unit: '%',
        required: true
      },
      // ✨ PREGUNTA CON PERSONALIDAD #2
      {
        id: '2.6',
        label: 'Si tuvierais que comparar las dos salas con dos momentos del día/noche, ¿cuáles serían?',
        sublabel: 'Ejemplo: "Sala techno es las 4am, sala comercial es la medianoche"',
        type: 'textarea',
        placeholder: 'Describid la energía de cada sala con esta metáfora...',
        required: false
      }
    ]
  },
  {
    id: 'bloque3',
    title: 'BLOQUE 3: Públicos y Experiencias',
    subtitle: 'Entendiendo a quién queréis servir',
    questions: [
      {
        id: '3.1',
        label: 'Público de la sala techno',
        type: 'section_header'
      },
      {
        id: '3.1a',
        label: 'Rango de edad',
        type: 'text',
        placeholder: 'Ej: 25-35',
        required: true
      },
      {
        id: '3.1b',
        label: '¿Qué buscan cuando salen?',
        type: 'textarea',
        required: true
      },
      {
        id: '3.1c',
        label: '¿Cómo se comportan? (¿bailan, socializan, fotografían, mezcla?)',
        type: 'textarea',
        required: true
      },
      {
        id: '3.1d',
        label: '¿Cuánto gastan de media? (€)',
        type: 'text',
        required: true
      },
      {
        id: '3.2',
        label: 'Público de la sala comercial',
        type: 'section_header'
      },
      {
        id: '3.2a',
        label: 'Rango de edad',
        type: 'text',
        placeholder: 'Ej: 25-35',
        required: true
      },
      {
        id: '3.2b',
        label: '¿Qué buscan cuando salen?',
        type: 'textarea',
        required: true
      },
      {
        id: '3.2c',
        label: '¿Cómo se comportan?',
        type: 'textarea',
        required: true
      },
      {
        id: '3.2d',
        label: '¿Cuánto gastan de media? (€)',
        type: 'text',
        required: true
      },
      // ✨ PREGUNTA CON PERSONALIDAD #3
      {
        id: '3.2e',
        label: '¿Cómo describiríais a vuestro cliente ideal en la puerta?',
        sublabel: 'No nos referimos a dress code, sino a actitud, energía, por qué ha venido',
        type: 'textarea',
        placeholder: 'Ej: "Viene con amigos, sabe quién pincha, lleva siguiendo la escena años..."',
        required: false
      },
      {
        id: '3.3',
        label: 'Si tuvierais que priorizar, ¿qué tipo de cliente es más importante para el éxito del negocio?',
        type: 'radio',
        options: [
          'Gente que viene por la música específica y los artistas',
          'Gente que viene por la experiencia general y el ambiente',
          'Ambos son igual de importantes',
          'Depende de la sala'
        ],
        required: true
      },
      {
        id: '3.4',
        label: '¿Qué función tienen las zonas VIP en vuestro modelo?',
        type: 'checkbox',
        options: [
          'Son clientes premium que pagan por mejor servicio/espacio/comodidad',
          'Ayudan a crear ambiente de exclusividad y aspiración',
          'Son una línea de ingresos importante para el negocio'
        ],
        required: true
      },
      {
        id: '3.4b',
        label: '¿Ambas salas tendrán VIP?',
        type: 'radio',
        options: [
          'Sí, ambas',
          'Solo sala comercial',
          'Aún por definir'
        ],
        required: true
      },
      {
        id: '3.5',
        label: '¿Cómo queréis posicionar La Nit en términos de precio?',
        type: 'radio',
        options: [
          'Accesible - precios moderados para que venga más gente',
          'Premium - precios altos que reflejen exclusividad/calidad',
          'Medio-alto - ni lo más barato ni lo más caro',
          'Diferente según sala',
          'Aún por definir'
        ],
        required: true
      },
      {
        id: '3.5a',
        label: 'Precio de entrada Early bird (€)',
        type: 'number',
        required: true
      },
      {
        id: '3.5b',
        label: 'Precio de entrada Regular (€)',
        type: 'number',
        required: true
      },
      {
        id: '3.5c',
        label: 'Precio de entrada en Puerta (€)',
        type: 'number',
        required: true
      }
    ]
  },
  {
    id: 'bloque4',
    title: 'BLOQUE 4: Programación y Oferta Musical',
    subtitle: 'El corazón de cualquier club',
    questions: [
      {
        id: '4.1a',
        label: '¿Cuánta importancia tiene la programación de artistas/DJs? - Sala techno',
        sublabel: '1 = Lo importante es el espacio, música secundaria | 10 = Absolutamente fundamental',
        type: 'slider',
        min: 1,
        max: 10,
        required: true
      },
      {
        id: '4.1b',
        label: '¿Cuánta importancia tiene la programación de artistas/DJs? - Sala comercial',
        type: 'slider',
        min: 1,
        max: 10,
        required: true
      },
      // ✨ PREGUNTA CON PERSONALIDAD #4 - ¡LA DE MACEO PLEX!
      {
        id: '4.1c',
        label: '¿Tocaría Maceo Plex en La Nit?',
        sublabel: 'No es si podéis ficharlo, sino si encaja con vuestra visión musical',
        type: 'radio',
        options: [
          'Sí, es exactamente el tipo de artista que queremos',
          'Sí, pero para eventos especiales',
          'No realmente, buscamos otro estilo',
          'No estamos seguros'
        ],
        required: false
      },
      // ✨ PREGUNTA CON PERSONALIDAD #5
      {
        id: '4.1d',
        label: 'Nombrad 3 artistas/DJs que definan vuestro sonido ideal para la sala techno',
        type: 'textarea',
        placeholder: 'Ej: Amelie Lens, I Hate Models, Kobosil...',
        required: false
      },
      {
        id: '4.2',
        label: '¿Qué estrategia de programación os atrae más?',
        type: 'checkbox',
        options: [
          'Traer grandes nombres internacionales regularmente',
          'Apostar por artistas emergentes y promesas',
          'Tener residentes fijos que sean "la familia del club"',
          'Trabajar con colectivos y promotores locales',
          'Crear eventos/marcas propias ("La Nit Sessions", etc.)',
          'Mix de todo lo anterior'
        ],
        required: true
      },
      // ✨ PREGUNTA CON PERSONALIDAD #6
      {
        id: '4.2b',
        label: '¿Os veis más como Fabric Londres (programación curatorial arriesgada) o como Hï Ibiza (grandes nombres mainstream)?',
        sublabel: 'O quizás un híbrido de ambos',
        type: 'textarea',
        placeholder: 'Explicad dónde os veis en ese espectro...',
        required: false
      },
      {
        id: '4.3',
        label: 'Géneros en sala techno: Indicad % aproximado para cada género',
        sublabel: 'Aproximado, no hace falta que sume exacto 100%',
        type: 'percentage_group',
        fields: [
          { name: 'Techno', id: '4.3_techno' },
          { name: 'House / Deep House', id: '4.3_house' },
          { name: 'Tech House', id: '4.3_tech_house' },
          { name: 'Trance / Progressive', id: '4.3_trance' },
          { name: 'Experimental / Electronica', id: '4.3_experimental' },
          { name: 'Otros', id: '4.3_otros' }
        ],
        required: true
      },
      {
        id: '4.3b',
        label: '¿Hay géneros o estilos que definitivamente NO sonarían en la sala techno?',
        type: 'textarea'
      },
      {
        id: '4.4',
        label: 'Géneros en sala comercial: Indicad % aproximado para cada género',
        sublabel: 'Aproximado, no hace falta que sume exacto 100%',
        type: 'percentage_group',
        fields: [
          { name: 'House comercial / Pop House', id: '4.4_house' },
          { name: 'Reggaeton / Urbano', id: '4.4_reggaeton' },
          { name: 'Top 40 / Hits', id: '4.4_top40' },
          { name: 'Funk / Disco / Nu-Disco', id: '4.4_funk' },
          { name: 'R&B', id: '4.4_rnb' },
          { name: 'Otros', id: '4.4_otros' }
        ],
        required: true
      },
      {
        id: '4.5',
        label: '¿Os planteáis incluir música en directo además de DJs?',
        type: 'radio',
        options: [
          'Sí, regularmente',
          'Sí, para eventos especiales',
          'No lo hemos considerado',
          'No nos interesa'
        ],
        required: true
      },
      {
        id: '4.5b',
        label: 'Si sí, ¿qué tipo de propuestas en directo os interesan?',
        type: 'checkbox',
        options: [
          'Bandas de música electrónica en directo (live sets)',
          'Bandas de otros géneros (indie, pop, rock, funk...)',
          'Híbridos (DJ + instrumentistas en directo)',
          'Performances artísticas / showcases'
        ]
      },
      {
        id: '4.6',
        label: '¿Vais a trabajar con DJs residentes?',
        type: 'radio',
        options: [
          'Sí, son parte importante de nuestra identidad',
          'Sí, pero de forma secundaria',
          'No, preferimos line-ups siempre nuevos',
          'Aún por decidir'
        ],
        required: true
      },
      // ✨ PREGUNTA CON PERSONALIDAD #7
      {
        id: '4.6b',
        label: 'Si tuvierais residentes, ¿qué importancia tendría que sean de la zona vs traer talento de fuera?',
        type: 'radio',
        options: [
          'Preferimos apoyar talento local/valenciano',
          'Buscamos lo mejor, venga de donde venga',
          'Mix equilibrado de ambos',
          'Aún no lo hemos pensado'
        ],
        required: false
      },
      {
        id: '4.7a',
        label: 'Ratio artistas locales/nacionales',
        type: 'slider',
        min: 0,
        max: 100,
        unit: '%',
        required: true
      },
      {
        id: '4.7b',
        label: 'Ratio artistas internacionales',
        type: 'slider',
        min: 0,
        max: 100,
        unit: '%',
        required: true
      },
      {
        id: '4.8',
        label: '¿Os interesan formatos de sesión más largos? (ej: un solo DJ 4-6 horas)',
        type: 'radio',
        options: [
          'Sí, creemos que nuestro público lo disfrutaría',
          'Quizás para artistas/eventos especiales',
          'Preferimos rotación más frecuente de DJs',
          'No lo hemos pensado'
        ],
        required: true
      },
      // ✨ PREGUNTA CON PERSONALIDAD #8
      {
        id: '4.9',
        label: 'En la sala techno, ¿preferís sets de 6 horas con journey musical o rotación rápida de 2 horas manteniendo la energía alta?',
        type: 'radio',
        options: [
          'Sets largos tipo Berghain - journey y narrativa',
          'Rotación rápida - mantener energía constante',
          'Depende del artista y el evento',
          'No lo hemos definido'
        ],
        required: false
      }
    ]
  },
  {
    id: 'bloque5',
    title: 'BLOQUE 5: Experiencia, Producción y Sonido',
    subtitle: 'Más allá de la música',
    questions: [
      {
        id: '5.1a',
        label: '¿Qué importancia tiene tener un sistema de sonido de alta calidad?',
        sublabel: '1 = Con que suene fuerte y claro, suficiente | 10 = Crítico, invertiremos lo necesario',
        type: 'slider',
        min: 1,
        max: 10,
        required: true
      },
      {
        id: '5.1b',
        label: '¿Qué sistema de sonido tenéis o planéis instalar?',
        type: 'radio',
        options: [
          'Funktion-One',
          'd&b audiotechnik',
          'L-Acoustics',
          'Pioneer Pro Audio',
          'JBL Professional',
          'Otro',
          'Aún por definir'
        ],
        required: true
      },
      // ✨ PREGUNTA CON PERSONALIDAD #9
      {
        id: '5.1c',
        label: '¿El sonido es un elemento de diferenciación para vosotros o simplemente tiene que "funcionar bien"?',
        sublabel: 'Algunos clubs hacen del sistema de sonido parte de su identidad (ej: "el mejor Funktion-One de España")',
        type: 'textarea',
        placeholder: 'Explicad vuestra visión sobre el sonido...',
        required: false
      },
      {
        id: '5.2',
        label: '¿Qué nivel de producción visual planéis?',
        type: 'radio',
        options: [
          'Básico - iluminación estándar de club',
          'Medio - iluminación programada, algunos efectos',
          'Alto - pantallas LED, mapping, efectos especiales',
          'Muy alto - cada evento es una producción audiovisual completa'
        ],
        required: true
      },
      {
        id: '5.2b',
        label: '¿Tendréis:',
        type: 'checkbox',
        options: [
          'Pantallas LED',
          'Proyecciones / Mapping',
          'Efectos especiales (CO2, humo, confetti...)',
          'VJ / Visuales en directo',
          'Iluminación programada específica',
          'Aún por definir'
        ],
        required: true
      },
      {
        id: '5.3',
        label: 'La temática de la sala techno, ¿cómo la concebís?',
        type: 'radio',
        options: [
          'Es principalmente estética visual (decoración)',
          'Es un concepto más profundo que queremos desarrollar',
          'Es un punto de partida que iremos refinando'
        ],
        required: true
      },
      {
        id: '5.3b',
        label: 'Si es más que decoración, ¿cómo pensáis desarrollarlo?',
        type: 'textarea'
      },
      {
        id: '5.4',
        label: '¿Qué emoción queréis que sienta la gente al entrar en la sala comercial?',
        type: 'radio',
        options: [
          'Lujo y exclusividad',
          'Fiesta y espectáculo',
          'Elegancia con energía',
          'Viaje en el tiempo / nostalgia',
          'Otra'
        ],
        required: true
      },
      {
        id: '5.5',
        label: '¿Qué nivel de servicio planéis ofrecer?',
        type: 'radio',
        options: [
          'Estándar de club - barras rápidas, seguridad básica',
          'Elevado - atención al detalle, personal formado',
          'Premium - servicio de alto nivel, personal especializado',
          'Diferente según zona/sala'
        ],
        required: true
      },
      // ✨ PREGUNTA CON PERSONALIDAD #10
      {
        id: '5.6',
        label: 'La política de móviles/fotos: ¿Libertad total o preferís ambiente tipo Berghain (sin fotos)?',
        type: 'radio',
        options: [
          'Libertad total - que fotografíen lo que quieran',
          'Zona de fotos limitada (no en pista)',
          'Política restrictiva tipo Berghain',
          'Aún no lo hemos decidido'
        ],
        required: false
      }
    ]
  },
  {
    id: 'bloque6',
    title: 'BLOQUE 6: Comunicación y Marca',
    subtitle: 'Cómo comunicáis define cómo os perciben',
    questions: [
      {
        id: '6.1',
        label: '¿Qué estilo de comunicación os representa mejor?',
        sublabel: 'Describid vuestro estilo o elegid entre los ejemplos',
        type: 'textarea',
        placeholder: 'Ejemplo A - Hype/Energético, Ejemplo B - Curated/Editorial, Ejemplo C - Minimal/Directo, o describid el vuestro...',
        required: true
      },
      {
        id: '6.2',
        label: 'Contenido en redes sociales: Repartid 100 puntos',
        sublabel: 'Aproximado, no hace falta que sume exacto 100%',
        type: 'percentage_group',
        fields: [
          { name: 'Contenido de las noches (público, ambiente)', id: '6.2_noches' },
          { name: 'Artistas y line-ups', id: '6.2_artistas' },
          { name: 'Producción y espacio (fotos/vídeos del lugar)', id: '6.2_produccion' },
          { name: 'Comunidad y cultura', id: '6.2_comunidad' },
          { name: 'Detrás de cámaras / Making of', id: '6.2_making' },
          { name: 'Otro', id: '6.2_otro' }
        ],
        required: true
      },
      {
        id: '6.3',
        label: '¿Cómo os gustaría que alguien describiera La Nit a un amigo?',
        sublabel: 'Escribid una frase o dos',
        type: 'textarea',
        required: true
      },
      {
        id: '6.4',
        label: '¿Estaríais abiertos a colaboraciones con marcas?',
        type: 'radio',
        options: [
          'Sí, abiertos a cualquier colaboración que tenga sentido',
          'Sí, pero solo con marcas que encajen con nuestra identidad',
          'Selectivos - evaluaríamos caso por caso',
          'Preferimos mantener independencia'
        ],
        required: true
      },
      // ✨ PREGUNTA CON PERSONALIDAD #11
      {
        id: '6.4b',
        label: 'Si apareciera Red Bull Music o Boiler Room interesados en colaborar, ¿cuál sería vuestra reacción?',
        type: 'radio',
        options: [
          '¡Por supuesto! Gran visibilidad',
          'Depende de las condiciones y la libertad que nos den',
          'Preferimos mantener independencia',
          'No lo hemos pensado'
        ],
        required: false
      },
      {
        id: '6.5',
        label: '¿Os interesa crear un programa para clientes habituales?',
        sublabel: 'Ejemplos: membresías, puntos, descuentos, acceso prioritario...',
        type: 'radio',
        options: [
          'Sí, nos interesa construir comunidad leal',
          'Quizás en el futuro',
          'No lo vemos necesario',
          'No lo hemos considerado'
        ],
        required: true
      }
    ]
  },
  {
    id: 'bloque7',
    title: 'BLOQUE 7: Modelo de Negocio y Operación',
    subtitle: 'Estructura general del negocio',
    questions: [
      {
        id: '7.1',
        label: 'Fuentes de ingresos: Repartid 100 puntos',
        sublabel: 'Aproximadamente - no es necesario que sume exacto',
        type: 'percentage_group',
        fields: [
          { name: 'Entradas', id: '7.1_entradas' },
          { name: 'Barra (bebidas)', id: '7.1_barra' },
          { name: 'Reservas VIP / Mesas', id: '7.1_vip' },
          { name: 'Eventos privados / Corporativos', id: '7.1_eventos' },
          { name: 'Merchandising', id: '7.1_merch' },
          { name: 'Otros', id: '7.1_otros' }
        ],
        required: true
      },
      {
        id: '7.2',
        label: '¿Qué días planéis abrir?',
        type: 'checkbox',
        options: [
          'Solo viernes y sábado',
          'Jueves, viernes y sábado',
          'También entre semana para eventos especiales',
          'Abiertos varios días con propuestas diferentes'
        ],
        required: true
      },
      {
        id: '7.2b',
        label: 'Si abrís entre semana, ¿qué tipo de eventos imagináis?',
        type: 'checkbox',
        options: [
          'Eventos privados / Corporativos',
          'Noches temáticas',
          'Música en directo / Conciertos',
          'Sesiones de colectivos locales'
        ]
      },
      {
        id: '7.3',
        label: '¿En cuánto tiempo esperáis que La Nit sea rentable?',
        type: 'radio',
        options: [
          '6-12 meses',
          '12-18 meses',
          '18-24 meses',
          '2-3 años',
          'No es la prioridad inicial'
        ],
        required: true
      },
      {
        id: '7.4',
        label: '¿Planéis usar precios variables?',
        sublabel: 'Ejemplos: early bird más barato, precio sube cerca de fecha...',
        type: 'radio',
        options: [
          'Sí, precios dinámicos',
          'Sí, pero solo early bird vs regular',
          'Precio fijo siempre',
          'Aún por decidir'
        ],
        required: true
      },
      {
        id: '7.5a',
        label: '¿Quién se encargará de la programación musical?',
        type: 'radio',
        options: [
          'Familia',
          'Director artístico',
          'Equipo mixto',
          'Por definir'
        ],
        required: true
      },
      {
        id: '7.5b',
        label: '¿Quién se encargará de comunicación/marketing?',
        type: 'radio',
        options: [
          'Familia',
          'Profesional contratado',
          'Agencia',
          'Por definir'
        ],
        required: true
      },
      {
        id: '7.5c',
        label: '¿Quién se encargará de operaciones/gerencia?',
        type: 'radio',
        options: [
          'Familia',
          'Gerente profesional',
          'Equipo mixto',
          'Por definir'
        ],
        required: true
      },
      {
        id: '7.6',
        label: 'Si después de algunos meses una sala funciona mucho mejor que la otra, ¿cómo lo manejaríais?',
        type: 'radio',
        options: [
          'Mantendríamos ambas como están - es parte de la identidad',
          'Ajustaríamos la estrategia de la sala que va más floja',
          'Daríamos más recursos a la que funciona mejor',
          'Lo evaluaríamos en su momento',
          'No lo hemos pensado'
        ],
        required: true
      }
    ]
  },
  {
    id: 'bloque8',
    title: 'BLOQUE 8: Decisiones y Prioridades',
    subtitle: 'Qué priorizáis en las tensiones del negocio',
    questions: [
      {
        id: '8.1a',
        label: '¿Qué es más importante? - Opción A',
        type: 'radio',
        options: [
          'Llenar el local cada noche',
          'Tener el público "adecuado" aunque sea menos gente',
          'Ambos igual'
        ],
        required: true
      },
      {
        id: '8.1b',
        label: '¿Qué es más importante? - Opción B',
        type: 'radio',
        options: [
          'Facturación y rentabilidad',
          'Construir marca y reputación a largo plazo',
          'Ambos igual'
        ],
        required: true
      },
      {
        id: '8.1c',
        label: '¿Qué es más importante? - Opción C',
        type: 'radio',
        options: [
          'Ser conocidos y populares',
          'Ser respetados por la escena',
          'Ambos igual'
        ],
        required: true
      },
      {
        id: '8.1d',
        label: '¿Qué es más importante? - Opción D',
        type: 'radio',
        options: [
          'Ofrecer variedad para agradar a más gente',
          'Tener identidad clara aunque sea más nicho',
          'Ambos igual'
        ],
        required: true
      },
      // ✨ PREGUNTA CON PERSONALIDAD #12
      {
        id: '8.1e',
        label: '¿Qué preferís: ser "el club que todos conocen" o "el club secreto que solo los que saben, saben"?',
        type: 'radio',
        options: [
          'Popular y masivo',
          'Underground y exclusivo',
          'Híbrido de ambos',
          'No lo tenemos claro'
        ],
        required: false
      },
      {
        id: '8.2',
        label: '¿Hay aspectos del proyecto que NO estaríais dispuestos a cambiar, aunque no funcionaran comercialmente?',
        sublabel: 'Ejemplos: tipo de música, calidad de sonido, trato al cliente...',
        type: 'textarea',
        placeholder: '1. ...\n2. ...\n3. ...',
        required: true
      },
      {
        id: '8.3',
        label: '¿Qué aspectos SÍ estaríais dispuestos a adaptar según cómo evolucione el negocio?',
        type: 'textarea',
        placeholder: '1. ...\n2. ...\n3. ...',
        required: true
      },
      {
        id: '8.4',
        label: 'Si dentro de 3 años os preguntaran "¿qué ha sido lo mejor de La Nit?", ¿qué os gustaría responder?',
        type: 'textarea',
        required: true
      },
      {
        id: '8.5',
        label: '¿Qué es lo que más os preocupa o genera dudas sobre el proyecto?',
        type: 'textarea',
        required: true
      }
    ]
  },
  {
    id: 'bloque9',
    title: 'BLOQUE 9: Competencia y Posicionamiento',
    subtitle: 'Cómo os posicionáis en la escena',
    questions: [
      {
        id: '9.1',
        label: '¿Qué clubs o venues de la zona conocéis/seguís?',
        type: 'textarea',
        placeholder: 'Barraca, Spook, Oven Club, Fayer...',
        required: true
      },
      {
        id: '9.2',
        label: '¿En qué creéis que La Nit será diferente a lo que ya existe en la zona?',
        type: 'textarea',
        required: true
      },
      {
        id: '9.3',
        label: '¿Hay algún club o modelo de club con el que NO queréis ser comparados?',
        type: 'textarea'
      },
      {
        id: '9.3b',
        label: '¿Por qué?',
        type: 'textarea'
      },
      {
        id: '9.4',
        label: '¿Creéis que vuestro público vendrá de "convertir" clientes de otros clubs, o hay un público nuevo?',
        type: 'radio',
        options: [
          'Queremos atraer gente que ya va a otros clubs de la zona',
          'Queremos atraer público nuevo que no tiene opciones ahora',
          'Una mezcla de ambos'
        ],
        required: true
      },
      // ✨ PREGUNTA CON PERSONALIDAD #13
      {
        id: '9.5',
        label: 'Si La Nit fuera un artista de música electrónica, ¿quién sería y por qué?',
        sublabel: 'Esta pregunta nos ayuda a entender vuestra identidad sonora de forma intuitiva',
        type: 'textarea',
        placeholder: 'Ej: "Nina Kraviz - por la mezcla de techno oscuro con momentos de locura y diversión"',
        required: false
      }
    ]
  },
  {
    id: 'final',
    title: 'Preguntas Finales',
    subtitle: 'Últimas reflexiones',
    questions: [
      {
        id: 'final1',
        label: '¿Hay algo importante sobre el proyecto que no hayamos preguntado y queráis compartir?',
        type: 'textarea'
      },
      {
        id: 'final2',
        label: '¿Qué esperáis de nosotros como agencia?',
        type: 'textarea',
        required: true
      },
      {
        id: 'final3',
        label: '¿Tenéis alguna duda o preocupación sobre el proceso de branding/comunicación?',
        type: 'textarea'
      }
    ]
  }
];
