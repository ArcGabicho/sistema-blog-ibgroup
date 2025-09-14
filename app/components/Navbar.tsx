"use client";

import { Menu } from 'lucide-react';
import { useState } from "react";
import FormularioContacto from "./FormularioContacto";
import Image from "next/image";
import Link from "next/link";

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: "Inicio", href: "/#inicio" },
    { label: "Nosotros", href: "/#nosotros" },
    { label: "Servicios", href: "/#servicios" },
    { label: "Preguntas", href: "/#preguntas" },
    { label: "Blog", href: "/#blog" },
];

export default function Navbar(){
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <nav className='flex items-center justify-between w-full px-6 py-6 border-b-neutral-800 shadow-2xl'>
            <div className="flex-shrink-0">
                <Image 
                    src="/assets/logo_empresa.webp" 
                    alt="Logo de la empresa" 
                    width={300} 
                    height={50} 
                    className="w-auto h-8 sm:h-10 lg:h-12 max-w-[180px] sm:max-w-[220px] lg:max-w-[300px]"
                />
            </div>
            <div className='flex items-center gap-2 sm:gap-4'>
                <ul className='hidden md:flex text-lg gap-4'>
                    {navItems.map((item) => (
                        <li key={item.href} className="relative group">
                            <Link href={item.href} className="transition-colors">{item.label}</Link>
                            <span className="block absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-red-900 to-red-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    ))}
                </ul>
                <button className='flex md:hidden p-2'>
                    <Menu size={20} />
                </button>
                <button onClick={() => setModalOpen(true)} className='cursor-pointer bg-gradient-to-r from-red-900 to-red-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:from-red-800 hover:to-red-500 transition-all text-sm sm:text-base whitespace-nowrap'>
                    Contacto
                </button>
            </div>
            {modalOpen && (
                <FormularioContacto open={modalOpen} onClose={() => setModalOpen(false)} />
            )}
        </nav>
    )
}