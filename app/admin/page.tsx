/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Post } from "../types/post";
import { Pencil, Trash2, Plus, Search, Filter, BarChart3, FileText, Users, Calendar, LogOut } from "lucide-react";
import CrearPost from "../components/CrearPost";
import EditarPost from "../components/EditarPost";
import { db } from "../utils/firebase";
import { collection, getDocs, deleteDoc, doc, orderBy, query, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export default function Admin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [NewPostOpen, setNewPostOpen] = useState(false);
  const [EditPostOpen, setEditPostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const loadPostsFromFirestore = async () => {
    try {
      setIsLoading(true);
      const q = query(collection(db, "posts"), orderBy("publishedAt", "desc"));
      const querySnapshot = await getDocs(q);

      const postsData: Post[] = querySnapshot.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          imageUrl: data.imageUrl,
          title: data.title,
          content: data.content,
          author: data.author,
          authorImageUrl: data.authorImageUrl,
          publishedAt: data.publishedAt?.toDate?.()?.toISOString() || data.publishedAt
        };
      });
      setPosts(postsData);
    } catch (error) {
      console.error("Error al cargar los posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPostsFromFirestore();
  }, []);

  // Filtrado y búsqueda
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    try {
      if (!confirm("¿Estás seguro de que quieres eliminar este post?")) {
        return;
      }
      await deleteDoc(doc(db, "posts", id));
      toast.success("Post eliminado correctamente");
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar el post:", error);
      toast.error("Error al eliminar el post. Por favor, inténtalo de nuevo.");
    }
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setEditPostOpen(true);
  };

  // Esta función actualiza el post en Firestore y en el estado local
  const handleUpdatePost = async (updatedPost: Post) => {
    try {
      const postRef = doc(db, "posts", updatedPost.id);
      await updateDoc(postRef, {
        title: updatedPost.title,
        content: updatedPost.content,
        imageUrl: updatedPost.imageUrl,
        author: updatedPost.author,
        authorImageUrl: updatedPost.authorImageUrl,
        publishedAt: updatedPost.publishedAt,
      });
      setPosts(prev =>
        prev.map(p => (p.id === updatedPost.id ? { ...p, ...updatedPost } : p))
      );
      toast.success("¡Post actualizado exitosamente!");
      setEditPostOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error al actualizar el post");
    }
  };

  const handleCreatePost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
    toast.success("¡Post creado exitosamente!");
  };

  // Estadísticas básicas
  const stats = {
    total: posts.length,
    published: posts.length,
    drafts: 0,
    thisMonth: posts.filter(post =>
      new Date(post.publishedAt).getMonth() === new Date().getMonth()
    ).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header mejorado */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl xl:text-4xl font-bold tracking-tight text-gray-900">
                Panel de{" "}
                <span className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                  Administración
                </span>
              </h1>
              <p className="mt-2 text-gray-600 text-lg">
                Gestiona tus publicaciones y contenido
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setNewPostOpen(true)}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-red-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5" />
                Crear Nuevo Post
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-600 to-gray-500 text-white px-6 py-3 rounded-xl hover:from-gray-700 hover:to-gray-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <LogOut className="w-5 h-5" />
                Salir del Panel
              </button>
            </div>
          </div>
        </div>
      </div>
      {NewPostOpen && (
        <CrearPost 
          open={NewPostOpen} 
          onClose={() => setNewPostOpen(false)}
          onSubmit={handleCreatePost}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Publicados</p>
                <p className="text-3xl font-bold text-green-600">{stats.published}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Borradores</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.drafts}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-xl">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Este Mes</p>
                <p className="text-3xl font-bold text-purple-600">{stats.thisMonth}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros mejorados */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar por título, autor o contenido..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="block w-full pl-10 pr-8 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 appearance-none min-w-[200px]"
              >
                <option value="all">Todos los posts</option>
                <option value="published">Publicados</option>
                <option value="draft">Borradores</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded-lg mb-3"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-1"></div>
                      <div className="h-3 bg-gray-300 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Posts grid mejorado */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
                    {post.title}
                  </h2>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={post.authorImageUrl}
                      alt={post.author}
                      className="w-10 h-10 rounded-full border-2 border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{post.author}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed">
                    {post.content}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-sm font-medium transition-all duration-200 hover:shadow-lg"
                    >
                      <Pencil className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all duration-200 hover:shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {EditPostOpen && selectedPost && (
          <EditarPost
            open={EditPostOpen}
            post={selectedPost}
            onClose={() => setEditPostOpen(false)}
            onSubmit={handleUpdatePost}
          />
        )}

        {/* Empty state mejorado */}
        {!isLoading && filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No hay posts para mostrar
              </h3>
              <p className="text-gray-600 mb-6">
                {search ? 'No se encontraron posts que coincidan con tu búsqueda.' : 'Comienza creando tu primer post.'}
              </p>
              {!search && (
                <button
                  type="button"
                  onClick={() => setNewPostOpen(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-red-600 transition-all duration-200 font-semibold"
                >
                  <Plus className="w-5 h-5" />
                  Crear tu primer post
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}