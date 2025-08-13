export default function Blog(){
    return (
        <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Últimas Publicaciones de Blog
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                alt="Blog post about job interviews"
                className="w-full h-56 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcJuxA_SKewhdJsXuxKX4rwsM3CA1IvlcK7GGhuW19FI35Yw9piuFPFVsK22Gga4d8uAKHF23P74AalnN5Pn3O4aBznRNu8t-Mue2XVNbMCRUPRsb_VJoZlDmKiogMxlt_cUCIHnltJF67Y1-jLkctxmBjqeOLL8mpmiZNDSUNO37SZcjk01cMkpTB72NXZs33GaCHKZRhNsvDKi-qKuBXuEGNXO9_cMvtOX95jhxUNg3HTTagpGnmXHZcKkEdArBV09MOLh6zgMU"
              />
              <div className="p-6">
                <span className="text-sm text-red-600 font-semibold"
                  >EMPLEABILIDAD</span
                >
                <h3 className="text-xl font-bold my-2">
                  Preguntas Clave en Entrevistas
                </h3>
                <p className="text-gray-600 mb-4">
                  Domina las entrevistas conociendo las preguntas más comunes y
                  cómo responderlas eficazmente.
                </p>
                <a className="text-red-600 font-semibold hover:underline" href="#"
                  >Leer más</a
                >
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                alt="Blog post about digital transformation"
                className="w-full h-56 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChu9kDHS2AiA0t_Jd18vvRgCiBCyIyoWFSJYal1TK3mQih9k8AC_nrnaQXzvXjpLr9aDstWATSm_WMNJRfnQCJtutBHBmFY5L-j2PBoI-9_Yt4E7ts9tFTeU8OK6neN5EMJ0SwZRunnK-djO3Z7mGGUDgeAYCu8YVZsxMbZFo1Zge7JZrrx4uYk_N0BGVd6lFz15PP_j1d-xY-NbUnq_rC6eNuS4gHDemxJtB4cCv3nNTmrTE8qUGdNyCz6U0__zFQaRxvswElosg"
              />
              <div className="p-6">
                <span className="text-sm text-red-600 font-semibold"
                  >TRANSFORMACIÓN DIGITAL</span
                >
                <h3 className="text-xl font-bold my-2">Adaptándose al Cambio</h3>
                <p className="text-gray-600 mb-4">
                  Las tecnologías avanzan y es crucial que los profesionales
                  evolucionen con ellas. Descubre cómo.
                </p>
                <a className="text-red-600 font-semibold hover:underline" href="#"
                  >Leer más</a
                >
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                alt="Blog post about a professional's desk"
                className="w-full h-56 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDfI4vbqxvIyAYK2o4LEs-TFlTAKExtDvS0Tch2VPjr_ea1kl9SNBC39TErGbrMNCIRaFZfsYE7Auac4ofJcuSxlhOGbDUZZgRqgvg7h3xjHWrMGRRptzllsoCO8mwgs74iQB8UwggNoxcVLJL4fsJZdPotyaXLPXHpRdJt2GwI04z3nYS_A9ql22iKvu_cXtDaI7BG0LG3i9lhX45eLmqWHD3Sv0IwTId_yEuBA2al0aFzxBMyaJbScDd7cSTgYoWu62NzBvcEY0"
              />
              <div className="p-6">
                <span className="text-sm text-red-600 font-semibold"
                  >DESARROLLO PROFESIONAL</span
                >
                <h3 className="text-xl font-bold my-2">
                  Tu Espacio de Trabajo Ideal
                </h3>
                <p className="text-gray-600 mb-4">
                  Crea un entorno que fomente la productividad y el bienestar.
                  Consejos para tu home office.
                </p>
                <a className="text-red-600 font-semibold hover:underline" href="#"
                  >Leer más</a
                >
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}