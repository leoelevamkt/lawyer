import { useState, useEffect } from 'react';
import AdminLayout from '@/react-app/components/admin/AdminLayout';
import { FileText, Users, Eye, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
}

// Mock data
const mockStats: DashboardStats = {
  totalPosts: 15,
  publishedPosts: 12,
  draftPosts: 3,
  totalViews: 8547
};

const mockRecentPosts = [
  {
    id: 1,
    title: "Reforma Trabalhista: O que mudou para as empresas",
    author: "Dr. Carlos Mendoza",
    category: "Direito Trabalhista",
    is_published: true,
    created_at: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "LGPD: Como adequar sua empresa",
    author: "Dra. Juliana Santos",
    category: "Direito Digital",
    is_published: true,
    created_at: "2024-01-10T14:30:00Z"
  },
  {
    id: 3,
    title: "Direito de Família: Guarda Compartilhada",
    author: "Dra. Marina Silva",
    category: "Direito de Família",
    is_published: false,
    created_at: "2024-01-05T09:15:00Z"
  }
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [recentPosts, setRecentPosts] = useState(mockRecentPosts);

  useEffect(() => {
    // In a real app, you would fetch data from an API
    setStats(mockStats);
    setRecentPosts(mockRecentPosts);
  }, []);

  const statCards = [
    {
      title: 'Total de Posts',
      value: stats.totalPosts,
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Posts Publicados',
      value: stats.publishedPosts,
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Rascunhos',
      value: stats.draftPosts,
      icon: FileText,
      color: 'bg-yellow-500',
      change: '+3%'
    },
    {
      title: 'Visualizações',
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: 'bg-purple-500',
      change: '+15%'
    }
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-sm text-green-600 mt-1">{card.change} vs mês anterior</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Posts Recentes</h2>
          </div>
          <div className="p-6">
            {recentPosts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhum post encontrado</p>
            ) : (
              <div className="space-y-4">
                {recentPosts.map((post: any) => (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{post.title}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">{post.author}</span>
                        <span className="text-sm text-gray-500">{post.category}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          post.is_published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.is_published ? 'Publicado' : 'Rascunho'}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/blog"
              className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-600 font-medium">Gerenciar Blog</span>
            </a>
            <a
              href="/admin/settings"
              className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <Users className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-600 font-medium">Configurações</span>
            </a>
            <a
              href="/"
              target="_blank"
              className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <Eye className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-purple-600 font-medium">Ver Site</span>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}