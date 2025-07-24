import { Hono } from "hono";
import { cors } from "hono/cors";
import {
  exchangeCodeForSessionToken,
  getOAuthRedirectUrl,
  authMiddleware,
  deleteSession,
  MOCHA_SESSION_TOKEN_COOKIE_NAME,
} from "@getmocha/users-service/backend";
import { getCookie, setCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono<{ Bindings: Env }>();

// CORS middleware
app.use("*", cors({
  origin: ["http://localhost:5173", "https://*.pages.dev"],
  credentials: true,
}));

// Auth middleware to check if user is admin
const adminMiddleware = async (c: any, next: any) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  // Check if user is admin - allow any authenticated user as admin for now
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM admin_users WHERE (mocha_user_id = ? OR email = ?) AND is_active = 1"
  ).bind(user.id, user.email).all();

  // If no admin record exists for this user, create one automatically
  if (results.length === 0) {
    await c.env.DB.prepare(`
      INSERT INTO admin_users (mocha_user_id, email, role, is_active)
      VALUES (?, ?, 'admin', 1)
    `).bind(user.id, user.email).run();
  }

  await next();
};

// Username/Password Login
app.post("/api/login", zValidator("json", z.object({
  username: z.string(),
  password: z.string()
})), async (c) => {
  const { username, password } = c.req.valid("json");

  const { results } = await c.env.DB.prepare(
    "SELECT * FROM users WHERE username = ? AND password = ? AND is_active = 1"
  ).bind(username, password).all();

  if (results.length === 0) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const user = results[0] as any;
  
  // Create a simple session token
  const sessionData = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    loginTime: Date.now()
  };
  
  const sessionToken = btoa(JSON.stringify(sessionData));
  
  setCookie(c, 'ADMIN_SESSION', sessionToken, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60, // 24 hours
  });

  return c.json({ success: true, user: { ...user, password: undefined } });
});

// Simple auth middleware for username/password
const simpleAuthMiddleware = async (c: any, next: any) => {
  const sessionToken = getCookie(c, 'ADMIN_SESSION');
  
  if (!sessionToken) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const sessionData = JSON.parse(atob(sessionToken));
    
    // Check if session is not expired (24 hours)
    if (Date.now() - sessionData.loginTime > 24 * 60 * 60 * 1000) {
      return c.json({ error: "Session expired" }, 401);
    }
    
    c.set("user", sessionData);
    await next();
  } catch (error) {
    return c.json({ error: "Invalid session" }, 401);
  }
};

app.get("/api/users/session", async (c) => {
  const sessionToken = getCookie(c, 'ADMIN_SESSION');
  
  if (!sessionToken) {
    return c.json({ error: "No session" }, 401);
  }

  try {
    const sessionData = JSON.parse(atob(sessionToken));
    
    // Check if session is not expired
    if (Date.now() - sessionData.loginTime > 24 * 60 * 60 * 1000) {
      return c.json({ error: "Session expired" }, 401);
    }
    
    return c.json({
      ...sessionData,
      isAdmin: true,
      adminRole: sessionData.role
    });
  } catch (error) {
    return c.json({ error: "Invalid session" }, 401);
  }
});

app.post('/api/logout-simple', async (c) => {
  setCookie(c, 'ADMIN_SESSION', '', {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: false,
    maxAge: 0,
  });

  return c.json({ success: true });
});

// Google Maps Reviews API
app.get("/api/google-reviews", async (c) => {
  // Mock response - in production you'd use Google Places API with place_id
  const mockReviews = {
    rating: 4.8,
    user_ratings_total: 127,
    reviews: [
      {
        author_name: "Maria Silva",
        rating: 5,
        text: "Excelente escritório! Dr. Ricardo e sua equipe resolveram meu caso empresarial com total profissionalismo. Recomendo sem hesitar.",
        time: 1705334400,
        profile_photo_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
      },
      {
        author_name: "João Santos",
        rating: 5,
        text: "Atendimento excepcional! A Dra. Marina me ajudou com questões familiares de forma muito humana e eficiente. Muito grato!",
        time: 1705248000,
        profile_photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
      },
      {
        author_name: "Ana Costa",
        rating: 5,
        text: "Profissionais competentes e dedicados. Resolveram minha questão trabalhista rapidamente. Escritório de confiança!",
        time: 1705075200,
        profile_photo_url: "https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
      },
      {
        author_name: "Carlos Mendes",
        rating: 4,
        text: "Ótimo atendimento e agilidade na resolução do caso. Equipe muito preparada e transparente em todo o processo.",
        time: 1704816000,
        profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
      },
      {
        author_name: "Luciana Oliveira",
        rating: 5,
        text: "Recomendo fortemente! Conseguiram resolver minha questão imobiliária de forma brilhante. Muito obrigada!",
        time: 1704643200,
        profile_photo_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
      },
      {
        author_name: "Rafael Lima",
        rating: 5,
        text: "Escritório sério e confiável. Dr. Carlos me auxiliou em questões previdenciárias com total competência.",
        time: 1704470400,
        profile_photo_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
      }
    ]
  };

  return c.json(mockReviews);
});

// Auth Routes
app.get('/api/oauth/google/redirect_url', async (c) => {
  const redirectUrl = await getOAuthRedirectUrl('google', {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  return c.json({ redirectUrl }, 200);
});

app.post("/api/sessions", zValidator("json", z.object({
  code: z.string()
})), async (c) => {
  const { code } = c.req.valid("json");

  const sessionToken = await exchangeCodeForSessionToken(code, {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 60 * 24 * 60 * 60, // 60 days
  });

  return c.json({ success: true }, 200);
});

app.get("/api/users/me", authMiddleware, async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }
  
  // Check if user is admin - allow any authenticated user as admin for now
  let { results } = await c.env.DB.prepare(
    "SELECT * FROM admin_users WHERE (mocha_user_id = ? OR email = ?) AND is_active = 1"
  ).bind(user.id, user.email).all();

  // If no admin record exists for this user, create one automatically
  if (results.length === 0) {
    await c.env.DB.prepare(`
      INSERT INTO admin_users (mocha_user_id, email, role, is_active)
      VALUES (?, ?, 'admin', 1)
    `).bind(user.id, user.email).run();
    
    // Re-fetch the results after insertion
    const newResults = await c.env.DB.prepare(
      "SELECT * FROM admin_users WHERE mocha_user_id = ? AND is_active = 1"
    ).bind(user.id).all();
    results = newResults.results;
  }

  return c.json({
    ...user,
    isAdmin: results.length > 0,
    adminRole: results.length > 0 ? (results[0] as any).role : null
  });
});

app.get('/api/logout', async (c) => {
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);

  if (typeof sessionToken === 'string') {
    await deleteSession(sessionToken, {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });
  }

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    sameSite: 'none',
    secure: true,
    maxAge: 0,
  });

  return c.json({ success: true }, 200);
});

// Blog Posts API
app.get("/api/blog/posts", async (c) => {
  const page = parseInt(c.req.query("page") || "1");
  const limit = parseInt(c.req.query("limit") || "10");
  const category = c.req.query("category");
  const offset = (page - 1) * limit;

  let query = "SELECT * FROM blog_posts WHERE is_published = 1";
  const params: any[] = [];

  if (category && category !== "all") {
    query += " AND category = ?";
    params.push(category);
  }

  query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
  params.push(limit, offset);

  const { results } = await c.env.DB.prepare(query).bind(...params as any[]).all();
  
  // Parse tags JSON
  const posts = results.map((post: any) => ({
    ...post,
    tags: post.tags ? JSON.parse(post.tags) : []
  }));

  return c.json({ posts });
});

app.get("/api/blog/posts/:slug", async (c) => {
  const slug = c.req.param("slug");
  
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1"
  ).bind(slug).all();

  if (results.length === 0) {
    return c.json({ error: "Post not found" }, 404);
  }

  const postData = results[0] as any;
  const post = {
    ...postData,
    tags: postData.tags ? JSON.parse(postData.tags) : []
  };

  return c.json({ post });
});

app.get("/api/blog/categories", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT DISTINCT category FROM blog_posts WHERE is_published = 1 ORDER BY category"
  ).all();

  const categories = results.map((row: any) => row.category);
  return c.json({ categories });
});

// Admin Blog Posts API
app.get("/api/admin/blog/posts", simpleAuthMiddleware, async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM blog_posts ORDER BY created_at DESC"
  ).all();

  const posts = results.map((post: any) => ({
    ...post,
    tags: post.tags ? JSON.parse(post.tags) : []
  }));

  return c.json({ posts });
});

app.post("/api/admin/blog/posts", simpleAuthMiddleware, zValidator("json", z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional().default(""),
  content: z.string().min(1),
  author: z.string().min(1),
  category: z.string().min(1),
  image_url: z.string().optional().default(""),
  tags: z.array(z.string()).optional().default([]),
  is_published: z.boolean().optional().default(true),
  read_time: z.string().optional().default("")
})), async (c) => {
  try {
    const data = c.req.valid("json");
    
    console.log('Creating post with data:', JSON.stringify(data));
    
    const { results } = await c.env.DB.prepare(`
      INSERT INTO blog_posts (title, slug, excerpt, content, author, category, image_url, tags, is_published, read_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `).bind(
      data.title,
      data.slug,
      data.excerpt || "",
      data.content,
      data.author,
      data.category,
      data.image_url || "",
      JSON.stringify(data.tags || []),
      data.is_published ? 1 : 0,
      data.read_time || ""
    ).all();

    const postData = results[0] as any;
    const post = {
      ...postData,
      tags: postData.tags ? JSON.parse(postData.tags) : [],
      is_published: postData.is_published === 1
    };

    return c.json({ post }, 201);
  } catch (error) {
    console.error('Error creating blog post:', error);
    return c.json({ error: "Failed to create post" }, 500);
  }
});

app.put("/api/admin/blog/posts/:id", simpleAuthMiddleware, zValidator("json", z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional().default(""),
  content: z.string().min(1),
  author: z.string().min(1),
  category: z.string().min(1),
  image_url: z.string().optional().default(""),
  tags: z.array(z.string()).optional().default([]),
  is_published: z.boolean().optional().default(true),
  read_time: z.string().optional().default("")
})), async (c) => {
  try {
    const id = c.req.param("id");
    const data = c.req.valid("json");

    console.log('Updating post with data:', JSON.stringify(data));

    await c.env.DB.prepare(`
      UPDATE blog_posts 
      SET title = ?, slug = ?, excerpt = ?, content = ?, author = ?, category = ?, 
          image_url = ?, tags = ?, is_published = ?, read_time = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      data.title,
      data.slug,
      data.excerpt || "",
      data.content,
      data.author,
      data.category,
      data.image_url || "",
      JSON.stringify(data.tags || []),
      data.is_published ? 1 : 0,
      data.read_time || "",
      id
    ).run();

    const { results } = await c.env.DB.prepare(
      "SELECT * FROM blog_posts WHERE id = ?"
    ).bind(id).all();

    if (results.length === 0) {
      return c.json({ error: "Post not found" }, 404);
    }

    const postData = results[0] as any;
    const post = {
      ...postData,
      tags: postData.tags ? JSON.parse(postData.tags) : [],
      is_published: postData.is_published === 1
    };

    return c.json({ post });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return c.json({ error: "Failed to update post" }, 500);
  }
});

app.delete("/api/admin/blog/posts/:id", simpleAuthMiddleware, async (c) => {
  const id = c.req.param("id");
  
  await c.env.DB.prepare("DELETE FROM blog_posts WHERE id = ?").bind(id).run();
  
  return c.json({ success: true });
});

// Site Settings API
app.get("/api/settings", async (c) => {
  const { results } = await c.env.DB.prepare("SELECT * FROM site_settings").all();
  
  const settings: any = {};
  results.forEach((setting: any) => {
    settings[setting.key] = {
      value: setting.value,
      type: setting.type
    };
  });

  return c.json({ settings });
});

app.put("/api/admin/settings", simpleAuthMiddleware, zValidator("json", z.object({
  settings: z.record(z.object({
    value: z.string(),
    type: z.string().optional()
  }))
})), async (c) => {
  const { settings } = c.req.valid("json");

  for (const [key, data] of Object.entries(settings)) {
    await c.env.DB.prepare(`
      INSERT OR REPLACE INTO site_settings (key, value, type, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(key, data.value, data.type || 'text').run();
  }

  return c.json({ success: true });
});

// Admin Users Management
app.post("/api/admin/users", authMiddleware, adminMiddleware, zValidator("json", z.object({
  email: z.string().email(),
  role: z.enum(["admin", "super_admin"]).optional()
})), async (c) => {
  const { email, role = "admin" } = c.req.valid("json");

  // For now, we'll create a placeholder entry - in production you'd need to handle user lookup
  await c.env.DB.prepare(`
    INSERT INTO admin_users (mocha_user_id, email, role)
    VALUES (?, ?, ?)
  `).bind(`placeholder_${Date.now()}`, email, role).run();

  return c.json({ success: true });
});

// Export the app as default and also provide the fetch handler
export default {
  fetch: app.fetch.bind(app),
};
