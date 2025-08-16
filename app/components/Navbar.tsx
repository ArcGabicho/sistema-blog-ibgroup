import { Building, Menu } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: "Inicio", href: "#inicio" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Servicios", href: "#servicios" },
    { label: "Preguntas", href: "#preguntas" },
    { label: "Blog", href: "#blog" },
];

export default function Navbar(){
    return (
        <nav className='flex items-center justify-between w-full px-8 py-6 border-b-neutral-800 shadow-2xl'>
            <Image src={"/assets/logo_empresa.webp"} alt="Logo de la empresa" width={300} height={50} />
            <div className='flex items-center justify-between gap-4'>
                <ul className='hidden md:flex text-lg gap-4'>
                    {navItems.map((item) => (
                        <li key={item.href} className="relative group">
                            <Link href={item.href} className="transition-colors">{item.label}</Link>
                            <span className="block absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-red-900 to-red-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    ))}
                </ul>
                <button className='flex md:hidden'>
                    <Menu />
                </button>
                <button className='cursor-pointer bg-gradient-to-r from-red-900 to-red-500 text-white px-4 py-2 rounded-md hover:from-red-800 hover:to-red-500 transition-all'>
                    Contacto
                </button>
                <button className='cursor-pointer border-4 p-[5px] rounded-md'>
                    <Building />
                </button>
            </div>
        </nav>
    )
}