import { Globe, Dumbbell, BadgeCheck, Briefcase } from 'lucide-react';

const features = [
  {
    icon: <Globe size={40} />,
    title: "Locales y Globales",
    description:
      "Conocemos el mercado regional y global, ofreciendo un servicio de outplacement hecho a tu medida.",
  },
  {
    icon: <Dumbbell size={40} />,
    title: "Entrenamiento y Recursos",
    description:
      "Nuestros talleres online están diseñados para el éxito. Te damos acceso a las mejores herramientas.",
  },
  {
    icon: <BadgeCheck size={40} />,
    title: "Calidad y Experiencia",
    description:
      "Ofrecemos sesiones de alta calidad y contenido valioso que garantizan el máximo valor en tu inversión.",
  },
  {
    icon: <Briefcase size={40} />,
    title: "Mercado Laboral Oculto",
    description:
      "Más del 80% de las ofertas no se publican. Te ayudamos a acceder a este mercado y posicionar tu marca personal.",
  },
];

export default function Nosotros() {
  return (
    <section className="py-20 bg-gray-50" id='nosotros'>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          ¿Por qué elegirnos?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, idx) => (
            <div className="text-center" key={idx}>
              <div
                className="cursor-pointer bg-gradient-to-r from-red-900 to-red-500 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4"
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}