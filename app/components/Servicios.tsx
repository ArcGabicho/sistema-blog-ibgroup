import { TrendingUp, Users, Brain, GraduationCap } from 'lucide-react';

export default function Servicios() {
    return (
        <section className="py-20 bg-gray-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Nuestros Servicios</h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-12">
            En IBJOBCOACH, ofrecemos servicios especializados para ayudar a
            personas y empresas a navegar las complejidades del mercado laboral
            actual. Nuestros programas están diseñados para generar aprendizajes
            de alto impacto.
          </p>
          <div className="flex justify-center mb-10">
            <button
              className="py-3 px-8 bg-red-600 text-white rounded-l-full font-semibold focus:outline-none"
            >
              Personas
            </button>
            <button
              className="py-3 px-8 bg-gray-700 text-white rounded-r-full font-semibold focus:outline-none"
            >
              Empresas
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-white text-red-600 rounded-full p-4 mb-4">
                <TrendingUp size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Programa de Outplacement
              </h3>
              <a className="text-red-400 hover:underline" href="#"
                >Más información</a
              >
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white text-red-600 rounded-full p-4 mb-4">
                <Users size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Consultoría para Profesionales
              </h3>
              <a className="text-red-400 hover:underline" href="#"
                >Más información</a
              >
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white text-red-600 rounded-full p-4 mb-4">
                <Brain size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Coaching en Habilidades Blandas
              </h3>
              <a className="text-red-400 hover:underline" href="#"
                >Más información</a
              >
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white text-red-600 rounded-full p-4 mb-4">
                <GraduationCap size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Taller de Desarrrollo</h3>
              <a className="text-red-400 hover:underline" href="#"
                >Más información</a
              >
            </div>
          </div>
        </div>
      </section>
    )
}