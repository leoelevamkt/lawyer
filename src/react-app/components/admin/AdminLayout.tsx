import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router';
import { Scale, LayoutDashboard, FileText, Settings, LogOut, Menu, X } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

// Mock user data
const mockUser: User = {
  id: 1,
  username: 'admin',
  email: 'admin@olympusadvogados.com.br',
  role: 'Administrador'
};

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is logged in (mock implementation)
        const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
        
        if (isLoggedIn) {
          setUser(mockUser);
        } else {
          navigate('/admin');
        }
      } catch (error) {
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('admin_logged_in');
      navigate('/admin');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/admin');
    }
  };

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/blog', label: 'Blog', icon: FileText },
    { href: '/admin/settings', label: 'Configurações', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-gray-800">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-2 rounded-lg">
              <Scale className="w-6 h-6 text-gray-900" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">OLYMPUS</h1>
              <p className="text-xs text-yellow-500 uppercase tracking-wide">Admin</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${
                location.pathname === item.href ? 'bg-gray-800 text-white border-r-2 border-yellow-500' : ''
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <p className="text-white text-sm font-medium">{user.username}</p>
            <p className="text-gray-400 text-xs">{user.email}</p>
            <p className="text-yellow-500 text-xs uppercase mt-1">{user.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors rounded-lg"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sair
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            </div>
            <Link
              to="/"
              target="_blank"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Ver Site →
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}