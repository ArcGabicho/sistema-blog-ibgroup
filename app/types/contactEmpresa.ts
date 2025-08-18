export type ContactEmpresa = {
  nombresApellidos: string;
  telefono: string;
  telefonoFijo?: string;
  email: string;
  empresa: string;
  ruc: string;
  cargo: string;
  nivelServicio:
    | "Outplacement Empresas"
    | "Headhunting Ejecutivo"
    | "Headhunting de Profesionales especializados"
    | "Seleccion de Personal"
    | "Evaluacion de Personal"
    | "Coaching para Ejecutivos"
    | "Coaching para Equipos"
    | "Formacion o Capacitación"
    | "Consultoria en Gestion del Talento"
    | "Outsourcing o Tercerización";
  rubroEmpresa:
    | "Bienes de consumo"
    | "Telecomunicaciones"
    | "Informático"
    | "Banca y Finanzas"
    | "Comercio y Retail"
    | "Energía Eléctrica"
    | "Electrónica"
    | "Servicios de Salud"
    | "Servicios Generales"
    | "Esparcimiento y Entretenimiento"
    | "Industrial y Manufactura"
    | "Petroleo y Gas"
    | "Petroquímica"
    | "Agroindustria"
    | "Pesca"
    | "Textil Ropa y Calzado"
    | "Turismo"
    | "Bebidas y Licores"
    | "Alimentos"
    | "Avicola y Ganadería"
    | "Ingeniería y Construcción"
    | "Máquinas y Equipos"
    | "Metalmecánica"
    | "Medios"
    | "Minería"
    | "Sidelúrgico y Metalúrgico"
    | "Transporte y Logística"
    | "Educación"
    | "Celulosa y Papel"
    | "Cemento"
    | "Automotriz y Autopartes"
    | "Laboratorios, Químico, Farmacéutico"
    | "Confecciones";
  nivelPersonalServicio:
    | "Personal de base"
    | "Mando medios"
    | "Gerentes o Directivos"
    | "Profesional altamente especializado"
    | "Otros";
  consulta: string;
};