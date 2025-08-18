export type ContactPersona = {
  nombres: string;
  apellidos: string;
  cargo: string;
  email: string;
  telefono: string;
  actualmenteTrabajando: "SI" | "NO";
  servicioRequerido:
    | "Outplacement para personas naturales - Entrenamiento Completo"
    | "Talleres de Desarrollo de Habilidades Blandas"
    | "Curriculum de Gran Impacto"
    | "Mejora tu Autoconocimiento en el Campo Laboral"
    | "Entrenamiento para tu Entrevista Laboral Exitosa"
    | "Carta de Presentación"
    | "Linkedin - Optimización"
    | "Coaching para Desarrollo de Habilidades Blandas"
    | "Coaching Ejecutivo"
    | "Otro tipo de Coaching";
  salarioPersona:
    | "Menos de $. 1 000 USD"
    | "De $. 1 000 USD - $. 2 000 USD"
    | "De $. 2 000 USD- $. 3 000 USD"
    | "De $. 3 000 USD- $. 5 000 USD"
    | "De $. 5 000 USD- $. 8 000 USD"
    | "Más de $. 8 000 USD";
  pais:
    | "Perú"
    | "Chile"
    | "Bolivia"
    | "Argentina"
    | "Venezuela"
    | "Ecuador"
    | "Estados Unidos"
    | "México"
    | "Colombia"
    | "Uruguay"
    | "España";
  provincia: string;
  consulta: string;
};