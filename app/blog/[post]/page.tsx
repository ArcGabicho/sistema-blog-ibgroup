/* eslint-disable @next/next/no-img-element */
'use client';

import { db } from '../../utils/firebase';
import { collection, getDocs } from "firebase/firestore";
import QRCode from 'react-qr-code';
import { useEffect, useState } from 'react';
import { Copy, Check, Facebook, Twitter, Linkedin } from 'lucide-react';
import React from 'react';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
};

function slugify(text: string) {
    return text
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseSpanishDate(dateValue: any) {
    if (typeof dateValue === "string") {
        const [datePart] = dateValue.split(',');
        return datePart.trim();
    }
    if (dateValue?.toDate) {
        // Firestore Timestamp
        const date = dateValue.toDate();
        return date.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }
    if (dateValue instanceof Date) {
        return dateValue.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }
    return "";
}

export default function PostPage({ params }: Props) {
  const [slug, setSlug] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;
    async function resolveSlug() {
      // Si params es una Promise, resuélvela
      const p = params && typeof params.then === 'function' ? await params : params;
      if (!cancelled) setSlug(p?.post ?? null);
    }
    resolveSlug();
    return () => { cancelled = true; };
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    async function fetchPost() {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postDoc = querySnapshot.docs.find(doc => slugify(doc.data().title) === slug);
      setPost(postDoc?.data() ?? null);
    }
    fetchPost();
  }, [slug]);

  if (!slug) return <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">Cargando...</div>;
  if (!post) return <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">Post no encontrado</div>;

  const postUrl = `https://sistema-blog-ibgroup.vercel.app/blog/${slug}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setCopied(false);
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 gap-8 lg:gap-12">
        <article className="flex-1 bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-12">
          <header className="mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 lg:mb-8">
              {post.title}
            </h1>
            <div className="w-full aspect-[16/9] sm:aspect-[2/1] lg:aspect-[16/9] overflow-hidden rounded-xl shadow-lg mb-6 lg:mb-8">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="flex items-center gap-4 p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <img
                src={post.authorImageUrl}
                alt={post.author}
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full object-cover ring-3 ring-white shadow-lg flex-shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <div className="font-semibold text-gray-900 text-base sm:text-lg lg:text-xl truncate">{post.author}</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">{parseSpanishDate(post.publishedAt)}</div>
              </div>
            </div>
          </header>
          
          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
            <div className="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-loose whitespace-pre-wrap font-light">
              {post.content}
            </div>
          </div>
        </article>
        
        <aside className='w-full lg:w-80 flex-shrink-0'>
          <div className="sticky top-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 flex flex-col items-center gap-6 sm:gap-8">
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-lg font-semibold text-gray-900">Compartir Post</h3>
                <div className="p-4 bg-white rounded-lg shadow-inner border-2 border-gray-100">
                  <QRCode value={postUrl} size={120} className="w-full h-auto" />
                </div>
              </div>
              
              <div className="w-full space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Copiar enlace
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={postUrl}
                      readOnly
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-600 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="p-3 bg-gradient-to-r from-red-900 to-red-500 text-white rounded-lg hover:from-red-800 hover:to-red-600 transition-all duration-200 shadow-lg"
                      title="Copiar enlace"
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  {copied && (
                    <p className="text-xs text-green-600 mt-2 font-medium">¡Enlace copiado!</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Compartir en redes sociales
                  </label>
                  <div className="flex justify-center gap-4">
                    <a
                      href={shareLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      title="Compartir en Facebook"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a
                      href={shareLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      title="Compartir en Twitter"
                    >
                      <Twitter className="w-6 h-6" />
                    </a>
                    <a
                      href={shareLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      title="Compartir en LinkedIn"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}