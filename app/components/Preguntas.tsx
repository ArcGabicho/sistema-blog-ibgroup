"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const preguntas = [
	{
		pregunta: "¿Qué es el outplacement?",
		respuesta:
			"El outplacement es un servicio de apoyo profesional para personas que están en proceso de transición laboral, ayudándolas a reinsertarse en el mercado de trabajo.",
	},
	{
		pregunta: "¿Qué servicios ofrecen para empresas?",
		respuesta:
			"Ofrecemos outplacement, headhunting, selección de personal, coaching ejecutivo, formación y consultoría en gestión del talento, entre otros.",
	},
	{
		pregunta: "¿Puedo acceder a los servicios si estoy en el extranjero?",
		respuesta:
			"Sí, nuestros servicios están disponibles para personas y empresas en varios países de Latinoamérica y España.",
	},
	{
		pregunta: "¿Cómo puedo solicitar una asesoría?",
		respuesta:
			"Puedes llenar el formulario de contacto y nos comunicaremos contigo a la brevedad.",
	},
];

export default function Preguntas() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<section className="max-w-2xl mx-auto my-12 px-4">
			<h2 className="text-2xl md:text-3xl font-extrabold text-red-900 mb-8 text-center tracking-tight">
				Preguntas Frecuentes
			</h2>
			<div className="space-y-4">
				{preguntas.map((item, idx) => (
					<div
						key={idx}
						className={`rounded-lg border border-neutral-200 shadow-sm bg-white transition-all duration-200 ${
							openIndex === idx
								? "ring-2 ring-red-600 ring-opacity-30"
								: "hover:shadow-md"
						}`}
					>
						<button
							className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded-lg transition-colors duration-150"
							onClick={() =>
								setOpenIndex(openIndex === idx ? null : idx)
							}
							aria-expanded={openIndex === idx}
						>
							<span>{item.pregunta}</span>
							<span className="ml-4 text-red-700">
								{openIndex === idx ? (
									<ChevronUp className="w-6 h-6" />
								) : (
									<ChevronDown className="w-6 h-6" />
								)}
							</span>
						</button>
						<div
							className={`overflow-hidden transition-all duration-300 ${
								openIndex === idx
									? "max-h-40 opacity-100"
									: "max-h-0 opacity-0"
							}`}
						>
							{openIndex === idx && (
								<div className="px-6 pb-5 text-neutral-700 text-base leading-relaxed">
									{item.respuesta}
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}