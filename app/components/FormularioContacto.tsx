"use client"

import { useState } from "react";
import type { ContactPersona } from "../types/contactPersona";
import type { ContactEmpresa } from "../types/contactEmpresa";

interface Props {
  open: boolean;
  onClose: () => void;
}

const servicios = [
  "Outplacement para personas naturales - Entrenamiento Completo",
  "Talleres de Desarrollo de Habilidades Blandas",
  "Curriculum de Gran Impacto",
  "Mejora tu Autoconocimiento en el Campo Laboral",
  "Entrenamiento para tu Entrevista Laboral Exitosa",
  "Carta de Presentación",
  "Linkedin - Optimización",
  "Coaching para Desarrollo de Habilidades Blandas",
  "Coaching Ejecutivo",
  "Otro tipo de Coaching",
];

const salarios = [
  "Menos de $. 1 000 USD",
  "De $. 1 000 USD - $. 2 000 USD",
  "De $. 2 000 USD- $. 3 000 USD",
  "De $. 3 000 USD- $. 5 000 USD",
  "De $. 5 000 USD- $. 8 000 USD",
  "Más de $. 8 000 USD",
];

const paises = [
  "Perú",
  "Chile",
  "Bolivia",
  "Argentina",
  "Venezuela",
  "Ecuador",
  "Estados Unidos",
  "México",
  "Colombia",
  "Uruguay",
  "España",
];

const provinciasPorPais: Record<string, string[]> = {
  "Perú": [
    "Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca", "Callao", "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad", "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"
  ],
  "Chile": [
    "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo", "Valparaíso", "Metropolitana de Santiago", "Libertador General Bernardo O'Higgins", "Maule", "Ñuble", "Biobío", "La Araucanía", "Los Ríos", "Los Lagos", "Aysén", "Magallanes"
  ],
  "Bolivia": [
    "Beni", "Chuquisaca", "Cochabamba", "La Paz", "Oruro", "Pando", "Potosí", "Santa Cruz", "Tarija"
  ],
  "Argentina": [
    "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán", "Ciudad Autónoma de Buenos Aires"
  ],
  "Venezuela": [
    "Amazonas", "Anzoátegui", "Apure", "Aragua", "Barinas", "Bolívar", "Carabobo", "Cojedes", "Delta Amacuro", "Distrito Capital", "Falcón", "Guárico", "Lara", "Mérida", "Miranda", "Monagas", "Nueva Esparta", "Portuguesa", "Sucre", "Táchira", "Trujillo", "La Guaira", "Yaracuy", "Zulia"
  ],
  "Ecuador": [
    "Azuay", "Bolívar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi", "El Oro", "Esmeraldas", "Galápagos", "Guayas", "Imbabura", "Loja", "Los Ríos", "Manabí", "Morona Santiago", "Napo", "Orellana", "Pastaza", "Pichincha", "Santa Elena", "Santo Domingo de los Tsáchilas", "Sucumbíos", "Tungurahua", "Zamora Chinchipe"
  ],
  "Estados Unidos": [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Carolina del Norte", "Carolina del Sur", "Colorado", "Connecticut", "Dakota del Norte", "Dakota del Sur", "Delaware", "Florida", "Georgia", "Hawái", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Luisiana", "Maine", "Maryland", "Massachusetts", "Míchigan", "Minnesota", "Misisipi", "Misuri", "Montana", "Nebraska", "Nevada", "Nueva Jersey", "Nueva York", "Nuevo Hampshire", "Nuevo México", "Ohio", "Oklahoma", "Oregón", "Pensilvania", "Rhode Island", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Virginia Occidental", "Washington", "Wisconsin", "Wyoming"
  ],
  "México": [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
  ],
  "Colombia": [
    "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bogotá D.C.", "Bolívar", "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Nariño", "Norte de Santander", "Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia", "Santander", "Sucre", "Tolima", "Valle del Cauca", "Vaupés", "Vichada"
  ],
  "Uruguay": [
    "Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno", "Flores", "Florida", "Lavalleja", "Maldonado", "Montevideo", "Paysandú", "Río Negro", "Rivera", "Rocha", "Salto", "San José", "Soriano", "Tacuarembó", "Treinta y Tres"
  ],
  "España": [
    "Andalucía", "Aragón", "Asturias", "Baleares", "Canarias", "Cantabria", "Castilla y León", "Castilla-La Mancha", "Cataluña", "Comunidad Valenciana", "Extremadura", "Galicia", "La Rioja", "Madrid", "Murcia", "Navarra", "País Vasco", "Ceuta", "Melilla"
  ]
};

const serviciosEmpresa = [
  "Outplacement Empresas",
  "Headhunting Ejecutivo",
  "Headhunting de Profesionales especializados",
  "Seleccion de Personal",
  "Evaluacion de Personal",
  "Coaching para Ejecutivos",
  "Coaching para Equipos",
  "Formacion o Capacitación",
  "Consultoria en Gestion del Talento",
  "Outsourcing o Tercerización",
];

const rubrosEmpresa = [
  "Bienes de consumo",
  "Telecomunicaciones",
  "Informático",
  "Banca y Finanzas",
  "Comercio y Retail",
  "Energía Eléctrica",
  "Electrónica",
  "Servicios de Salud",
  "Servicios Generales",
  "Esparcimiento y Entretenimiento",
  "Industrial y Manufactura",
  "Petroleo y Gas",
  "Petroquímica",
  "Agroindustria",
  "Pesca",
  "Textil Ropa y Calzado",
  "Turismo",
  "Bebidas y Licores",
  "Alimentos",
  "Avicola y Ganadería",
  "Ingeniería y Construcción",
  "Máquinas y Equipos",
  "Metalmecánica",
  "Medios",
  "Minería",
  "Sidelúrgico y Metalúrgico",
  "Transporte y Logística",
  "Educación",
  "Celulosa y Papel",
  "Cemento",
  "Automotriz y Autopartes",
  "Laboratorios, Químico, Farmacéutico",
  "Confecciones",
];

const nivelesPersonalServicio = [
  "Personal de base",
  "Mando medios",
  "Gerentes o Directivos",
  "Profesional altamente especializado",
  "Otros",
];

export default function FormularioContacto({ open, onClose }: Props) {
  const [tab, setTab] = useState<"persona" | "empresa">("persona");
  const [persona, setPersona] = useState<Partial<ContactPersona>>({});
  const [empresa, setEmpresa] = useState<Partial<ContactEmpresa>>({});

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <div className="sticky top-0 bg-white rounded-t-xl p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Formulario de Contacto</h2>
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            onClick={onClose}
            aria-label="Cerrar formulario"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 sm:p-6">
        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`flex-1 py-3 px-2 text-sm sm:text-base font-medium transition-all duration-200 ${
              tab === "persona" 
                ? "border-b-2 border-red-600 text-red-600 bg-red-50" 
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
            onClick={() => setTab("persona")}
          >
            Persona
          </button>
          <button
            className={`flex-1 py-3 px-2 text-sm sm:text-base font-medium transition-all duration-200 ${
              tab === "empresa" 
                ? "border-b-2 border-red-600 text-red-600 bg-red-50" 
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
            onClick={() => setTab("empresa")}
          >
            Empresa
          </button>
        </div>
        {tab === "persona" ? (
          <form className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombres"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base"
                value={persona.nombres || ""}
                onChange={e => setPersona({ ...persona, nombres: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Apellidos"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base"
                value={persona.apellidos || ""}
                onChange={e => setPersona({ ...persona, apellidos: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Cargo"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base"
                value={persona.cargo || ""}
                onChange={e => setPersona({ ...persona, cargo: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base"
                value={persona.email || ""}
                onChange={e => setPersona({ ...persona, email: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Teléfono"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base"
                value={persona.telefono || ""}
                onChange={e => setPersona({ ...persona, telefono: e.target.value })}
                required
              />
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base bg-white"
                value={persona.actualmenteTrabajando || ""}
                onChange={e => setPersona({ ...persona, actualmenteTrabajando: e.target.value as "SI" | "NO" })}
                required
              >
                <option value="" disabled>¿Actualmente estás trabajando?</option>
                <option value="SI">Sí</option>
                <option value="NO">No</option>
              </select>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base bg-white sm:col-span-2"
                value={persona.servicioRequerido || ""}
                onChange={e => setPersona({ ...persona, servicioRequerido: e.target.value as ContactPersona["servicioRequerido"] })}
                required
              >
                <option value="" disabled>¿Qué servicios requieres?</option>
                {servicios.map(servicio => (
                  <option key={servicio} value={servicio}>{servicio}</option>
                ))}
              </select>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base bg-white"
                value={persona.salarioPersona || ""}
                onChange={e => setPersona({ ...persona, salarioPersona: e.target.value as ContactPersona["salarioPersona"] })}
                required
              >
                <option value="" disabled>¿Cuál es tu rango salarial? (USD)</option>
                {salarios.map(salario => (
                  <option key={salario} value={salario}>{salario}</option>
                ))}
              </select>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base bg-white"
                value={persona.pais || ""}
                onChange={e => {
                  setPersona({ ...persona, pais: e.target.value as ContactPersona["pais"], provincia: "" });
                }}
                required
              >
                <option value="" disabled>País</option>
                {paises.map(pais => (
                  <option key={pais} value={pais}>{pais}</option>
                ))}
              </select>
              {/* Provincia: select dinámico según país */}
              {persona.pais ? (
                provinciasPorPais[persona.pais] ? (
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base bg-white"
                    value={persona.provincia || ""}
                    onChange={e => setPersona({ ...persona, provincia: e.target.value })}
                    required
                  >
                    <option value="" disabled>
                      {provinciasPorPais[persona.pais].length > 0
                        ? "Provincia"
                        : "No hay provincias disponibles"}
                    </option>
                    {provinciasPorPais[persona.pais].map(provincia => (
                      <option key={provincia} value={provincia}>{provincia}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder="Provincia"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base"
                    value={persona.provincia || ""}
                    onChange={e => setPersona({ ...persona, provincia: e.target.value })}
                    required
                  />
                )
              ) : (
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-400 text-sm sm:text-base" disabled>
                  <option>Primero escoge un país</option>
                </select>
              )}
            </div>
            <textarea
              placeholder="Consulta"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base min-h-[100px] resize-none"
              value={persona.consulta || ""}
              onChange={e => setPersona({ ...persona, consulta: e.target.value })}
              required
            />
            <button type="submit" className="w-full bg-gradient-to-r from-red-900 to-red-500 text-white px-6 py-3 rounded-lg hover:from-red-800 hover:to-red-600 transition-all duration-200 font-medium text-sm sm:text-base">
              Enviar
            </button>
          </form>
        ) : (
          <form className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombres y Apellidos"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base"
                value={empresa.nombresApellidos || ""}
                onChange={e => setEmpresa({ ...empresa, nombresApellidos: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Teléfono"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base"
                value={empresa.telefono || ""}
                onChange={e => setEmpresa({ ...empresa, telefono: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Teléfono fijo (opcional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base"
                value={empresa.telefonoFijo || ""}
                onChange={e => setEmpresa({ ...empresa, telefonoFijo: e.target.value })}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base"
                value={empresa.email || ""}
                onChange={e => setEmpresa({ ...empresa, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Empresa"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base"
                value={empresa.empresa || ""}
                onChange={e => setEmpresa({ ...empresa, empresa: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="RUC"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base"
                value={empresa.ruc || ""}
                onChange={e => setEmpresa({ ...empresa, ruc: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Cargo"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base"
                value={empresa.cargo || ""}
                onChange={e => setEmpresa({ ...empresa, cargo: e.target.value })}
                required
              />
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base bg-white"
                value={empresa.nivelServicio || ""}
                onChange={e => setEmpresa({ ...empresa, nivelServicio: e.target.value as ContactEmpresa["nivelServicio"] })}
                required
              >
                <option value="" disabled>¿Qué servicio requiere?</option>
                {serviciosEmpresa.map(servicio => (
                  <option key={servicio} value={servicio}>{servicio}</option>
                ))}
              </select>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base bg-white"
                value={empresa.rubroEmpresa || ""}
                onChange={e => setEmpresa({ ...empresa, rubroEmpresa: e.target.value as ContactEmpresa["rubroEmpresa"] })}
                required
              >
                <option value="" disabled>Rubro de la empresa</option>
                {rubrosEmpresa.map(rubro => (
                  <option key={rubro} value={rubro}>{rubro}</option>
                ))}
              </select>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base bg-white sm:col-span-2"
                value={empresa.nivelPersonalServicio || ""}
                onChange={e => setEmpresa({ ...empresa, nivelPersonalServicio: e.target.value as ContactEmpresa["nivelPersonalServicio"] })}
                required
              >
                <option value="" disabled>Nivel del personal para el servicio</option>
                {nivelesPersonalServicio.map(nivel => (
                  <option key={nivel} value={nivel}>{nivel}</option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Consulta"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base min-h-[100px] resize-none"
              value={empresa.consulta || ""}
              onChange={e => setEmpresa({ ...empresa, consulta: e.target.value })}
              required
            />
            <button type="submit" className="w-full bg-gradient-to-r from-red-900 to-red-500 text-white px-6 py-3 rounded-lg hover:from-red-800 hover:to-red-600 transition-all duration-200 font-medium text-sm sm:text-base">
              Enviar
            </button>
          </form>
        )}
        </div>
      </div>
    </div>
  );
}