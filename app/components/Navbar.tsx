import { Building } from 'lucide-react';
import { Menu } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

export default function Navbar(){
    return (
        <nav className='flex items-center justify-between w-full px-8 py-6 border-b-neutral-800 shadow-2xl'>
            <Image src={"/assets/logo_empresa.webp"} alt="Logo de la empresa" width={300} height={50} />
            <div className='flex items-center justify-between gap-4'>
                <ul className='hidden md:flex text-lg gap-4'>
                    <li><Link href="#inicio">Inicio</Link></li>
                    <li><Link href="#nosotros">Nosotros</Link></li>
                    <li><Link href="#servicios">Servicios</Link></li>
                    <li><Link href="#preguntas">Preguntas</Link></li>
                    <li><Link href="#blog">Blog</Link></li>
                </ul>
                <button className='flex md:hidden'>
                    <Menu />
                </button>
                <button className='cursor-pointer bg-gradient-to-r from-purple-900 to-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors'>
                    Contacto
                </button>
                <button className='cursor-pointer border-4 p-[5px] rounded-md'>
                    <Building />
                </button>
            </div>
        </nav>
    )
}