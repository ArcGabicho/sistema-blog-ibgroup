import Image from "next/image";

interface BlogPost {
  title: string;
  description: string;
  category: string;
  image: string;
  alt: string;
  link: string;
}

const posts: BlogPost[] = [
  {
    title: "Preguntas Clave en Entrevistas",
    description: "Domina las entrevistas conociendo las preguntas más comunes y cómo responderlas eficazmente.",
    category: "EMPLEABILIDAD",
    image: "/assets/blog_1.png",
    alt: "Blog post about job interviews",
    link: "/blog/preguntas-clave-entrevistas",
  },
  {
    title: "Adaptándose al Cambio",
    description: "Las tecnologías avanzan y es crucial que los profesionales evolucionen con ellas. Descubre cómo.",
    category: "TRANSFORMACIÓN DIGITAL",
    image: "/assets/blog_2.png",
    alt: "Blog post about digital transformation",
    link: "/blog/adaptandose-al-cambio",
  },
  {
    title: "Tu Espacio de Trabajo Ideal",
    description: "Crea un entorno que fomente la productividad y el bienestar. Consejos para tu home office.",
    category: "DESARROLLO PROFESIONAL",
    image: "/assets/blog_3.png",
    alt: "Blog post about a professional's desk",
    link: "/blog/tu-espacio-de-trabajo-ideal",
  },
];

export default function Blog() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Últimas Publicaciones de Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image alt={post.alt} className="w-full h-56 object-cover" src={post.image} width={400} height={224} />
              <div className="p-6">
                <span className="text-sm text-red-600 font-semibold">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold my-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.description}
                </p>
                <a className="text-red-600 font-semibold hover:underline" href={post.link}>
                  Leer más
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}