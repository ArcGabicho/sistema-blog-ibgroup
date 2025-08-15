import { BriefcaseBusiness } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";

export default function Inicio(){
    return (
        <section className="flex flex-row gap-6 p-6 min-h-screen bg-gray-50" id="inicio">
            <div className="w-1/2 h-full">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8 h-full flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <span className="flex gap-2 items-center bg-gradient-to-r from-purple-900 to-purple-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all w-fit text-sm font-medium">
                            <BriefcaseBusiness size={18} />
                            ¿En qué consiste nuestro servicio?
                        </span>
                        <h1 className='text-4xl font-bold text-gray-900 leading-tight'>
                            Programas Outplacement
                        </h1>
                        <p className='text-lg text-gray-600 leading-relaxed'>
                            Nuestro servicio de outplacement o entrenamiento para la reubicación laboral consiste en un coaching personalizado de empleabilidad que maximiza su perfil profesional para acceder al mercado laboral oculto. Le ayudamos a optimizar su perfil personal para una transición exitosa de carrera, enfocándonos en el networking estratégico para encontrar oportunidades laborales que no se anuncian públicamente. Este enfoque integral asegura una reubicación efectiva en corto tiempo.
                        </p>
                    </div>                        
                    <Image
                        className='w-full h-full object-cover rounded-md' 
                        src={'/assets/outplacement-hero.webp'} 
                        alt='Outplacement el mejor empleo en el menor tiempo posible' 
                        width={500} 
                        height={300} 
                    />
                    <div className='w-full flex flex-row gap-4'>
                        <Link 
                            className='w-1/2 bg-gradient-to-r from-purple-900 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:from-purple-800 hover:to-purple-500 transition-all duration-300 font-medium text-center' 
                            href={"https://iboutplacement.com/pdf/Programas_Outplacement2.pdf"} 
                            target="_blank"
                        >
                            Ver Programas
                        </Link>
                        <Link 
                            className='w-1/2 bg-gradient-to-r from-purple-900 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:from-purple-800 hover:to-purple-500 transition-all duration-300 font-medium text-center' 
                            href={"https://iboutplacement.com/pdf/Programas_Outplacement2.pdf"} 
                            target="_blank"
                        >
                            Ver Programas
                        </Link>
                    </div>
                </div>
            </div>
            
            <div className="w-1/2 h-full flex flex-col gap-4">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Outplacement: el mejor empleo en el menor tiempo posible</h2>
                    <div className="flex-1 rounded-lg overflow-hidden">
                        <video 
                            className="w-full h-full object-cover" 
                            src="/assets/OUTPLACEMENT.mp4" 
                            autoPlay 
                            loop 
                            muted 
                            playsInline
                        ></video>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Coaching optimiza la búsqueda de empleo y desarrolla habilidades blandas</h2>
                    <div className="flex-1 rounded-lg overflow-hidden">
                        <video 
                            className="w-full h-full object-cover" 
                            src="/assets/COACHING.mp4" 
                            autoPlay 
                            loop 
                            muted 
                            playsInline
                        ></video>
                    </div>
                </div>
            </div>
        </section>
    )
}