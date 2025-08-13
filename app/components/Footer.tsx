export default function Footer(){
    return (
        <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img
              alt="IBJOBCOACH Logo"
              className="h-10 mb-4"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2VrJLbYb8-wF-bKbsIliFWKUQhL-TPQsyEoD-YzTnzSO6IJyJRuHDFl2SeZ9Z4uTqezsgt4mJKMtPydHI4jAKt7NZdPsq3uUXJ_BbOigZljSLtzpOM9Eh1NN8dJXg51NT9zGp502rWnlv0t-tKDZcJWheHrqU9SaplacI3LUD3OwUOBSXh9euh-jCULQy7VnXIzyfnVdtfaHDGiK1ZUucX8r9zP1sc6tmZALlnYfcCf84C7a0YHnAHPEdLM8vER-7xsAvpwBgCNk"
            />
            <p className="text-gray-400">
              Transformando carreras, impulsando el éxito.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <a className="text-gray-400 hover:text-white" href="#">Blog</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white" href="#">Guías</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white" href="#">Webinars</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Explorar</h3>
            <ul className="space-y-2">
              <li>
                <a className="text-gray-400 hover:text-white" href="#">Servicios</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white" href="#"
                  >Casos de éxito</a
                >
              </li>
              <li>
                <a className="text-gray-400 hover:text-white" href="#"
                  >Preguntas Frecuentes</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <span className="material-icons align-middle text-lg mr-2"
                  >email</span
                >
                info@ibjobcoach.com
              </li>
              <li>
                <span className="material-icons align-middle text-lg mr-2"
                  >phone</span
                >
                +51 987 654 321
              </li>
              <li>
                <span className="material-icons align-middle text-lg mr-2"
                  >location_on</span
                >
                Av. Principal 123, Santiago de Surco, Lima, Perú
              </li>
            </ul>
          </div>
        </div>
        <div
          className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm">
            © 2023 IBGROUP SAC. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a className="text-gray-400 hover:text-white" href="#"
              ><svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  clip-rule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  fill-rule="evenodd"
                ></path></svg
            ></a>
            <a className="text-gray-400 hover:text-white" href="#"
              ><svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.727-.666 1.581-.666 2.477 0 1.61.82 3.027 2.053 3.848-.76-.025-1.474-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.39.106-.803.163-1.227.163-.3 0-.593-.028-.877-.082.593 1.85 2.307 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.79 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.092 7.14 2.092 8.57 0 13.255-7.098 13.255-13.254 0-.202-.005-.403-.014-.602.91-.658 1.7-1.475 2.323-2.41z"
                ></path></svg
            ></a>
            <a className="text-gray-400 hover:text-white" href="#"
              ><svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  clip-rule="evenodd"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"
                  fill-rule="evenodd"
                ></path></svg
            ></a>
          </div>
        </div>
      </div>
    </footer>
    )
}