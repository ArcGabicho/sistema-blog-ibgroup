"use client";

import { useState } from "react";
import { X, Upload, User, FileText, Image as ImageIcon } from "lucide-react";
import { Post } from "../types/post";
import { db } from "../utils/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit?: (post: Post) => void;
}

export default function CrearPost({ open, onClose, onSubmit }: Props) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    imageUrl: "",
    authorImageUrl: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "El título es obligatorio";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "El título debe tener al menos 3 caracteres";
    }

    if (!formData.content.trim()) {
      newErrors.content = "El contenido es obligatorio";
    } else if (formData.content.trim().length < 10) {
      newErrors.content = "El contenido debe tener al menos 10 caracteres";
    }

    if (!formData.author.trim()) {
      newErrors.author = "El autor es obligatorio";
    } else if (formData.author.trim().length < 2) {
      newErrors.author = "El nombre del autor debe tener al menos 2 caracteres";
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "La URL de la imagen es obligatoria";
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = "La URL de la imagen no es válida";
    }

    if (!formData.authorImageUrl.trim()) {
      newErrors.authorImageUrl = "La URL de la imagen del autor es obligatoria";
    } else if (!isValidUrl(formData.authorImageUrl)) {
      newErrors.authorImageUrl = "La URL de la imagen del autor no es válida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const savePostToFirestore = async (postData: Omit<Post, 'id'>): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        ...postData,
        publishedAt: Timestamp.fromDate(new Date())
      });
      return docRef.id;
    } catch (error) {
      console.error("Error al guardar el post en Firestore:", error);
      throw new Error("Error al guardar el post en la base de datos");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Crear el objeto Post
      const newPostData: Omit<Post, 'id'> = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        author: formData.author.trim(),
        imageUrl: formData.imageUrl.trim(),
        authorImageUrl: formData.authorImageUrl.trim(),
        publishedAt: new Date().toISOString()
      };

      // Guardar en Firestore
      const postId = await savePostToFirestore(newPostData);
      
      // Crear el post completo con el ID
      const completedPost: Post = {
        ...newPostData,
        id: postId
      };
      
      if (onSubmit) {
        onSubmit(completedPost);
      }
    
      toast.success("¡Post creado exitosamente!");
      
      // Resetear formulario
      setFormData({
        title: "",
        content: "",
        author: "",
        imageUrl: "",
        authorImageUrl: ""
      });
      
      onClose();
    } catch (error) {
      console.error('Error al crear el post:', error);
      toast.error("Error al crear el post. Por favor, inténtalo de nuevo.");
      // Mostrar error al usuario
      setErrors({ general: "Error al crear el post. Por favor, inténtalo de nuevo." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-100 bg-white/5 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Crear Nuevo Post
              </h2>
              <p className="text-gray-600 mt-1">
                Completa la información para crear tu publicación
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Error general */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {errors.general}
              </div>
            )}

            {/* Título */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4" />
                Título del Post
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Escribe un título atractivo..."
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.title 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
                }`}
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Contenido */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4" />
                Contenido
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Escribe el contenido de tu post..."
                rows={6}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.content 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
                }`}
                disabled={isSubmitting}
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
              )}
            </div>

            {/* Autor */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4" />
                Autor
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Nombre del autor..."
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.author 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
                }`}
                disabled={isSubmitting}
              />
              {errors.author && (
                <p className="text-red-500 text-sm mt-1">{errors.author}</p>
              )}
            </div>

            {/* URL de imagen del post */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <ImageIcon className="w-4 h-4" />
                URL de la Imagen Principal
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.imageUrl 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
                }`}
                disabled={isSubmitting}
              />
              {errors.imageUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
              )}
            </div>

            {/* URL de imagen del autor */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4" />
                URL de la Imagen del Autor
              </label>
              <input
                type="url"
                name="authorImageUrl"
                value={formData.authorImageUrl}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/avatar.jpg"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.authorImageUrl 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
                }`}
                disabled={isSubmitting}
              />
              {errors.authorImageUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.authorImageUrl}</p>
              )}
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl hover:from-red-700 hover:to-red-600 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Guardando en Firebase...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Crear Post
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}