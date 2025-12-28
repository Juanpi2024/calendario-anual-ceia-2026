// Calendario Académico Primer Semestre 2026 - CEIA Juanita Zúñiga Fuentes
const calendarData = [
    // MARZO
    { id: 1, day: "02-03", month: "marzo", title: "Jornada de Organización y planificación curricular 2026", category: "administrativo", description: "Preparación del año escolar con planificación curricular para el año 2026.", responsables: [], recursos: [], priority: "alta" },
    { id: 2, day: "04", month: "marzo", title: "Inicio año escolar 2026", category: "celebracion", description: "Jornada Mañana (8:30h): 7° y 8° básico, 1°-4° T.P. Electricidad. Jornada Tarde (14:00h): 1°-4° T.P. Atención de Párvulos. Vespertina (19:00h): 1° y 2° Ciclo HC.", responsables: [], recursos: [], priority: "urgente" },
    { id: 3, day: "04", month: "marzo", title: "Entrega en UTP Planificaciones por unidad 0 (pendientes)", category: "entrega", description: "Entrega de planificaciones correspondientes a la unidad 0.", responsables: ["Docentes"], recursos: [], priority: "alta" },
    { id: 4, day: "05", month: "marzo", title: "1° Consejo General de Profesores y Asistentes de la Educación", category: "consejo", description: "Primer consejo general del año escolar. Horario por confirmar.", responsables: ["Dirección", "UTP"], recursos: ["Sala de reuniones"], priority: "alta" },
    { id: 5, day: "05", month: "marzo", title: "Entrega en UTP Prueba Diagnóstico con protocolo de corrección", category: "entrega", description: "Entrega de pruebas diagnósticas con sus respectivos protocolos de corrección.", responsables: ["Docentes"], recursos: [], priority: "alta" },
    { id: 6, day: "08", month: "marzo", title: "Día Internacional de la Mujer", category: "celebracion", description: "Conmemoración del Día Internacional de la Mujer.", responsables: [], recursos: [], priority: "normal" },
    { id: 7, day: "09-13", month: "marzo", title: "Evaluación Diagnóstica", category: "evaluacion", description: "Evaluación diagnóstica en todos los sectores de aprendizaje y módulos de las modalidades educativas.", responsables: ["Docentes", "UTP"], recursos: ["Instrumentos de evaluación"], priority: "alta" },
    { id: 8, day: "12", month: "marzo", title: "Consejo de Profesores: Técnico Pedagógico", category: "consejo", description: "Consejo técnico pedagógico. Horario por confirmar.", responsables: ["UTP"], recursos: ["Sala de reuniones"], priority: "normal" },
    { id: 9, day: "14", month: "marzo", title: "Día Contra el Ciberacoso", category: "celebracion", description: "Día de concientización contra el ciberacoso.", responsables: ["Convivencia Escolar"], recursos: [], priority: "normal" },
    { id: 10, day: "15", month: "marzo", title: "Entrega en UTP Planificaciones Anuales 2026", category: "entrega", description: "Entrega de las planificaciones anuales del año 2026.", responsables: ["Docentes"], recursos: [], priority: "urgente" },
    { id: 11, day: "17", month: "marzo", title: "1° Consejo Escolar", category: "consejo", description: "Primer consejo escolar del año.", responsables: ["Dirección"], recursos: ["Sala de reuniones"], priority: "alta" },
    { id: 12, day: "19", month: "marzo", title: "Consejo de Profesores: Trabajo Colaborativo - PIE", category: "consejo", description: "Trabajo colaborativo del Programa de Integración Escolar.", responsables: ["PIE", "Docentes"], recursos: [], priority: "normal" },
    { id: 13, day: "21", month: "marzo", title: "Día Internacional de la Eliminación de la Discriminación Racial", category: "celebracion", description: "Conmemoración internacional.", responsables: [], recursos: [], priority: "normal" },
    { id: 14, day: "22", month: "marzo", title: "Día Mundial del Agua", category: "celebracion", description: "Conmemoración del Día Mundial del Agua.", responsables: [], recursos: [], priority: "baja" },
    { id: 15, day: "23-27", month: "marzo", title: "Revisión registro de evaluación Diagnóstica por UTP", category: "evaluacion", description: "Periodo de revisión de los registros de evaluación diagnóstica.", responsables: ["UTP"], recursos: [], priority: "alta" },
    { id: 16, day: "25", month: "marzo", title: "Acto de inicio de año escolar 2026", category: "celebracion", description: "Ceremonia oficial de inicio del año escolar.", responsables: ["Dirección", "Docentes"], recursos: ["Auditorio", "Amplificación"], priority: "alta" },
    { id: 17, day: "26", month: "marzo", title: "Consejo de Profesores: Trabajo Administrativo", category: "consejo", description: "Consejo de trabajo administrativo.", responsables: ["UTP"], recursos: [], priority: "normal" },
    { id: 18, day: "26", month: "marzo", title: "Entrega en UTP Planificaciones mes de abril", category: "entrega", description: "Entrega de planificaciones mensuales para abril.", responsables: ["Docentes"], recursos: [], priority: "alta" },

    // ABRIL
    { id: 19, day: "01", month: "abril", title: "Reunión Equipo de Gestión", category: "administrativo", description: "Reunión del equipo de gestión escolar.", responsables: ["Equipo de Gestión"], recursos: [], priority: "normal" },
    { id: 20, day: "01", month: "abril", title: "Inicio de ejecución de Planes de Gestión", category: "administrativo", description: "Comienza la ejecución de los planes de gestión institucional.", responsables: ["Equipo de Gestión"], recursos: [], priority: "alta" },
    { id: 21, day: "02", month: "abril", title: "Consejo General de Profesores y Asistentes de la Educación", category: "consejo", description: "Consejo general mensual.", responsables: ["Dirección", "UTP"], recursos: ["Sala de reuniones"], priority: "normal" },
    { id: 22, day: "02", month: "abril", title: "Día Mundial de la Concienciación sobre el Autismo (PIE)", category: "celebracion", description: "Día de concientización sobre el autismo, organizado por PIE.", responsables: ["PIE"], recursos: [], priority: "normal" },
    { id: 23, day: "03", month: "abril", title: "Feriado", category: "feriado", description: "Día feriado legal.", responsables: [], recursos: [], priority: "baja" },
    { id: 24, day: "06-10", month: "abril", title: "1° Revisión de notas (Evaluación unidad 0)", category: "evaluacion", description: "Primera revisión de notas de la unidad 0 en todos los cursos y asignaturas.", responsables: ["UTP", "Docentes"], recursos: [], priority: "alta" },
    { id: 25, day: "09", month: "abril", title: "Consejo de Profesores: Técnico Pedagógico", category: "consejo", description: "Consejo técnico pedagógico mensual.", responsables: ["UTP"], recursos: [], priority: "normal" },
    { id: 26, day: "16", month: "abril", title: "Jornada de Revisión Reglamento Interno", category: "administrativo", description: "Jornada de revisión y actualización del reglamento interno.", responsables: ["Dirección", "Convivencia Escolar"], recursos: [], priority: "alta" },
    { id: 27, day: "20-24", month: "abril", title: "Inicio Exámenes de validación TP", category: "evaluacion", description: "Inicio de exámenes de validación para alumnas de carreras TP: Atención de Párvulos y Electricidad.", responsables: ["Coordinación TP", "Docentes"], recursos: [], priority: "urgente" },
    { id: 28, day: "23", month: "abril", title: "Día Mundial del Libro y del Derecho de Autor", category: "celebracion", description: "Celebración del día del libro.", responsables: [], recursos: [], priority: "normal" },
    { id: 29, day: "27", month: "abril", title: "Día del Carabinero", category: "celebracion", description: "Conmemoración del Día del Carabinero.", responsables: [], recursos: [], priority: "baja" },
    { id: 30, day: "29", month: "abril", title: "Día de la Convivencia Escolar", category: "celebracion", description: "Día dedicado a la convivencia escolar.", responsables: ["Convivencia Escolar"], recursos: [], priority: "normal" },
    { id: 31, day: "30", month: "abril", title: "Consejo de Profesores: Trabajo Administrativo", category: "consejo", description: "Consejo de trabajo administrativo mensual.", responsables: ["UTP"], recursos: [], priority: "normal" },
    { id: 32, day: "30", month: "abril", title: "Entrega en UTP Planificaciones mes de mayo", category: "entrega", description: "Entrega de planificaciones mensuales para mayo.", responsables: ["Docentes"], recursos: [], priority: "alta" },

    // MAYO
    { id: 33, day: "01", month: "mayo", title: "Día del Trabajo", category: "feriado", description: "Feriado legal - Día del Trabajador.", responsables: [], recursos: [], priority: "baja" },
    { id: 34, day: "04", month: "mayo", title: "Inicio de visitas al aula", category: "administrativo", description: "Comienza el periodo de visitas de acompañamiento al aula.", responsables: ["UTP"], recursos: [], priority: "alta" },
    { id: 35, day: "04-08", month: "mayo", title: "2° Revisión de notas (UTP CEIA)", category: "evaluacion", description: "Segunda revisión de notas por UTP.", responsables: ["UTP"], recursos: [], priority: "alta" },
    { id: 36, day: "06", month: "mayo", title: "Reunión Equipo de Gestión", category: "administrativo", description: "Reunión mensual del equipo de gestión.", responsables: ["Equipo de Gestión"], recursos: [], priority: "normal" },
    { id: 37, day: "07", month: "mayo", title: "Consejo General de Profesores y Asistentes de la Educación", category: "consejo", description: "Consejo general mensual.", responsables: ["Dirección", "UTP"], recursos: [], priority: "normal" },
    { id: 38, day: "08", month: "mayo", title: "Día de la Integridad en las Comunidades Educativas", category: "celebracion", description: "Día de la integridad en comunidades educativas.", responsables: [], recursos: [], priority: "normal" },
    { id: 39, day: "11", month: "mayo", title: "Celebración Día del Estudiante", category: "celebracion", description: "Celebración del día del estudiante.", responsables: ["Centro de Estudiantes", "Dirección"], recursos: [], priority: "alta" },
    { id: 40, day: "13", month: "mayo", title: "Comienzo del proceso de acompañamiento al aula", category: "administrativo", description: "Inicio formal del proceso de acompañamiento docente en aula.", responsables: ["UTP"], recursos: [], priority: "alta" },
    { id: 41, day: "14", month: "mayo", title: "Consejo de Profesores: Técnico Pedagógico", category: "consejo", description: "Consejo técnico pedagógico mensual.", responsables: ["UTP"], recursos: [], priority: "normal" },
    { id: 42, day: "17", month: "mayo", title: "Día Internacional contra la Homofobia, Transfobia y Bifobia", category: "celebracion", description: "Plan de Inclusión, Convivencia, Formación Ciudadana.", responsables: ["Convivencia Escolar"], recursos: [], priority: "normal" },
    { id: 43, day: "21", month: "mayo", title: "Feriado Legal", category: "feriado", description: "Día de las Glorias Navales.", responsables: [], recursos: [], priority: "baja" },
    { id: 44, day: "25-29", month: "mayo", title: "Semana de la Seguridad Escolar (PISE)", category: "administrativo", description: "Semana dedicada a la seguridad escolar según Plan Integral de Seguridad Escolar.", responsables: ["Coordinador PISE"], recursos: [], priority: "alta" },
    { id: 45, day: "26", month: "mayo", title: "Taller para Padres, Tutores o Familiares (PIE, dupla, SAAT)", category: "administrativo", description: "Taller para apoderados organizado por PIE, dupla psicosocial y SAAT.", responsables: ["PIE", "Dupla Psicosocial"], recursos: [], priority: "normal" },
    { id: 46, day: "28", month: "mayo", title: "Consejo de Profesores: Trabajo Administrativo", category: "consejo", description: "Consejo de trabajo administrativo mensual.", responsables: ["UTP"], recursos: [], priority: "normal" },
    { id: 47, day: "28-29", month: "mayo", title: "Simulacro PISE", category: "administrativo", description: "Simulacro del Plan Integral de Seguridad Escolar.", responsables: ["Coordinador PISE"], recursos: [], priority: "alta" },
    { id: 48, day: "28", month: "mayo", title: "Entrega en UTP Planificaciones mes de junio", category: "entrega", description: "Entrega de planificaciones mensuales para junio.", responsables: ["Docentes"], recursos: [], priority: "alta" },

    // JUNIO
    { id: 49, day: "04", month: "junio", title: "Consejo General de Profesores y Asistentes de la Educación", category: "consejo", description: "Consejo general mensual.", responsables: ["Dirección", "UTP"], recursos: [], priority: "normal" },
    { id: 50, day: "11", month: "junio", title: "Consejo de Profesores: Técnico Pedagógico", category: "consejo", description: "Consejo técnico pedagógico mensual.", responsables: ["UTP"], recursos: [], priority: "normal" },
    { id: 51, day: "12", month: "junio", title: "Promedios de notas todas las asignaturas primer semestre 2026", category: "evaluacion", description: "Cierre de promedios del primer semestre.", responsables: ["Docentes", "UTP"], recursos: [], priority: "urgente" },
    { id: 52, day: "12", month: "junio", title: "2° Consejo Escolar", category: "consejo", description: "Segundo consejo escolar del año.", responsables: ["Dirección"], recursos: [], priority: "alta" },
    { id: 53, day: "18", month: "junio", title: "Último día de asistencia clases 1° semestre 2026", category: "administrativo", description: "Último día de clases del primer semestre.", responsables: [], recursos: [], priority: "alta" },
    { id: 54, day: "19", month: "junio", title: "Jornada de evaluación del 1° semestre y planificación curricular 2° semestre", category: "administrativo", description: "Jornada de reflexión y planificación para el segundo semestre.", responsables: ["Dirección", "UTP", "Docentes"], recursos: [], priority: "urgente" },
    { id: 55, day: "19", month: "junio", title: "Entrega en UTP Planificación mensual (mes de julio)", category: "entrega", description: "Entrega de planificaciones para julio.", responsables: ["Docentes"], recursos: [], priority: "alta" },
    { id: 56, day: "22", month: "junio", title: "Inicio Vacaciones de Invierno 2026", category: "feriado", description: "Comienza el periodo de vacaciones de invierno.", responsables: [], recursos: [], priority: "normal" },

    // JULIO
    { id: 57, day: "03", month: "julio", title: "Fin Vacaciones de Invierno 2026", category: "feriado", description: "Último día de vacaciones de invierno.", responsables: [], recursos: [], priority: "normal" },
    { id: 58, day: "06", month: "julio", title: "Inicio de clases 2° semestre 2026", category: "celebracion", description: "Retorno a clases para el segundo semestre.", responsables: [], recursos: [], priority: "alta" }
];

// Category labels
const categoryLabels = {
    consejo: "Consejo",
    entrega: "Entrega UTP",
    evaluacion: "Evaluación",
    feriado: "Feriado",
    celebracion: "Celebración",
    administrativo: "Administrativo",
    interno: "Interno"
};

// Month labels
const monthLabels = {
    marzo: "Marzo",
    abril: "Abril",
    mayo: "Mayo",
    junio: "Junio",
    julio: "Julio"
};

// Status labels
const statusLabels = {
    pending: "Pendiente",
    "in-progress": "En Progreso",
    completed: "Completada"
};

// Priority labels
const priorityLabels = {
    baja: "Baja",
    normal: "Normal",
    alta: "Alta",
    urgente: "Urgente"
};

// Month data for calendar
const monthsData = {
    marzo: { year: 2026, monthIndex: 2, daysInMonth: 31, startDay: 0 }, // Marzo 2026 empieza domingo
    abril: { year: 2026, monthIndex: 3, daysInMonth: 30, startDay: 3 }, // Miércoles
    mayo: { year: 2026, monthIndex: 4, daysInMonth: 31, startDay: 5 }, // Viernes
    junio: { year: 2026, monthIndex: 5, daysInMonth: 30, startDay: 1 }, // Lunes
    julio: { year: 2026, monthIndex: 6, daysInMonth: 31, startDay: 3 }  // Miércoles
};
