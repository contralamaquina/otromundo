// Perfiles zodiacales relacionados a plantas
const perfilesZodiaco = {
  Aries:    { rasgos: ['impulso', 'entusiasmo', 'iniciativa', 'valentía'],     plantaClave: 'graptosedum_california_sunset' },
  Tauro:    { rasgos: ['paciencia', 'constancia', 'sensualidad', 'practicidad'], plantaClave: 'madreperla' },
  Géminis:  { rasgos: ['curiosidad', 'adaptabilidad', 'comunicación', 'juego'], plantaClave: 'cactus_coral' },
  Cáncer:   { rasgos: ['protección', 'sensibilidad', 'hogar', 'intuición'],      plantaClave: 'huernia' },
  Leo:      { rasgos: ['autoafirmación', 'alegría', 'liderazgo', 'creatividad'], plantaClave: 'el_cactus_cacahuete' },
  Virgo:    { rasgos: ['análisis', 'detalle', 'servicio', 'modestia'],           plantaClave: 'echeveria_elegans' },
  Libra:    { rasgos: ['búsqueda de armonía', 'belleza', 'diplomacia'],          plantaClave: 'callisia_navicularis' },
  Escorpio: { rasgos: ['intensidad', 'transformación', 'pasión', 'misterio'],    plantaClave: 'opuntia_monacantha_fma_variegada_monstruosa' },
  Sagitario:{ rasgos: ['optimismo', 'exploración', 'alegría', 'expansión'],      plantaClave: 'mammillaria_prolifera' },
  Capricornio:{ rasgos: ['perseverancia', 'disciplina', 'ambición', 'reserva'],  plantaClave: 'mammillaria_vetula' },
  Acuario:  { rasgos: ['originalidad', 'independencia', 'visión', 'progreso'],   plantaClave: 'crassula_expansa_subsp_fragilis' },
  Piscis:   { rasgos: ['empatía', 'sutileza', 'espiritualidad', 'soñar'],        plantaClave: 'madreperla' }
};

// Array de plantas
const plantas = [
  { key:"el_cactus_cacahuete", nombre: "El Cactus Cacahuete", archivo: "cactus-cacahuete", energia: "alegría, renovación, vitalidad", short: "Cactus amigable, tallos finos y flores naranjas intensas.", descripcion: "Cactus pequeño de tallos verdes cilíndricos y flores naranja brillante. Se asocia con la alegría sencilla, la renovación y la protección sin agresión." },
  { key:"graptosedum_california_sunset", nombre: "Graptosedum 'California Sunset'", archivo: "graptosedum", energia: "transformación, flexibilidad, belleza interior y exterior", short: "Rosetas que cambian de verde a naranja y rosa con el sol.", descripcion: "Suculenta de rosetas con hojas que pasan del verde al naranja y rosa según la luz. Invita a aceptar el cambio y la belleza de los ciclos." },
  { key:"huernia", nombre: "Huernia", archivo: "huerniaojodedragon", energia: "protección, intuición, percepción", short: "Flores exóticas y forma compacta; ideal para colección.", descripcion: "Planta compacta con flores rojizas y pardas, de formas inusuales. Simboliza la protección, la intuición y la percepción fina de lo invisible." },
  { key:"callisia_navicularis", nombre: "Callisia Navicularis", archivo: "callisianavicularis", energia: "resiliencia, protección, equilibrio", short: "Hojas gruesas, verdes y púrpuras, de crecimiento rastrero.", descripcion: "Rastrera, con hojas carnosas verdes y púrpuras. Representa la resiliencia y el equilibrio entre luz y sombra." },
  { key:"cactus_coral", nombre: "\"Cactus Coral\" o \"Cactus Arroz\"", archivo: "cactuscoral-2", energia: "adaptabilidad, conexión, ligereza", short: "Tallos en forma de coral, colgante y muy resistente.", descripcion: "Cactus colgante, tallos ramificados verdes y puntas rojizas. Su energía es la adaptabilidad y la comunicación entre generaciones." },
  { key:"madreperla", nombre: "Madreperla", archivo: "madreperla-2", energia: "belleza interior, protección, suavidad", short: "Hojas gris-verde con tonos rosados, ideal para macetas colgantes.", descripcion: "Roseta con hojas grises, verdes y toques rosados. Es talismán de belleza interior y protección suave." },
  { key:"mammillaria_vetula", nombre: "Mammillaria vetula", archivo: "mammillariavetula", energia: "protección, suavidad, crecimiento interior", short: "Cactus pequeño, peludo y fácil de cuidar.", descripcion: "Cactus pequeño, cubierto de pelitos blancos y flores blanquecinas. Aporta protección y crecimiento desde la discreción." },
  { key:"mammillaria_prolifera", nombre: "Mammillaria prolifera", archivo: "mammillariaprolifera", energia: "abundancia, multiplicidad, comunidad", short: "Forma grupos de bolitas; florece y crece en racimos.", descripcion: "Cactus de bolitas, florece en amarillo pálido. Simboliza la multiplicidad y la alegría compartida." },
  { key:"echeveria_elegans", nombre: "Echeveria elegans", archivo: "echeveria-elegans-2", energia: "armonía, belleza, perfección", short: "Roseta simétrica azulada, resistente y ornamental.", descripcion: "Roseta simétrica, azulada y gris. Emblema de armonía y perfección natural." },
  { key:"crassula_expansa_subsp_fragilis", nombre: "Crassula expansa subsp. fragilis", archivo: "crassulafragilis", energia: "delicadeza, adaptación, flexibilidad", short: "Tallos finos y flexibles, hojas pequeñas y delicadas.", descripcion: "Suculenta de tallos finos, hojas verdes pequeñas. Símbolo de flexibilidad y delicadeza como fuerza." },
  { key:"opuntia_monacantha_fma_variegada_monstruosa", nombre: "Opuntia monacantha fma. variegada monstruosa", archivo: "monstruosa", energia: "originalidad, fortaleza, sanación", short: "Opuntia de formas únicas, variegada y llamativa.", descripcion: "Opuntia de formas únicas, manchas amarillas y verdes. Talismán de originalidad y sanación." }
];

// Descripciones largas para cada planta
const descripcionesLargas = {
  "el_cactus_cacahuete": `Esta suculenta encarna la alegría sencilla y la capacidad de florecer en los momentos menos esperados. Sus pequeñas flores naranjas y su forma amigable nos recuerdan que la renovación es posible incluso en los escenarios más secos. Protege con su presencia, pero sin ser agresiva: es el tipo de guardiana que atrae energía fresca y optimismo cada día. Si alguna vez sentís el ánimo bajo, mirála para recordar que la resiliencia también puede ser dulce y luminosa.<br><br>
  <b>Simbolismo:</b> Alegría, vitalidad, renovación, protección amable.<br>
  <b>Tip de uso:</b> Cerca de una ventana, atrae oportunidades y energiza la rutina.`,
  "graptosedum_california_sunset": `El graptosedum es un símbolo vivo de los cambios de ciclo, como un atardecer que muta de naranja a rosa y luego se apaga con suavidad. Su belleza está en no temerle a la transformación: invita a dejar atrás lo viejo, abrazar lo nuevo y entender que los colores de la vida cambian según la luz con la que los mires. Tenerla cerca ayuda a transitar mudanzas, cierres y nuevos comienzos con gracia y luz.<br><br>
  <b>Simbolismo:</b> Transformación, flexibilidad, aceptación del cambio.<br>
  <b>Tip de uso:</b> Ideal para rituales de cierre de ciclos y nuevos comienzos, especialmente al atardecer.`,
  "huernia": `La Huernia es la suculenta de los portales y las noches misteriosas. Sus flores exóticas parecen mirarte, como si custodiaran secretos antiguos. Si sentís que te rodean energías densas, ella es aliada: protege, limpia y despierta intuiciones dormidas. Es ideal para quienes buscan percibir más allá de lo visible y animarse a transitar sus propios laberintos internos.<br><br>
  <b>Simbolismo:</b> Protección, intuición, percepción sutil.<br>
  <b>Tip de uso:</b> Su presencia ahuyenta envidias y fortalece los sueños lúcidos.`,
  "callisia_navicularis": `La callisia es la mensajera de la resiliencia y el abrazo entre lo claro y lo oscuro. Sus hojas púrpuras y verdes representan la danza entre la luz y la sombra, y su crecimiento rastrero enseña que avanzar a veces es adaptarse y tomar caminos alternativos. Es una gran compañera para quienes están en procesos de cambio o necesitan anclar el equilibrio en su vida cotidiana.<br><br>
  <b>Simbolismo:</b> Resiliencia, adaptación, equilibrio.<br>
  <b>Tip de uso:</b> Ayuda a mantener la calma en cambios de estación o mudanzas.`,
  "cactus_coral": `Esta suculenta trae la energía del agua y los corales antiguos, recordando que la vida es conexión y adaptabilidad. Sus tallos colgantes unen generaciones, historias y personas, y su vibración ayuda a fluir, comunicarse y soltar cargas innecesarias. Cuando la vida se pone rígida, mirá sus formas para recordar la sabiduría de cambiar y moverse con ligereza.<br><br>
  <b>Simbolismo:</b> Adaptabilidad, comunicación, ligereza.<br>
  <b>Tip de uso:</b> Favorece la comunicación familiar y el fluir de ideas nuevas.`,
  "madreperla": `La madreperla te invita a mirar hacia adentro: su belleza suave y sus tonos perlados son como un espejo que revela tesoros internos. Es una planta que suaviza el ambiente, brinda protección dulce y potencia la autocompasión. Si estás en un camino de autoaceptación o necesitas sentirte más contenida, su presencia será bálsamo y amuleto.<br><br>
  <b>Simbolismo:</b> Belleza interior, protección suave, autocompasión.<br>
  <b>Tip de uso:</b> Potencia la autocompasión y es excelente para meditaciones al despertar.`,
  "mammillaria_vetula": `Esta pequeña cactus, cubierta de suaves pelitos, enseña el valor del crecimiento silencioso y la protección que no necesita mostrar espinas. Es discreta pero poderosa: ideal para quienes desean avanzar sin llamar la atención, cultivando proyectos y sueños a su propio ritmo. Su energía favorece la intimidad, la reflexión y el florecimiento interior.<br><br>
  <b>Simbolismo:</b> Protección discreta, crecimiento interior, reflexión.<br>
  <b>Tip de uso:</b> Protege los secretos y promueve el crecimiento de proyectos personales.`,
  "mammillaria_prolifera": `La mammillaria prolifera es símbolo de abundancia y comunidad. Sus bolitas se multiplican y florecen en racimos, trayendo alegría compartida. Tenerla cerca es una invitación a abrirte a la prosperidad y a celebrar los pequeños logros junto a quienes querés. Es la suculenta de los lazos, la generosidad y la risa multiplicada.<br><br>
  <b>Simbolismo:</b> Abundancia, prosperidad, alegría compartida.<br>
  <b>Tip de uso:</b> Multiplica la prosperidad material y espiritual cuando se regala.`,
  "echeveria_elegans": `Pocas suculentas transmiten tanta armonía como la echeveria elegans. Sus hojas perfectamente dispuestas en roseta son un mantra visual para la paz y el equilibrio. Es ideal para espacios donde busques inspiración, estudio o trabajo creativo, y su presencia ayuda a ordenar pensamientos y emociones como si cada hoja fuera un pétalo de calma.<br><br>
  <b>Simbolismo:</b> Armonía, orden, inspiración.<br>
  <b>Tip de uso:</b> Excelente para espacios de estudio o trabajo, equilibra la energía mental.`,
  "crassula_expansa_subsp_fragilis": `La crassula fragilis es la maestra de la flexibilidad. Sus tallos finos y hojas delicadas demuestran que la fortaleza no siempre es rígida: la adaptabilidad también es poder. Si estás en un momento de creatividad o necesitas encontrar soluciones diferentes, su energía abre caminos, sugiere alternativas y protege de las rigideces del pensamiento.<br><br>
  <b>Simbolismo:</b> Flexibilidad, creatividad, adaptabilidad.<br>
  <b>Tip de uso:</b> Favorece la inspiración artística y la resolución pacífica de conflictos.`,
  "opuntia_monacantha_fma_variegada_monstruosa": `La opuntia monstruosa celebra la rareza, la diferencia y la capacidad de sanar heridas profundas. Sus formas únicas y sus manchas coloridas son bandera de orgullo para quienes se sienten fuera de lo común. Es una planta sanadora, que ayuda a integrar las cicatrices y a mostrar que lo inusual también es bello y digno de asombro.<br><br>
  <b>Simbolismo:</b> Originalidad, sanación, orgullo de lo diferente.<br>
  <b>Tip de uso:</b> Ayuda a sanar heridas antiguas y a abrazar la propia rareza.`
};