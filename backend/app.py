from flask import Flask, render_template, request, jsonify, redirect, url_for, session, flash
from flask_cors import CORS
import sqlite3
import hashlib
import datetime
import json
import os
from functools import wraps

app = Flask(__name__)
app.secret_key = 'sportscolab_secret_key_2025'
CORS(app)

# Configuración de la base de datos
DATABASE = 'sportscolab.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Inicializar la base de datos con las tablas necesarias"""
    conn = get_db_connection()
    
    # Tabla de usuarios/administradores
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'columnist',
            full_name TEXT,
            bio TEXT,
            avatar_url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_active BOOLEAN DEFAULT 1
        )
    ''')
    
    # Tabla de artículos/posts del blog
    conn.execute('''
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            excerpt TEXT,
            author_id INTEGER,
            category TEXT,
            tags TEXT,
            featured_image TEXT,
            status TEXT DEFAULT 'draft',
            views INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            published_at TIMESTAMP,
            FOREIGN KEY (author_id) REFERENCES users (id)
        )
    ''')
    
    # Tabla de productos de la tienda
    conn.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price DECIMAL(10,2),
            currency TEXT DEFAULT 'CLP',
            image_url TEXT,
            category TEXT,
            stock INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Tabla de pedidos
    conn.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            customer_email TEXT NOT NULL,
            customer_phone TEXT,
            total_amount DECIMAL(10,2),
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Tabla de métricas del sitio web
    conn.execute('''
        CREATE TABLE IF NOT EXISTS analytics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            page_url TEXT,
            visitor_ip TEXT,
            user_agent TEXT,
            referrer TEXT,
            session_id TEXT,
            event_type TEXT,
            event_data TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Tabla de testimonios
    conn.execute('''
        CREATE TABLE IF NOT EXISTS testimonials (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            position TEXT,
            company TEXT,
            testimonial TEXT NOT NULL,
            rating INTEGER DEFAULT 5,
            image_url TEXT,
            is_featured BOOLEAN DEFAULT 0,
            is_active BOOLEAN DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Insertar usuario administrador por defecto
    admin_password = hashlib.sha256('admin123'.encode()).hexdigest()
    conn.execute('''
        INSERT OR IGNORE INTO users (username, email, password_hash, role, full_name)
        VALUES (?, ?, ?, ?, ?)
    ''', ('admin', 'admin@sportscolab.co', admin_password, 'admin', 'Administrador SportsCoLab'))
    
    # Insertar algunos productos de ejemplo
    products_data = [
        ('Camiseta SportsCoLab FC', 'Camiseta oficial del equipo SportsCoLab FC, diseñada para la comunidad innovadora.', 25000, 'CLP', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', 'Ropa', 50),
        ('Libro: Tejiendo Mimbres', 'Capítulos 1 y 4 del libro sobre deporte responsable y sostenible.', 15000, 'CLP', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop', 'Libros', 100),
        ('Acceso Diplomado', 'Acceso completo al Diplomado en Innovación Deportiva con la Universidad de los Lagos.', 150000, 'CLP', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=300&fit=crop', 'Educación', 25)
    ]
    
    for product in products_data:
        conn.execute('''
            INSERT OR IGNORE INTO products (name, description, price, currency, image_url, category, stock)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', product)
    
    # Insertar testimonios de ejemplo
    testimonials_data = [
        ('María González', 'Directora de Innovación', 'Federación Chilena de Fútbol', 'SportsCoLab transformó nuestra visión sobre la innovación en el deporte. Su metodología xCO nos permitió desarrollar soluciones que realmente impactan a nuestros atletas y comunidad.', 5, '', 1),
        ('Carlos Mendoza', 'CEO', 'SportsTech Startup', 'El Congreso SportsTech Latam es el evento más importante de la región. Gracias a SportsCoLab pudimos conectar con inversores y expandir nuestro negocio a 5 países.', 5, '', 1),
        ('Ana Rodríguez', 'Atleta Paralímpica', '', 'El trabajo de SportsCoLab en inclusión y accesibilidad ha sido fundamental para que más personas con discapacidad puedan acceder al deporte de alto rendimiento.', 5, '', 1)
    ]
    
    for testimonial in testimonials_data:
        conn.execute('''
            INSERT OR IGNORE INTO testimonials (name, position, company, testimonial, rating, image_url, is_featured)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', testimonial)
    
    conn.commit()
    conn.close()

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('login'))
        
        conn = get_db_connection()
        user = conn.execute('SELECT role FROM users WHERE id = ?', (session['user_id'],)).fetchone()
        conn.close()
        
        if not user or user['role'] != 'admin':
            flash('Acceso denegado. Se requieren permisos de administrador.', 'error')
            return redirect(url_for('dashboard'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def index():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        
        conn = get_db_connection()
        user = conn.execute(
            'SELECT * FROM users WHERE username = ? AND password_hash = ? AND is_active = 1',
            (username, password_hash)
        ).fetchone()
        conn.close()
        
        if user:
            session['user_id'] = user['id']
            session['username'] = user['username']
            session['role'] = user['role']
            flash('Inicio de sesión exitoso', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Credenciales inválidas', 'error')
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('Sesión cerrada exitosamente', 'success')
    return redirect(url_for('login'))

@app.route('/dashboard')
@login_required
def dashboard():
    conn = get_db_connection()
    
    # Estadísticas generales
    stats = {
        'total_posts': conn.execute('SELECT COUNT(*) as count FROM posts').fetchone()['count'],
        'published_posts': conn.execute('SELECT COUNT(*) as count FROM posts WHERE status = "published"').fetchone()['count'],
        'total_users': conn.execute('SELECT COUNT(*) as count FROM users WHERE is_active = 1').fetchone()['count'],
        'total_products': conn.execute('SELECT COUNT(*) as count FROM products WHERE is_active = 1').fetchone()['count'],
        'total_orders': conn.execute('SELECT COUNT(*) as count FROM orders').fetchone()['count'],
        'total_testimonials': conn.execute('SELECT COUNT(*) as count FROM testimonials WHERE is_active = 1').fetchone()['count']
    }
    
    # Posts recientes
    recent_posts = conn.execute('''
        SELECT p.*, u.full_name as author_name 
        FROM posts p 
        LEFT JOIN users u ON p.author_id = u.id 
        ORDER BY p.created_at DESC 
        LIMIT 5
    ''').fetchall()
    
    # Métricas de la última semana
    weekly_analytics = conn.execute('''
        SELECT DATE(timestamp) as date, COUNT(*) as visits
        FROM analytics 
        WHERE timestamp >= datetime('now', '-7 days')
        GROUP BY DATE(timestamp)
        ORDER BY date
    ''').fetchall()
    
    conn.close()
    
    return render_template('dashboard.html', stats=stats, recent_posts=recent_posts, weekly_analytics=weekly_analytics)

@app.route('/posts')
@login_required
def posts():
    conn = get_db_connection()
    
    # Filtros
    status_filter = request.args.get('status', '')
    author_filter = request.args.get('author', '')
    
    query = '''
        SELECT p.*, u.full_name as author_name 
        FROM posts p 
        LEFT JOIN users u ON p.author_id = u.id 
        WHERE 1=1
    '''
    params = []
    
    if status_filter:
        query += ' AND p.status = ?'
        params.append(status_filter)
    
    if author_filter:
        query += ' AND p.author_id = ?'
        params.append(author_filter)
    
    # Solo mostrar posts del usuario si no es admin
    if session.get('role') != 'admin':
        query += ' AND p.author_id = ?'
        params.append(session['user_id'])
    
    query += ' ORDER BY p.created_at DESC'
    
    posts = conn.execute(query, params).fetchall()
    
    # Obtener lista de autores para el filtro
    authors = conn.execute('SELECT id, full_name FROM users WHERE is_active = 1').fetchall()
    
    conn.close()
    
    return render_template('posts.html', posts=posts, authors=authors, status_filter=status_filter, author_filter=author_filter)

@app.route('/posts/new', methods=['GET', 'POST'])
@login_required
def new_post():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        excerpt = request.form['excerpt']
        category = request.form['category']
        tags = request.form['tags']
        status = request.form['status']
        
        conn = get_db_connection()
        conn.execute('''
            INSERT INTO posts (title, content, excerpt, author_id, category, tags, status, published_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (title, content, excerpt, session['user_id'], category, tags, status, 
              datetime.datetime.now() if status == 'published' else None))
        conn.commit()
        conn.close()
        
        flash('Artículo creado exitosamente', 'success')
        return redirect(url_for('posts'))
    
    return render_template('post_form.html', post=None)

@app.route('/posts/<int:post_id>/edit', methods=['GET', 'POST'])
@login_required
def edit_post(post_id):
    conn = get_db_connection()
    post = conn.execute('SELECT * FROM posts WHERE id = ?', (post_id,)).fetchone()
    
    if not post:
        flash('Artículo no encontrado', 'error')
        return redirect(url_for('posts'))
    
    # Verificar permisos
    if session.get('role') != 'admin' and post['author_id'] != session['user_id']:
        flash('No tienes permisos para editar este artículo', 'error')
        return redirect(url_for('posts'))
    
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        excerpt = request.form['excerpt']
        category = request.form['category']
        tags = request.form['tags']
        status = request.form['status']
        
        conn.execute('''
            UPDATE posts 
            SET title = ?, content = ?, excerpt = ?, category = ?, tags = ?, status = ?, 
                updated_at = ?, published_at = ?
            WHERE id = ?
        ''', (title, content, excerpt, category, tags, status, datetime.datetime.now(),
              datetime.datetime.now() if status == 'published' and not post['published_at'] else post['published_at'],
              post_id))
        conn.commit()
        conn.close()
        
        flash('Artículo actualizado exitosamente', 'success')
        return redirect(url_for('posts'))
    
    conn.close()
    return render_template('post_form.html', post=post)

@app.route('/products')
@admin_required
def products():
    conn = get_db_connection()
    products = conn.execute('SELECT * FROM products ORDER BY created_at DESC').fetchall()
    conn.close()
    
    return render_template('products.html', products=products)

@app.route('/users')
@admin_required
def users():
    conn = get_db_connection()
    users = conn.execute('SELECT * FROM users ORDER BY created_at DESC').fetchall()
    conn.close()
    
    return render_template('users.html', users=users)

@app.route('/analytics')
@admin_required
def analytics():
    conn = get_db_connection()
    
    # Métricas generales
    total_visits = conn.execute('SELECT COUNT(*) as count FROM analytics').fetchone()['count']
    unique_visitors = conn.execute('SELECT COUNT(DISTINCT visitor_ip) as count FROM analytics').fetchone()['count']
    
    # Páginas más visitadas
    top_pages = conn.execute('''
        SELECT page_url, COUNT(*) as visits 
        FROM analytics 
        WHERE page_url IS NOT NULL
        GROUP BY page_url 
        ORDER BY visits DESC 
        LIMIT 10
    ''').fetchall()
    
    # Visitas por día (últimos 30 días)
    daily_visits = conn.execute('''
        SELECT DATE(timestamp) as date, COUNT(*) as visits
        FROM analytics 
        WHERE timestamp >= datetime('now', '-30 days')
        GROUP BY DATE(timestamp)
        ORDER BY date
    ''').fetchall()
    
    # Referrers principales
    top_referrers = conn.execute('''
        SELECT referrer, COUNT(*) as visits 
        FROM analytics 
        WHERE referrer IS NOT NULL AND referrer != ''
        GROUP BY referrer 
        ORDER BY visits DESC 
        LIMIT 10
    ''').fetchall()
    
    conn.close()
    
    return render_template('analytics.html', 
                         total_visits=total_visits, 
                         unique_visitors=unique_visitors,
                         top_pages=top_pages,
                         daily_visits=daily_visits,
                         top_referrers=top_referrers)

@app.route('/testimonials')
@admin_required
def testimonials():
    conn = get_db_connection()
    testimonials = conn.execute('SELECT * FROM testimonials ORDER BY created_at DESC').fetchall()
    conn.close()
    
    return render_template('testimonials.html', testimonials=testimonials)

# API endpoints para el frontend
@app.route('/api/posts')
def api_posts():
    conn = get_db_connection()
    posts = conn.execute('''
        SELECT p.*, u.full_name as author_name 
        FROM posts p 
        LEFT JOIN users u ON p.author_id = u.id 
        WHERE p.status = "published"
        ORDER BY p.published_at DESC
    ''').fetchall()
    conn.close()
    
    return jsonify([dict(post) for post in posts])

@app.route('/api/products')
def api_products():
    conn = get_db_connection()
    products = conn.execute('SELECT * FROM products WHERE is_active = 1').fetchall()
    conn.close()
    
    return jsonify([dict(product) for product in products])

@app.route('/api/testimonials')
def api_testimonials():
    conn = get_db_connection()
    testimonials = conn.execute('SELECT * FROM testimonials WHERE is_active = 1').fetchall()
    conn.close()
    
    return jsonify([dict(testimonial) for testimonial in testimonials])

@app.route('/api/track', methods=['POST'])
def api_track():
    """Endpoint para rastrear eventos de analytics"""
    data = request.get_json()
    
    conn = get_db_connection()
    conn.execute('''
        INSERT INTO analytics (page_url, visitor_ip, user_agent, referrer, session_id, event_type, event_data)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (
        data.get('page_url'),
        request.remote_addr,
        request.headers.get('User-Agent'),
        data.get('referrer'),
        data.get('session_id'),
        data.get('event_type'),
        json.dumps(data.get('event_data', {}))
    ))
    conn.commit()
    conn.close()
    
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)

