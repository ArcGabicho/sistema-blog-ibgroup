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
            <div className='@container px-6 py-8'>
                <h3 className='text-center md:text-left text-2xl font-bold mx-auto px-6'>Publicaciones</h3>
                <div className='flex flex-col md:flex-row flex-wrap items-center justify-start gap-10 mx-auto px-6 py-8'>
                    {posts.map(post => (
                        <article key={post.id} className='w-[25rem] flex items-center justify-center'>
                            <Link href={`/blog/${post.slug}`} className='size-full flex flex-col items-start justify-center gap-3'>
                                <img src={post.imageUrl} className='w-full rounded-lg bg-cover bg-center bg-no-repeat' alt='Portada del Post' width={100} height={100} />
                                <h2 className='text-2xl font-bold'>{post.title}</h2>
                                <p className='text-md'>{post.content}</p>
                                <div className='flex flex-row items-center justify-center gap-4'>
                                    <img className=' size-[2.5rem] rounded-full' src={post.authorImageUrl} alt='' width={50} height={50} />
                                    <span>
                                        {post.author} • {
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
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
            <Footer />
        </section>
    )
}