import { useState, useEffect } from 'react';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image_url: string;
  tags: string[];
  is_published: boolean;
  read_time: string;
  created_at: string;
  updated_at: string;
}

// Mock data for development
const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: "Reforma Trabalhista: O que mudou para as empresas",
    slug: "reforma-trabalhista-mudancas-empresas",
    excerpt: "Entenda as principais mudanças da reforma trabalhista e como elas impactam as relações de trabalho nas empresas.",
    content: `## Introdução

A reforma trabalhista trouxe mudanças significativas para as relações de trabalho no Brasil. Neste artigo, vamos abordar os principais pontos que as empresas precisam conhecer.

## Principais Mudanças

### 1. Negociação Coletiva
A reforma fortaleceu a negociação coletiva, permitindo que acordos entre sindicatos e empresas prevaleçam sobre a legislação em diversos pontos.

### 2. Jornada de Trabalho
Foram criadas novas modalidades de jornada, como o trabalho intermitente e a jornada 12x36.

### 3. Férias
As férias podem ser divididas em até três períodos, sendo que um deles não pode ser inferior a 14 dias.

## Conclusão

É fundamental que as empresas se adaptem às novas regras para evitar problemas jurídicos e garantir o cumprimento da legislação.`,
    author: "Dr. Carlos Mendoza",
    category: "Direito Trabalhista",
    image_url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Reforma Trabalhista", "Empresas", "Legislação"],
    is_published: true,
    read_time: "5 min",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "LGPD: Como adequar sua empresa à Lei Geral de Proteção de Dados",
    slug: "lgpd-adequacao-empresa-protecao-dados",
    excerpt: "Guia completo para adequar sua empresa à LGPD e evitar multas e sanções.",
    content: `## O que é a LGPD?

A Lei Geral de Proteção de Dados (LGPD) é a legislação brasileira que regula o tratamento de dados pessoais.

## Principais Obrigações

### 1. Consentimento
É necessário obter consentimento explícito para o tratamento de dados pessoais.

### 2. Transparência
As empresas devem ser transparentes sobre como coletam e usam os dados.

### 3. Segurança
Implementar medidas de segurança adequadas para proteger os dados.

## Penalidades

O descumprimento da LGPD pode resultar em multas de até 2% do faturamento da empresa.`,
    author: "Dra. Juliana Santos",
    category: "Direito Digital",
    image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["LGPD", "Proteção de Dados", "Compliance"],
    is_published: true,
    read_time: "7 min",
    created_at: "2024-01-10T14:30:00Z",
    updated_at: "2024-01-10T14:30:00Z"
  },
  {
    id: 3,
    title: "Direito de Família: Guarda Compartilhada vs Guarda Unilateral",
    slug: "direito-familia-guarda-compartilhada-unilateral",
    excerpt: "Entenda as diferenças entre guarda compartilhada e unilateral e quando cada uma é aplicada.",
    content: `## Tipos de Guarda

No direito de família brasileiro, existem diferentes tipos de guarda que podem ser estabelecidos.

### Guarda Compartilhada
Na guarda compartilhada, ambos os pais têm responsabilidades e direitos iguais sobre os filhos.

### Guarda Unilateral
Na guarda unilateral, apenas um dos pais detém a guarda, enquanto o outro tem direito de visitas.

## Quando é aplicada cada tipo?

A guarda compartilhada é a regra, sendo aplicada sempre que possível. A unilateral é exceção.`,
    author: "Dra. Marina Silva",
    category: "Direito de Família",
    image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Guarda", "Família", "Filhos"],
    is_published: true,
    read_time: "4 min",
    created_at: "2024-01-05T09:15:00Z",
    updated_at: "2024-01-05T09:15:00Z"
  }
];

const mockCategories = ["Direito Trabalhista", "Direito Digital", "Direito de Família", "Direito Empresarial"];

export function useBlogPosts(category?: string) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredPosts = mockPosts;
        if (category && category !== 'all') {
          filteredPosts = mockPosts.filter(post => post.category === category);
        }
        
        setPosts(filteredPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  return { posts, loading, error };
}

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundPost = mockPosts.find(p => p.slug === slug);
        setPost(foundPost || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return { post, loading, error };
}

export function useBlogCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        setCategories(mockCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
}