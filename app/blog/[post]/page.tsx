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
    <main className="flex flex-col md:flex-row max-w-7xl mx-auto px-6 py-8 md:py-12 gap-12">
      <article className="prose prose-lg max-w-none">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl shadow-lg mb-8"
          />
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <img
              src={post.authorImageUrl}
              alt={post.author}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
            />
            <div>
              <div className="font-semibold text-gray-900 text-base">{post.author}</div>
              <div className="text-sm text-gray-600">{parseSpanishDate(post.publishedAt)}</div>
            </div>
          </div>
        </header>
        <div className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </article>
      <div className='flex flex-col mt-20 gap-6'>
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8 flex flex-col items-center gap-6">
          <QRCode value={postUrl} />
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Copiar enlace
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={postUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-600"
              />
              <button
                onClick={copyToClipboard}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="Copiar enlace"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Compartir en redes
            </label>
            <div className="flex gap-3">
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                title="Compartir en Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                title="Compartir en Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                title="Compartir en LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
               </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}