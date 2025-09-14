/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import type { Post } from '../types/post';
import { Search  } from 'lucide-react';
import { db } from '../utils/firebase';
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from 'next/link';

type BlogPost = Post & { slug: string };

function slugify(text: string) {
    return text
        .toString()
        .normalize("NFD") // Quita acentos
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // Elimina caracteres no válidos
        .replace(/\s+/g, "-")         // Reemplaza espacios por guiones
        .replace(/-+/g, "-");         // Quita guiones repetidos
}

function parseSpanishDate(dateStr: string) {
    // Extrae solo la parte antes de la coma
    const [datePart] = dateStr.split(',');
    return datePart.trim();
}

export default function BlogPage(){
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        async function fetchPosts() {
            const querySnapshot = await getDocs(collection(db, "posts"));
            const postsData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                let publishedAt: string;
                if (data.publishedAt?.toDate) {
                    publishedAt = data.publishedAt.toDate().toLocaleString();
                } else {
                    publishedAt = data.publishedAt || "";
                }
                return {
                    id: doc.id,
                    slug: slugify(data.title), // <-- genera el slug aquí
                    imageUrl: data.imageUrl,
                    title: data.title,
                    content: data.content,
                    author: data.author,
                    authorImageUrl: data.authorImageUrl,
                    publishedAt,
                } as BlogPost;
            });
            setPosts(postsData);
        }
        fetchPosts();
    }, []);

    return (
        <section className='w-full h-screen'>
            <Navbar />
            <header className='@container'>
                <div className="px-6 pt-8 @[480px]:px-6 @[480px]:pt-8">
                    <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-lg items-start justify-end px-4 pb-10 @[480px]:px-10" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("/assets/portada.jpg")' }}>
                        <div className="flex flex-col gap-2 text-left">
                            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                                Publicaciones y Noticias de Outplacement
                            </h1>
                            <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                                Ofrecemos un servicio personalizado para cada cliente o negocio con el fin de que encuentren las mejores oportunidades de outplacement.
                            </h2>
                        </div>
                        <div className="flex gap-2 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg transition duration-500 ease-in-out h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#e9e9e9] hover:bg-[#d3d3d3] text-black hover:text-slate-900 text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                            <input type="text" className='flex-1 border-none outline-none bg-transparent text-black placeholder:text-slate-400' placeholder='Buscar...' />
                            <Search />
                        </div>
                    </div>
                </div>
            </header>
            <div className='w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12'>
                <div className='max-w-7xl mx-auto'>
                    <h3 className='text-center lg:text-left text-2xl lg:text-3xl font-bold mb-8 lg:mb-12 text-gray-900'>Publicaciones</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
                        {posts.map(post => (
                            <article key={post.id} className='w-full flex flex-col h-full'>
                                <Link href={`/blog/${post.slug}`} className='w-full flex flex-col gap-4 lg:gap-6 p-6 lg:p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-[1.02] h-full border border-gray-100'>
                                    <div className='w-full aspect-[4/3] overflow-hidden rounded-lg'>
                                        <img src={post.imageUrl} className='w-full h-full object-cover transition-transform duration-300 hover:scale-110' alt='Portada del Post' />
                                    </div>
                                    <div className='flex flex-col flex-grow gap-3 lg:gap-4'>
                                        <h2 className='text-xl lg:text-2xl font-bold text-gray-900 leading-tight overflow-hidden' style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>{post.title}</h2>
                                        <p className='text-gray-600 text-sm lg:text-base flex-grow overflow-hidden leading-relaxed' style={{display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical'}}>{post.content}</p>
                                    </div>
                                    <div className='flex items-center gap-3 lg:gap-4 pt-4 lg:pt-6 mt-auto border-t border-gray-100'>
                                        <img className='w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover flex-shrink-0' src={post.authorImageUrl} alt='' />
                                        <div className='flex flex-col min-w-0 flex-1'>
                                            <span className='text-sm lg:text-base font-semibold text-gray-900 truncate'>{post.author}</span>
                                            <span className='text-xs lg:text-sm text-gray-500 truncate'>
                                            {
                                                (() => {
                                                    if (typeof post.publishedAt === "string") {
                                                        // Si es un string en español, extrae solo la fecha
                                                        return parseSpanishDate(post.publishedAt);
                                                    }
                                                    // Si es Date, formatea normalmente
                                                    return post.publishedAt.toLocaleDateString("es-ES", {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric"
                                                    });
                                                })()
                                            }
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}