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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                Panel de{" "}
                <span className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                  Administración
                </span>
              </h1>
              <p className="mt-1 sm:mt-2 text-gray-600 text-sm sm:text-base lg:text-lg">
                Gestiona tus publicaciones y contenido
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={() => setNewPostOpen(true)}
                className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:from-red-700 hover:to-red-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Crear Nuevo</span>
                <span className="xs:hidden">Nuevo</span>
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-600 to-gray-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:from-gray-700 hover:to-gray-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Salir del Panel</span>
                <span className="sm:hidden">Salir</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Posts</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-2 sm:p-3 rounded-xl flex-shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Publicados</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">{stats.published}</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-green-200 p-2 sm:p-3 rounded-xl flex-shrink-0">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Borradores</p>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{stats.drafts}</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-2 sm:p-3 rounded-xl flex-shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Este Mes</p>
                <p className="text-2xl sm:text-3xl font-bold text-purple-600">{stats.thisMonth}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-2 sm:p-3 rounded-xl flex-shrink-0">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros mejorados */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-sm sm:text-base leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              />
            </div>
            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="block w-full pl-10 pr-8 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 appearance-none text-sm sm:text-base sm:min-w-[200px]"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
                <div className="animate-pulse">
                  <div className="bg-gray-300 h-40 sm:h-48 rounded-xl mb-4"></div>
                  <div className="h-5 sm:h-6 bg-gray-300 rounded-lg mb-3"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="h-3 sm:h-4 bg-gray-300 rounded mb-1"></div>
                      <div className="h-2 sm:h-3 bg-gray-300 rounded w-20 sm:w-24"></div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4 sm:mb-6">
                    <div className="h-2 sm:h-3 bg-gray-300 rounded"></div>
                    <div className="h-2 sm:h-3 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-2 sm:h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 sm:h-10 bg-gray-300 rounded-lg w-20 sm:w-24"></div>
                    <div className="h-8 sm:h-10 bg-gray-300 rounded-lg w-20 sm:w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Posts grid mejorado */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 group-hover:text-red-600 transition-colors duration-200 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
                    {post.title}
                  </h2>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={post.authorImageUrl}
                      alt={post.author}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{post.author}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>
                    {post.content}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-xs sm:text-sm font-medium transition-all duration-200 hover:shadow-lg"
                    >
                      <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs sm:text-sm font-medium transition-all duration-200 hover:shadow-lg"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
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
          <div className="text-center py-12 sm:py-16">
            <div className="max-w-md mx-auto px-4">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                No hay posts para mostrar
              </h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
                {search ? 'No se encontraron posts que coincidan con tu búsqueda.' : 'Comienza creando tu primer post y comparte tu contenido con el mundo.'}
              </p>
              {!search && (
                <button
                  type="button"
                  onClick={() => setNewPostOpen(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-red-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
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