"use client"

import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Youtube, Facebook } from "lucide-react"
import Image from "next/image";

const recursos = [
  { label: "Web Oficial", href: "https://iboutplacement.com/" },
  { label: "Blog", href: "/blog" },
  { label: "Panel", href: "/login" },
];

const explorar = [
  { label: "IBMaximiza", href: "https://corpibgroup.com/ibmaximiz/" },
  { label: "Estadisticas", href: "/estadisticas" },
  { label: "Calculadora", href: "/calculadora" },
];

const contacto = [
  {
    icon: Mail,
    text: "outplacement@corpibgroup.com",
  },
  {
    icon: Phone,
    text: "+51 996 426 727",
  },
  {
    icon: MapPin,
    text: "Av. Circunvalación Club Golf los Incas, Torre 3 Oficina 602B",
  },
];

const redes = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/IBOutplacementOficial/",
    label: "Facebook",
  },
  {
    icon: Twitter,
    href: "https://x.com/ib_outplacement",
    label: "Twitter",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/iboutplacement/",
    label: "Instagram",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/iboutplacement/",
    label: "LinkedIn",
  },
  {
    icon: Youtube,
    href: "https://www.youtube.com/channel/UC9NkcDwe6-P37cHXkn1XBcA",
    label: "YouTube",
  },
];

export default function Footer(){
    return (
        <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Image
                alt="IBJOBCOACH Logo"
                className="h-10 mb-4"
                src={"/assets/logo_empresa.webp"}
                width={200}
                height={150}
              />
              <p className="text-gray-400">
                Transformando carreras, impulsando el éxito.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2">
                {recursos.map((item) => (
                  <li key={item.label}>
                    <a className="text-gray-400 hover:text-white" href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Explorar</h3>
              <ul className="space-y-2">
                {explorar.map((item) => (
                  <li key={item.label}>
                    <a className="text-gray-400 hover:text-white" href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-400">
                {contacto.map((item, idx) => (
                  <li key={idx}>
                    <item.icon className="inline align-middle text-lg mr-2" size={18} />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="mt-12 mr-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-gray-500 text-sm">
              © 2025 IBGROUP S.A.C. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {redes.map((item) => (
                <a
                  key={item.label}
                  className="text-gray-400 hover:text-white"
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
    </footer>
    )
}