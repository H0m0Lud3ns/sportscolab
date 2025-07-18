import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import {
  Menu,
  X,
  ChevronRight,
  Users,
  Target,
  Lightbulb,
  Heart,
  Play,
  BookOpen,
  ShoppingCart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Star,
  Quote,
  Calendar,
  Award,
  Globe,
  TrendingUp,
  Zap,
  Coffee,
  Headphones,
  Brain,
  Handshake,
  Rocket,
  GraduationCap,
  Newspaper,
  Podcast,
  Video
} from 'lucide-react'
import './App.css'

// Importar logos
import logoSCL from './assets/LogoSCLsinfondo2.png'
import logoSCLVariant from './assets/LogoSCLsinfondo1.png'
import logoCO from './assets/LogoCO4.png'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  // Datos de testimonios
  const testimonios = [
    {
      nombre: "María González",
      cargo: "Directora de Innovación, Federación Chilena de Fútbol",
      testimonio: "SportsCoLab transformó nuestra visión sobre la innovación en el deporte. Su metodología xCO nos permitió desarrollar soluciones que realmente impactan a nuestros atletas y comunidad.",
      rating: 5
    },
    {
      nombre: "Carlos Mendoza",
      cargo: "CEO, SportsTech Startup",
      testimonio: "El Congreso SportsTech Latam es el evento más importante de la región. Gracias a SportsCoLab pudimos conectar con inversores y expandir nuestro negocio a 5 países.",
      rating: 5
    },
    {
      nombre: "Ana Rodríguez",
      cargo: "Atleta Paralímpica",
      testimonio: "El trabajo de SportsCoLab en inclusión y accesibilidad ha sido fundamental para que más personas con discapacidad puedan acceder al deporte de alto rendimiento.",
      rating: 5
    }
  ]

  // Datos de proyectos
  const proyectos = [
    {
      titulo: "Congreso SportsTech Latam",
      descripcion: "El evento más importante de tecnología deportiva en Latinoamérica, conectando a más de 1000 profesionales desde 2020.",
      imagen: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
      categoria: "Evento",
      año: "2020-2025"
    },
    {
      titulo: "Diplomado Universidad de los Lagos",
      descripcion: "Programa de formación en cultura de la innovación y tecnologías para la gestión deportiva.",
      imagen: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop",
      categoria: "Educación",
      año: "2025"
    },
    {
      titulo: "Tejiendo Mimbres del Deporte",
      descripcion: "Libro colaborativo sobre deporte responsable y sostenible con enfoque en ciencias y humanidades.",
      imagen: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
      categoria: "Publicación",
      año: "2024"
    }
  ]

  // Datos de casos de éxito
  const casosExito = [
    {
      titulo: "Transformación Social a través del Deporte",
      descripcion: "Implementación de programas deportivos innovadores en centros penitenciarios, mejorando la reinserción social y el bienestar de los participantes.",
      desafio: "Falta de oportunidades y herramientas para la reinserción social de personas privadas de libertad.",
      solucion: "Diseño e implementación de un programa de entrenamiento deportivo y desarrollo de habilidades blandas, basado en la metodología xCO, adaptado a las condiciones de los centros penitenciarios.",
      resultados: [
        "Reducción del 30% en incidentes disciplinarios.",
        "Aumento del 50% en la participación en actividades educativas y laborales.",
        "Mejora significativa en la salud mental y física de los participantes."
      ],
      imagen: "https://images.unsplash.com/photo-1579952927770-8777051410b6?w=400&h=250&fit=crop",
      categoria: "Impacto Social"
    },
    {
      titulo: "Optimización del Rendimiento Deportivo con Data Science",
      descripcion: "Desarrollo de un sistema de análisis de datos para un equipo de fútbol profesional, permitiendo la toma de decisiones basada en evidencia para mejorar el rendimiento y prevenir lesiones.",
      desafio: "Falta de herramientas para analizar el rendimiento de los jugadores y optimizar las estrategias de entrenamiento.",
      solucion: "Creación de una plataforma de análisis de datos que integra información de sensores de rendimiento, GPS y métricas de juego, visualizando patrones y tendencias para el cuerpo técnico.",
      resultados: [
        "Reducción del 20% en la incidencia de lesiones musculares.",
        "Aumento del 15% en la eficiencia de los entrenamientos.",
        "Mejora en la toma de decisiones tácticas durante los partidos."
      ],
      imagen: "https://images.unsplash.com/photo-1550522661-d77042075031?w=400&h=250&fit=crop",
      categoria: "Rendimiento Deportivo"
    }
  ]

  // Datos de productos
  const productos = [
    {
      nombre: "Camiseta SportsCoLab FC",
      precio: "$25.000 CLP",
      imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      descripcion: "Camiseta oficial del equipo SportsCoLab FC, diseñada para la comunidad innovadora."
    },
    {
      nombre: "Libro: Tejiendo Mimbres",
      precio: "$15.000 CLP",
      imagen: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop",
      descripcion: "Capítulos 1 y 4 del libro sobre deporte responsable y sostenible."
    },
    {
      nombre: "Acceso Diplomado",
      precio: "$150.000 CLP",
      imagen: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=300&fit=crop",
      descripcion: "Acceso completo al Diplomado en Innovación Deportiva con la Universidad de los Lagos."
    }
  ]

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      {/* Header/Navigation */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={logoSCL} alt="SportsCoLab" className="h-12 w-auto" />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('inicio')}
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${activeSection === 'inicio' ? 'text-purple-600' : 'text-gray-700'}`}
              >
                Inicio
              </button>
              <button 
                onClick={() => scrollToSection('historia')}
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${activeSection === 'historia' ? 'text-purple-600' : 'text-gray-700'}`}
              >
                Historia
              </button>
              <button 
                onClick={() => scrollToSection('metodologia')}
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${activeSection === 'metodologia' ? 'text-purple-600' : 'text-gray-700'}`}
              >
                Metodología
              </button>
              <button 
                onClick={() => scrollToSection('casos-exito')}
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${activeSection === 'casos-exito' ? 'text-purple-600' : 'text-gray-700'}`}
              >
                Casos de Éxito
              </button>
              <button 
                onClick={() => scrollToSection('diplomado')}
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${activeSection === 'diplomado' ? 'text-purple-600' : 'text-gray-700'}`}
              >
                Diplomado
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${activeSection === 'blog' ? 'text-purple-600' : 'text-gray-700'}`}
              >
                Blog
              </button>
              <button 
                onClick={() => scrollToSection('tienda')}
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${activeSection === 'tienda' ? 'text-purple-600' : 'text-gray-700'}`}
              >
                Tienda
              </button>
              <button 
                onClick={() => scrollToSection('contacto')}
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${activeSection === 'contacto' ? 'text-purple-600' : 'text-gray-700'}`}
              >
                Contacto
              </button>
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col space-y-3">
                <button onClick={() => scrollToSection('inicio')} className="text-left text-gray-700 hover:text-purple-600">Inicio</button>
                <button onClick={() => scrollToSection('historia')} className="text-left text-gray-700 hover:text-purple-600">Historia</button>
                <button onClick={() => scrollToSection('metodologia')} className="text-left text-gray-700 hover:text-purple-600">Metodología</button>
                <button onClick={() => scrollToSection('casos-exito')} className="text-left text-gray-700 hover:text-purple-600">Casos de Éxito</button>
                <button onClick={() => scrollToSection('diplomado')} className="text-left text-gray-700 hover:text-purple-600">Diplomado</button>
                <button onClick={() => scrollToSection('blog')} className="text-left text-gray-700 hover:text-purple-600">Blog</button>
                <button onClick={() => scrollToSection('tienda')} className="text-left text-gray-700 hover:text-purple-600">Tienda</button>
                <button onClick={() => scrollToSection('contacto')} className="text-left text-gray-700 hover:text-purple-600">Contacto</button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 text-lg px-4 py-2 bg-purple-100 text-purple-800">
              5+ años transformando el deporte en Latinoamérica
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              INNOVAR PARA QUE EL MUNDO
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-green-500"> RECUPERE EL PLACER POR JUGAR</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Desde 2019, somos el <span className="font-bold">primer Laboratorio de Innovación Deportiva de Latinoamérica</span> que democratiza el acceso al conocimiento a través de un enfoque transdisciplinario, científico y humanista.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
                onClick={() => scrollToSection('metodologia')}
              >
                Conoce nuestra Metodología
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-green-500 text-green-600 hover:bg-green-50 px-8 py-3"
                onClick={() => scrollToSection('casos-exito')}
              >
                Nuestros Casos de Éxito
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section id="historia" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestra Historia</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              SportsCoLab nació en 2019 cuando un grupo de profesionales multidisciplinarios, 
              unidos por su pasión por el deporte, identificaron una necesidad fundamental: 
              abordar el deporte desde un paradigma complejo que genere valor más allá de la rentabilidad económica.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-xl">Fundadores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Sebastián Acevedo Vásquez</h4>
                      <p className="text-sm opacity-90">Co-fundador</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Javier Martínez Saa</h4>
                      <p className="text-sm opacity-90">Co-fundador</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-xl">Mentores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Tomás Vera</h4>
                    </div>
                    <div>
                      <h4 className="font-semibold">Kyle Hepp</h4>
                    </div>
                    <div>
                      <h4 className="font-semibold">Carles Murillo</h4>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Metodología xCO */}
      <section id="metodologia" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Metodología xCO</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Nuestra metodología distintiva nació del trabajo real con personas privadas de libertad y se ha validado en más de 15 proyectos internacionales. Combinamos el Mindset Deportivo con principios de innovación, inspirados en Paulo Freire, Edgar Morin, Marcelo Bielsa y nuestra experiencia práctica desde 2019.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl text-purple-600">Conectar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Pensar en colectivo, buscando aliados con propósitos compartidos</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-green-600">Colaborar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Compartir talentos y conocimientos para generar valor</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-blue-600">Construir</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Materializar ideas en proyectos concretos orientados por propósitos comunes</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl text-orange-600">Comunidad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Articular ecosistemas que democraticen y distribuyan el conocimiento</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Casos de Éxito */}
      <section id="casos-exito" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Casos de Éxito</h2>
            <p className="text-lg text-gray-600">Descubre cómo hemos generado valor en el mundo real</p>
          </div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {casosExito.map((caso, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200">
                  <img 
                    src={caso.imagen} 
                    alt={caso.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{caso.categoria}</Badge>
                  </div>
                  <CardTitle className="text-xl">{caso.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">**Desafío:** {caso.desafio}</p>
                  <p className="text-gray-600 mb-4">**Solución:** {caso.solucion}</p>
                  <h4 className="font-semibold mb-2">Resultados:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {caso.resultados.map((resultado, i) => (
                      <li key={i}>{resultado}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Diplomado */}
      <section id="diplomado" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Diplomado en Innovación Deportiva</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Junto a la Universidad de los Lagos (Chile), promovemos la democratización en el acceso al conocimiento desde un lugar descentralizado y la creación de redes de apoyo de largo plazo que permitan construir una cultura de colaboración.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Acceso al Conocimiento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Democratizamos la educación en innovación deportiva, llegando a todos los rincones.</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Handshake className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">Redes de Apoyo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Fomentamos la creación de lazos duraderos para una cultura de colaboración.</p>
                </CardContent>
              </Card>
            </div>
            <Button 
              size="lg" 
              className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
              onClick={() => window.open('https://www.ulagos.cl/diplomados/diplomado-en-innovacion-deportiva/', '_blank')}
            >
              Más información sobre el Diplomado
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Blog & Columnistas</h2>
            <p className="text-lg text-gray-600">Explora artículos, podcasts y videos de nuestra comunidad de expertos</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Newspaper className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Artículos de Expertos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Análisis profundos y perspectivas innovadoras sobre el deporte y la sociedad.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Leer Artículos
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Podcast className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg">Nuestros Podcasts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Conversaciones que inspiran y desafían el status quo en el mundo deportivo.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Escuchar Podcasts
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-lg">Videos & Conferencias</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Contenido visual exclusivo de nuestros eventos y charlas magistrales.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Ver Videos
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* SportsTech Latam Highlight - Reubicado y mejorado */}
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-purple-600 to-green-500 text-white overflow-hidden">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Congreso SportsTech Latam</h3>
                    <p className="text-lg mb-6 opacity-90">
                      Desde 2020, SportsCoLab organiza el evento que conecta la innovación y el deporte en Latinoamérica. Un espacio para construir el futuro del ecosistema.
                    </p>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="bg-white/20 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">5</div>
                        <div className="text-sm opacity-90">Ediciones</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">16</div>
                        <div className="text-sm opacity-90">Países</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">1000+</div>
                        <div className="text-sm opacity-90">Participantes</div>
                      </div>
                    </div>
                    <Button 
                      variant="secondary" 
                      size="lg"
                      onClick={() => window.open('https://sportstechlatam.com', '_blank')}
                    >
                      Explora SportsTech Latam
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/10 rounded-lg p-6">
                      <Award className="h-16 w-16 mx-auto mb-4 opacity-90" />
                      <p className="text-lg font-semibold">Próxima edición 2025</p>
                      <p className="opacity-90">¡Sé parte de la conversación!</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Voces que Inspiran</h2>
            <p className="text-lg text-gray-600">Lo que nuestro ecosistema comparte sobre el impacto de SportsCoLab</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonios.map((testimonio, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(testimonio.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-purple-600 mb-3" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 italic">"{testimonio.testimonio}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonio.nombre}</p>
                    <p className="text-sm text-gray-500">{testimonio.cargo}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tienda */}
      <section id="tienda" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tienda SportsCoLab</h2>
            <p className="text-lg text-gray-600">Productos que conectan con nuestra visión y comunidad</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productos.map((producto, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-200">
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{producto.nombre}</CardTitle>
                  <CardDescription>{producto.descripcion}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">{producto.precio}</span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Comprar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Conecta con Nosotros</h2>
            <p className="text-lg text-gray-600">Tu visión es el motor de nuestra innovación. ¡Hablemos!</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-purple-600" />
                  <span>contacto@sportscolab.co</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-purple-600" />
                  <span>+56 9 XXXX XXXX</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <span>Santiago, Chile</span>
                </div>
              </div>

              <h4 className="text-lg font-semibold mt-8 mb-4">Síguenos en Redes Sociales</h4>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm"
                  onClick={() => window.open('https://www.youtube.com/@sportscolabtv', '_blank')}
                >
                  <Youtube className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Envíanos un mensaje</CardTitle>
                <CardDescription>
                  ¿Tienes una consulta o quieres colaborar con nosotros? ¡Escríbenos!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mensaje</label>
                    <textarea 
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Cuéntanos sobre tu proyecto o consulta..."
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    Enviar mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src={logoSCLVariant} alt="SportsCoLab" className="h-12 w-auto mb-4" />
              <p className="text-gray-400 text-sm">
                Laboratorio de Innovación Deportiva transformando el ecosistema deportivo latinoamericano.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Navegación</h4>
              <div className="space-y-2 text-sm">
                <button onClick={() => scrollToSection('inicio')} className="block text-gray-400 hover:text-white">Inicio</button>
                <button onClick={() => scrollToSection('historia')} className="block text-gray-400 hover:text-white">Historia</button>
                <button onClick={() => scrollToSection('metodologia')} className="block text-gray-400 hover:text-white">Metodología</button>
                <button onClick={() => scrollToSection('casos-exito')} className="block text-gray-400 hover:text-white">Casos de Éxito</button>
                <button onClick={() => scrollToSection('diplomado')} className="block text-gray-400 hover:text-white">Diplomado</button>
                <button onClick={() => scrollToSection('blog')} className="block text-gray-400 hover:text-white">Blog</button>
                <button onClick={() => scrollToSection('tienda')} className="block text-gray-400 hover:text-white">Tienda</button>
                <button onClick={() => scrollToSection('contacto')} className="block text-gray-400 hover:text-white">Contacto</button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Proyectos Clave</h4>
              <div className="space-y-2 text-sm">
                <a href="https://sportstechlatam.com" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white">SportsTech Latam</a>
                <a href="https://www.ulagos.cl/diplomados/diplomado-en-innovacion-deportiva/" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white">Diplomado ULagos</a>
                <a href="#" className="block text-gray-400 hover:text-white">Tejiendo Mimbres</a>
                <a href="https://www.youtube.com/@sportscolabtv" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white">SportsCoLabTV</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Conecta</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>contacto@sportscolab.co</p>
                <p>Santiago, Chile</p>
                <div className="flex space-x-3 mt-4">
                  <Facebook className="h-4 w-4 hover:text-white cursor-pointer" />
                  <Twitter className="h-4 w-4 hover:text-white cursor-pointer" />
                  <Instagram className="h-4 w-4 hover:text-white cursor-pointer" />
                  <Youtube className="h-4 w-4 hover:text-white cursor-pointer" />
                  <Linkedin className="h-4 w-4 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-700" />
          
          <div className="text-center text-sm text-gray-400">
            <p>&copy; 2025 SportsCoLab. Todos los derechos reservados. | Innovar para que el mundo recupere el placer por jugar</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App


