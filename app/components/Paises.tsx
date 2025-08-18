import Image from "next/image";
import Link from "next/link";

interface Pais {
  nombre: string;
  bandera: string;
  alt: string;
}

const paises: Pais[] = [
  {
    nombre: "Perú",
    bandera: "/assets/bandera_peru.png",
    alt: "Flag of Peru",
  },
  {
    nombre: "Chile",
    bandera: "/assets/bandera_chile.png",
    alt: "Flag of Chile",
  },
  {
    nombre: "Bolivia",
    bandera: "/assets/bandera_bolivia.png",
    alt: "Flag of Bolivia",
  },
  {
    nombre: "Argentina",
    bandera: "/assets/bandera_argentina.png",
    alt: "Flag of Argentina",
  },
];

export default function Paises() {
  return (
    <>
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <Image
            alt="IBJOBCOACH Logo"
            className="h-16 mx-auto mb-6"
            src="/assets/logo_empresa.webp"
            width={350}
            height={50}
          />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ¿Quieres potenciar tu carrera?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Nuestros coaches expertos están listos para ayudarte a alcanzar tus
            metas profesionales. Con programas personalizados y un enfoque
            práctico, te guiaremos en cada paso de tu transición.
          </p>
          <Link
            className="cursor-pointer bg-gradient-to-r from-red-900 to-red-500 text-white rounded-lg hover:from-red-800 hover:to-red-500 transition-all font-bold py-3 px-8"
            href="https://wa.me/51984111555?text=Hola!%20Quisiera%20un%20asesor"
            target="_blank"
          >
            ¡Habla con un coach!
          </Link>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Estamos presentes en los siguientes países
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {paises.map((pais) => (
              <div className="text-center" key={pais.nombre}>
                <Image
                  alt={pais.alt}
                  className="h-20 w-20 rounded-full mx-auto mb-2 shadow-md"
                  src={pais.bandera}
                  width={80}
                  height={80}
                />
                <span className="font-semibold">{pais.nombre}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}