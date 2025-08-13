import { BriefcaseBusiness } from 'lucide-react';
import Link from "next/link";

export default function Inicio(){
    return (
        <section className="flex flex-row gap-4 p-4 h-screen max-h-screen overflow-hidden" id="inicio">
            <div className="w-1/2 h-full">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 h-full flex flex-col justify-center gap-3">
                    <span className="flex gap-2 items-center bg-gradient-to-r from-purple-900 to-purple-500 text-white px-3 py-2 rounded-md hover:bg-purple-700 transition-colors w-fit text-sm">
                        <BriefcaseBusiness size={16} />
                        ¿En que consiste nuestro servicio?
                    </span>
                    <h1 className='text-3xl font-bold text-gray-800'>
                        Programas Outplacement
                    </h1>
                    <p className='text-base text-gray-600 leading-relaxed'>
                        Nuestro servicio de outplacement o entrenamiento para la reubicación laboral consiste en un coaching personalizado de empleabilidad que maximiza su perfil profesional para acceder al mercado laboral oculto. Le ayudamos a optimizar su perfil personal para una transición exitosa de carrera, enfocándonos en el networking estratégico para encontrar oportunidades laborales que no se anuncian públicamente. Este enfoque integral asegura una reubicación efectiva en corto tiempo.
                    </p>
                    <Link className='bg-gradient-to-r from-purple-900 to-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors w-fit' href={"https://iboutplacement.com/pdf/Programas_Outplacement2.pdf"} target="_blank">Ver Programas</Link>
                </div>
            </div>
            <div className="w-1/2 h-full flex flex-col gap-4">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex-1">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Outplacement el mejor empleo en el menor tiempo posible</h2>
                    <video className="w-full h-full max-h-[calc(100%-3rem)] object-cover rounded-md" src="/assets/OUTPLACEMENT.mp4" autoPlay loop muted playsInline></video>
                </div>
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex-1">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Coaching optimiza la búsqueda de empleo y desarrolla habilidades blandas</h2>
                    <video className="w-full h-full max-h-[calc(100%-3rem)] object-cover rounded-md" src="/assets/COACHING.mp4" autoPlay loop muted playsInline></video>
                </div>
            </div>
        </section>
    )
}