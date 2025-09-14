import { X } from 'lucide-react';
import Link from 'next/link';

interface Props {
  open: boolean;
  onClose: () => void;
}

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

export default function Menu({ open, onClose }: Props) {
  if (!open) return null;

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Navegación</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Cerrar menú"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
          
          {/* Menu Items */}
          <div className="p-6">
            <nav>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className="block w-full text-left py-3 px-4 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-red-900 to-red-500 text-white py-3 rounded-lg hover:from-red-800 hover:to-red-600 transition-all duration-200 font-medium"
            >
              Cerrar Menú
            </button>
          </div>
        </div>
      </div>
    </>
  );
}