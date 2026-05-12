"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string; time: string };

const METRICAS = [
  { n: "700+",  l: "RPM de rotación"             },
  { n: "360°",  l: "Ángulo de visión total"      },
  { n: "+30%",  l: "Tráfico en punto de venta"   },
  { n: "+70%",  l: "Retención de marca"          },
];

const ECOSISTEMA = [
  {
    titulo:   "Enrutadores de Alta Capacidad",
    badge:    "Infraestructura",
    img:      "/images/router.jpg",
    icono:    "📡",
    desc:     "El corazón del ecosistema. Routers de banda dual (2.4/5GHz) diseñados para soportar la carga masiva de datos en tiempo real. Garantizan cero latencia al sincronizar múltiples ventiladores holográficos en formato Video Wall y mantener conectadas las cámaras de seguridad sin cuellos de botella.",
    features: ["QoS Inteligente", "Múltiples Antenas", "Sincronización LAN"],
  },
  {
    titulo:   "Cámaras Solares Autónomas",
    badge:    "Seguridad & Analítica",
    img:      "/images/camara-solar.jpg",
    icono:    "☀️",
    desc:     "Vigilancia perimetral sin cables. Alimentadas por energía solar con baterías de respaldo de alta capacidad. Ideales para exteriores y eventos al aire libre donde se despliegan campañas publicitarias. Mantienen conectividad 24/7 protegiendo tus activos físicos.",
    features: ["Cero Cableado", "Visión Nocturna", "Alarma Integrada"],
  },
  {
    titulo:   "Smart Vision PTZ Lente Dual",
    badge:    "Analítica Retail",
    img:      "/images/camara-dual.jpg",
    icono:    "🎥",
    desc:     "Más que seguridad: inteligencia de negocios. Con doble lente y paneo/inclinación de 360°, monitorean el flujo de personas frente a tus hologramas publicitarios, generando mapas de calor y analítica de comportamiento del consumidor para medir el ROI real.",
    features: ["Lente Dual", "Seguimiento IA", "Audio Bidireccional"],
  },
  {
    titulo:   "Drones de Cobertura Aérea",
    badge:    "Operaciones Aéreas",
    img:      "/images/drone.jpg",
    icono:    "🚁",
    desc:     "La evolución de la supervisión comercial. Fotogrametría, modelado 3D de grandes superficies para integrarlos en hologramas, y vigilancia aérea autónoma en festivales o conciertos masivos. Amplía tu visión al cielo y captura contenido para tus campañas.",
    features: ["Vuelo Autónomo", "Captura 4K", "Mapeo 3D"],
  },
];

const SPECS = [
  { label: "LEDs por aspa",    value: "224",     unit: "LEDs" },
  { label: "Velocidad",        value: "700+",    unit: "RPM"  },
  { label: "Diámetro visible", value: "65",      unit: "cm"   },
  { label: "Ángulo de visión", value: "360",     unit: "°"    },
  { label: "Resolución",       value: "192×224", unit: "px"   },
  { label: "Framerate",        value: "25",      unit: "FPS"  },
];

const CASOS = [
  { emoji: "👟", sector: "Retail & Moda",      desc: "Zapatillas, bolsas, joyería y electrónica en rotación total. El cliente ve el producto desde todos los ángulos sin tocarlo." },
  { emoji: "🍔", sector: "Gastronomía",         desc: "Platillos humeantes, bebidas burbujeantes y menús animados que multiplican el antojo y la conversión en el mostrador." },
  { emoji: "🏢", sector: "Corporativo",         desc: "Logotipos flotantes, KPIs y presentaciones en 3D para salas de juntas, lobbies y stands de feria." },
  { emoji: "🎮", sector: "Entretenimiento",     desc: "Personajes, trofeos y lanzamientos de videojuegos con presencia física inmersiva que genera contenido viral." },
  { emoji: "🏥", sector: "Salud & Farma",       desc: "Modelos anatómicos, moléculas y fármacos en visualización educativa 3D para consultorios y congresos médicos." },
  { emoji: "🎓", sector: "Educación & Museos",  desc: "Sistema solar, ADN, arte cultural y piezas históricas proyectadas para un aprendizaje visual profundo e inmersivo." },
];

const COMPARATIVA = [
  ["Atención captada",      "⭐⭐⭐⭐⭐",  "⭐⭐⭐",    "⭐⭐"      ],
  ["Retención de marca",    "+70% vs LCD",  "Base",       "−20%"     ],
  ["Ángulo de visión",      "360°",         "180° máx.",  "Frontal"  ],
  ["Instalación",           "5 min",        "1–2 horas",  "Días"     ],
  ["Actualización remota",  "✅ WiFi",      "Parcial",    "❌"       ],
  ["Analítica integrada",   "✅ Cámaras",   "❌",         "❌"       ],
  ["Costo operativo/mes",   "Muy bajo",     "Medio",      "Alto"     ],
];

const FAQ = [
  { q: "¿Necesita instalación especial?",         a: "No. El ventilador se conecta a un tomacorriente estándar. La configuración WiFi es automática mediante nuestra plataforma web y los Routers de alta capacidad del ecosistema." },
  { q: "¿Qué formatos de video acepta?",          a: "MP4, MOV, AVI y WebM. Nuestra plataforma los convierte automáticamente al formato nativo del dispositivo directamente en el navegador, sin software extra." },
  { q: "¿Se puede ver de día con luz natural?",   a: "Sí. Los 224 LEDs RGB de alta densidad garantizan visibilidad en ambientes iluminados. Para máximo impacto visual recomendamos entornos semi-controlados." },
  { q: "¿Cuántos dispositivos puedo gestionar?",  a: "La plataforma soporta múltiples ventiladores en modo Video Wall sincronizados a través de los Routers del ecosistema. Las cámaras PTZ miden el impacto de cada uno." },
  { q: "¿Las cámaras y drones son compatibles?",  a: "Sí. Todo el ecosistema (hologramas, routers, cámaras solares, cámaras PTZ y drones) está diseñado para trabajar integrado sobre la misma infraestructura de red." },
  { q: "¿Qué pasa si pierdo la conexión WiFi?",   a: "El archivo .BIN queda almacenado en la microSD del ventilador y continúa reproduciéndose en loop hasta que se cargue contenido nuevo. Las cámaras mantienen grabación local." },
];

const CHAT_SYSTEM_PROMPT = `Eres el asistente de servicio técnico de "Publicidad con Visión", una empresa que vende ventiladores holográficos 3D y un ecosistema de retail tech.

PRODUCTOS QUE VENDES:
- Ventiladores holográficos POV: 224 LEDs RGB, 700+ RPM, 360° de visión, resolución 192×224 px, 25 FPS, diámetro visible 65 cm, WiFi nativo, plug & play en 5 min, microSD incluida.
- Routers de alta capacidad: banda dual 2.4/5GHz, QoS inteligente, para sincronizar múltiples ventiladores en Video Wall.
- Cámaras solares autónomas: sin cables, visión nocturna, alarma integrada, para exteriores.
- Cámaras PTZ de lente dual: analítica de comportamiento, mapas de calor, seguimiento IA, audio bidireccional.
- Drones de cobertura aérea: vuelo autónomo, captura 4K, mapeo 3D.

INSTRUCCIONES:
- Responde en español, de forma amable y técnica pero sin ser condescendiente.
- Sé conciso: respuestas de 2-4 oraciones máximo salvo que se pida detalle.
- Si te preguntan sobre precios, di que el equipo de ventas genera cotizaciones personalizadas y que pueden usar el formulario de contacto.
- Si no sabes algo, sugiere contactar al equipo humano.
- Nunca inventes especificaciones que no se te han dado.
- El tono es profesional pero cercano.`;

function VideoSlot({ title, badge, videoSrc }: { title: string; badge: string; videoSrc: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isExpanded]);

  return (
    <>
      {/* Tarjeta normal */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden hover:border-sky-500/20 transition-all">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-white">{title}</span>
            <span className="ml-2 text-[10px] font-bold text-sky-300 bg-sky-500/15 border border-sky-500/30 px-2 py-0.5 rounded-full">{badge}</span>
          </div>
          
          <button 
            onClick={() => setIsExpanded(true)} 
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-sky-600 hover:text-white text-xs text-sky-400 font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            Agrandar
          </button>
        </div>

        {/* Contenedor del video */}
        <div className="w-full bg-slate-950 relative flex flex-col items-center justify-center" style={{ aspectRatio: "16/9" }}>
          <video
            src={videoSrc}
            controls
            muted
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Modal Pantalla Completa */}
      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10 animate-in fade-in duration-200">
          <button 
            onClick={() => setIsExpanded(false)}
            className="absolute top-6 right-6 md:top-10 md:right-10 bg-white/10 hover:bg-red-500/80 text-white rounded-full p-3 transition-colors z-[110]"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative border border-slate-800">
             <video
               src={videoSrc}
               controls
               autoPlay
               className="w-full h-full object-contain"
             />
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE: Chatbot de Servicio Técnico
// ─────────────────────────────────────────────────────────────────────────────
function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "¡Hola! Soy el asistente de servicio técnico de Publicidad con Visión 👋 Puedo ayudarte con dudas sobre los ventiladores holográficos, cámaras, routers, drones e instalación. ¿En qué te puedo ayudar?",
      time: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    "¿Cómo instalo el ventilador?",
    "¿Cuántos LEDs tiene?",
    "¿Es compatible con WiFi?",
    "¿Qué formatos de video acepta?",
    "¿Cuál es el alcance de visión?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;
    setInput("");

    const time = new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });
    const newUserMsg: ChatMessage = { role: "user", content: userText, time };
    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: CHAT_SYSTEM_PROMPT,
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = (await response.json()) as { content?: string; error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "No se pudo completar la solicitud.");
      }
      const assistantText = data.content ?? "Lo siento, no pude procesar tu pregunta. Intenta de nuevo.";
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: assistantText,
          time: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (error) {
      const fallback =
        error instanceof Error && error.message
          ? error.message
          : "Hubo un error de conexión. Por favor intenta de nuevo en un momento.";
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: fallback,
          time: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0b1121] border border-slate-800 rounded-[2rem] overflow-hidden flex flex-col shadow-[0_30px_80px_rgba(0,0,0,0.5)]" style={{ height: "560px" }}>
      {/* Header */}
      <div className="bg-slate-900/80 px-5 py-4 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.3)]">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-white">Soporte Técnico</p>
          <p className="text-[11px] text-slate-400">Publicidad con Visión · Asistente IA</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
          <span className="text-[11px] text-slate-500">En línea</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#080e1d]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-sm"
              }`}>
                {msg.content}
              </div>
              <span className="text-[10px] text-slate-600 px-1">{msg.time}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
              {[0, 150, 300].map(delay => (
                <div
                  key={delay}
                  className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex gap-2 flex-wrap bg-[#080e1d]">
          {quickReplies.map(qr => (
            <button
              key={qr}
              onClick={() => sendMessage(qr)}
              disabled={loading}
              className="text-[11px] text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-sky-500/40 px-3 py-1.5 rounded-full transition-all disabled:opacity-50"
            >
              {qr}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/60 flex gap-2 items-end">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
          disabled={loading}
          rows={1}
          placeholder="Escribe tu pregunta técnica... (Enter para enviar)"
          className="flex-1 bg-slate-800 border border-slate-700 focus:border-blue-500 text-slate-200 text-sm rounded-xl px-4 py-2.5 outline-none transition-colors placeholder-slate-600 resize-none disabled:opacity-50"
          style={{ maxHeight: "100px" }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
          className="w-10 h-10 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all shadow-[0_0_12px_rgba(37,99,235,0.3)] flex-shrink-0"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const [formData, setFormData]     = useState({ nombre:"", empresa:"", cargo:"", email:"", telefono:"", sector:"", dispositivos:"", mensaje:"", terminos:false });
  const [formSent, setFormSent]     = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [openFaq, setOpenFaq]       = useState<number | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terminos) { alert("Debes aceptar los términos."); return; }
    setFormLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setFormLoading(false);
    setFormSent(true);
  };
  const updateForm = (k: keyof typeof formData, v: string | boolean) =>
    setFormData(p => ({ ...p, [k]: v }));

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 font-sans relative overflow-hidden selection:bg-blue-500/30">

      {/* Ambient blobs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]"/>
      <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-sky-500/10 rounded-full blur-[180px] pointer-events-none animate-[pulse_8s_ease-in-out_infinite_reverse]"/>

      {/* ══════════════ NAVBAR ══════════════ */}
      <nav className="fixed w-full z-50 top-0 pt-4 px-6">
        <div className="max-w-7xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-white/5 shadow-2xl rounded-2xl px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.3)]">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">Publicidad con <span className="text-sky-400">Visión</span></span>
          </div>
          <div className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-400">
            <a href="#ecosistema" className="hover:text-white transition-colors text-sky-400 font-semibold">Ecosistema</a>
            <a href="#tecnologia" className="hover:text-white transition-colors">Hologramas</a>
            <a href="#videos"     className="hover:text-white transition-colors">Videos</a>
            <a href="#casos"      className="hover:text-white transition-colors">Aplicaciones</a>
            <a href="#specs"      className="hover:text-white transition-colors">Especificaciones</a>
            <a href="#faq"        className="hover:text-white transition-colors">FAQ</a>
            <a href="#chatbot"    className="hover:text-white transition-colors">Soporte</a>
            <a href="#contacto"   className="hover:text-white transition-colors">Contacto</a>
          </div>
          <a href="#chatbot" className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            Soporte IA
          </a>
        </div>
      </nav>

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative w-full flex flex-col bg-[#020617] overflow-hidden">
        <div className="relative w-full h-[65vh] md:h-[80vh]">
          <Image
            src="/images/hero-publicidad-vision.jpg"
            alt="Publicidad con Visión — Ecosistema Holográfico 3D"
            fill
            priority
            sizes="100vw"
            className="w-full h-full object-cover object-center"
            style={{ filter: "saturate(1.2) brightness(1.05) contrast(1.02)" }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(2,6,23,0.7) 0%, transparent 25%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none z-[8]"
            style={{ background: "linear-gradient(to bottom, transparent 0%, #020617 100%)" }} />
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center px-6 pb-24 mt-12 md:mt-20">
          <div className="mb-8 drop-shadow-2xl">
            <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-6">
              El ecosistema <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">que vende más.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light">
              Publicidad 3D, Cámaras Analíticas y Routers Inteligentes unificados en una sola plataforma de Retail Tech.
            </p>
          </div>
          <a href="#ecosistema" className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-500 border border-sky-400/50 rounded-xl text-white font-bold text-lg transition-all shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:shadow-[0_0_40px_rgba(37,99,235,0.7)] hover:-translate-y-1">
            Descubre el Ecosistema
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <div className="mt-16 flex flex-col items-center gap-2 opacity-60">
            <span className="text-[11px] text-slate-400 tracking-widest uppercase font-bold">Scroll</span>
            <div className="w-[2px] h-12 bg-gradient-to-b from-slate-400 to-transparent" />
          </div>
        </div>
      </section>

      {/* ══════════════ MÉTRICAS ══════════════ */}
      <section className="py-10 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {METRICAS.map((s, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 text-center hover:border-slate-700 transition-colors">
              <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300 mb-1">{s.n}</p>
              <p className="text-xs text-slate-500 leading-tight">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ ECOSISTEMA ══════════════ */}
      <section id="ecosistema" className="py-16 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-sky-400 tracking-widest uppercase mb-2">Mucho más que pantallas</p>
          <h2 className="text-4xl font-bold text-white mb-4">El Ecosistema Smart Retail</h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Una solución 360°. Combina el impacto publicitario de los ventiladores holográficos con analítica de video, seguridad perimetral y cobertura aérea inteligente en una sola plataforma unificada.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ECOSISTEMA.map((item, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden hover:border-sky-500/30 transition-all duration-300 group flex flex-col">
              <div className="w-full bg-slate-950 relative overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10 pointer-events-none"/>
                <Image
                  src={item.img}
                  alt={item.titulo}
                  width={1200}
                  height={720}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto max-h-72 object-contain object-center group-hover:scale-[1.03] transition-transform duration-700 bg-slate-950"
                  onError={e => {
                    const el = e.currentTarget;
                    el.style.display = "none";
                    const parent = el.parentElement;
                    if (parent && !parent.querySelector(".img-fallback")) {
                      const fb = document.createElement("div");
                      fb.className = "img-fallback w-full h-56 flex flex-col items-center justify-center gap-3 bg-slate-950";
                      fb.innerHTML = `<span style="font-size:3rem">${item.icono}</span><p style="color:#475569;font-size:0.75rem;text-align:center;padding:0 1rem">Sube la imagen a:<br/><code style="color:#0ea5e9">${item.img}</code></p>`;
                      parent.appendChild(fb);
                    }
                  }}
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">{item.badge}</span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">{item.titulo}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.desc}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {item.features.map(f => (
                    <span key={f} className="text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg">✓ {f}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ TECNOLOGÍA POV ══════════════ */}
      <section id="tecnologia" className="py-16 px-6 max-w-7xl mx-auto relative z-10">
        <div className="bg-gradient-to-br from-slate-900/60 to-blue-950/30 backdrop-blur-md border border-slate-800/60 rounded-[2rem] p-10 md:p-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-bold text-sky-400 tracking-widest uppercase mb-3">El corazón de la atracción visual</p>
              <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">Persistencia Retiniana<br/><span className="text-sky-400">POV Technology</span></h2>
              <p className="text-slate-400 leading-relaxed mb-5">
                El ventilador holográfico no usa pantallas LCD ni proyectores. Funciona mediante el principio de la <strong className="text-white">Persistencia de la Visión (POV)</strong>: 224 LEDs RGB giran a más de 700 RPM. El cerebro no puede procesar el movimiento a esa velocidad y fusiona las imágenes en un objeto 3D flotando en el aire.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                El resultado es una ilusión holográfica perfecta, visible desde cualquier ángulo de los 360°, sin gafas, sin sala oscura y sin soporte físico perceptible.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon:"⚡", t:"Ultra-luminoso",  d:"LEDs RGB alta densidad, visibles en exteriores" },
                  { icon:"📡", t:"WiFi nativo",     d:"Orquestado por los Routers del ecosistema" },
                  { icon:"👀", t:"Stop-Scroll",     d:"ROI medido por cámaras de analítica" },
                  { icon:"🔌", t:"Plug & Play",     d:"Instalación en menos de 5 minutos" },
                ].map((c, i) => (
                  <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                    <p className="text-lg mb-1">{c.icon}</p>
                    <p className="text-sm font-bold text-white">{c.t}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{c.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 border-4 border-dashed border-sky-500/30 rounded-full animate-[spin_4s_linear_infinite]"/>
                <div className="absolute inset-4 border border-blue-400/20 rounded-full animate-[spin_6s_linear_infinite_reverse]"/>
                <div className="absolute inset-8 border border-slate-700/30 rounded-full"/>
                <div className="absolute inset-0 flex items-center justify-center animate-[spin_2s_linear_infinite]">
                  <div className="w-0.5 h-full bg-gradient-to-t from-transparent via-sky-300/80 to-transparent blur-[1px]"/>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-5xl font-black text-white drop-shadow-[0_0_20px_rgba(56,189,248,0.8)]">POV</p>
                    <p className="text-xs text-sky-400 mt-1 tracking-widest uppercase font-medium">700+ RPM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════  VIDEOS ══════════════ */}
      <section id="videos" className="py-16 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-sky-400 tracking-widest uppercase mb-2">Contenido Integrado</p>
          <h2 className="text-3xl font-bold text-white mb-4">Videos del Ecosistema</h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
            Visualización directa del contenido desde los archivos de la plataforma.
          </p>
        </div>
        
        {/*
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VideoSlot 
            title="Video Principal" 
            badge="Holograma" 
            videoSrc="/video1.mp4" 
          />
          <VideoSlot 
            title="Video Secundario" 
            badge="Demostración" 
            videoSrc="/video2.mp4" 
          />
        </div>
      </section>

      {/* ══════════════ SPECS ══════════════ */}
      <section id="specs" className="py-12 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white">Especificaciones Técnicas</h2>
          <p className="text-slate-500 mt-2 text-sm">Hardware confirmado por análisis de firmware y microSD</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SPECS.map((s, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 hover:border-sky-500/30 rounded-2xl p-5 text-center transition-all group">
              <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300 group-hover:from-sky-300 group-hover:to-blue-400 transition-all">{s.value}</p>
              <p className="text-xs text-sky-500 font-mono mt-0.5">{s.unit}</p>
              <p className="text-xs text-slate-500 mt-2 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ CASOS DE USO ══════════════ */}
      <section id="casos" className="py-16 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Aplicaciones por Sector</h2>
          <p className="text-slate-500 mt-2 font-light">El ecosistema completo potencia cada industria de forma diferente</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CASOS.map((c, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 hover:border-sky-500/20 hover:-translate-y-1 rounded-2xl p-6 transition-all duration-300 group">
              <div className="text-3xl mb-4">{c.emoji}</div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">{c.sector}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ COMPARATIVA ══════════════ */}
      <section className="py-12 px-6 max-w-7xl mx-auto relative z-10">
        <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white">Ecosistema Holográfico vs. Publicidad Tradicional</h2>
              <p className="text-slate-500 mt-2 text-sm">¿Por qué el ventilador + analítica gana la batalla por la atención?</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-4 text-slate-500 font-medium">Criterio</th>
                    <th className="py-3 px-4 text-blue-400 font-bold text-center">🌀 Ecosistema 3D</th>
                    <th className="py-3 px-4 text-slate-500 font-medium text-center">📺 Pantalla LCD</th>
                    <th className="py-3 px-4 text-slate-500 font-medium text-center">🪧 Impresión</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARATIVA.map(([c, h, l, p], idx) => (
                    <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                      <td className="py-3 px-4 text-slate-400">{c}</td>
                      <td className="py-3 px-4 text-center text-blue-300 font-semibold">{h}</td>
                      <td className="py-3 px-4 text-center text-slate-500">{l}</td>
                      <td className="py-3 px-4 text-center text-slate-500">{p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section id="faq" className="py-16 px-6 max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Preguntas Frecuentes</h2>
          <p className="text-slate-500 mt-2 font-light">Todo lo que necesitas saber sobre el ecosistema</p>
        </div>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <div key={i} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === i ? "border-blue-500/40 bg-slate-900/60" : "border-slate-800 bg-slate-900/30"}`}>
              <button className="w-full flex items-center justify-between px-6 py-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className={`font-semibold text-sm ${openFaq === i ? "text-white" : "text-slate-300"}`}>{f.q}</span>
                <svg className={`w-5 h-5 shrink-0 ml-4 transition-transform ${openFaq === i ? "rotate-45 text-blue-400" : "text-slate-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5">
                  <p className="text-slate-400 text-sm leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ CHATBOT DE SERVICIO TÉCNICO ══════════════ */}
      <section id="chatbot" className="py-16 px-6 max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-sky-400 tracking-widest uppercase mb-2">Disponible 24/7</p>
          <h2 className="text-3xl font-bold text-white mb-3">Servicio Técnico con IA</h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
            Nuestro asistente inteligente responde dudas sobre hologramas, cámaras, routers, drones, compatibilidad e instalación en tiempo real.
          </p>
        </div>
        <ChatBot />
        <p className="text-center text-xs text-slate-600 mt-5 font-mono">
          Impulsado por DeepSeek · Especializado en el Ecosistema Publicidad con Visión
        </p>
      </section>

      {/* ══════════════ CONTACTO / FORMULARIO ══════════════ */}
      <section id="contacto" className="py-16 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 flex flex-col justify-center">
            <p className="text-xs font-bold text-sky-400 tracking-widest uppercase mb-3">Hablemos</p>
            <h2 className="text-4xl font-extrabold text-white mb-5 leading-tight">¿Listo para implementar el Ecosistema Completo?</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Cuéntanos sobre tu negocio y te enviamos una propuesta personalizada con costos, casos de uso para tu industria y una demo gratuita del sistema.
            </p>
            <div className="space-y-4 mb-8">
              {[
                { icon:"📍", t:"Instalación en cualquier lugar",    d:"Retail, restaurantes, eventos, museos y más." },
                { icon:"⚡", t:"Respuesta en menos de 24h",         d:"Nuestro equipo te contacta con rapidez." },
                { icon:"🎯", t:"Demo personalizada gratis",          d:"Te mostramos el holograma con tu propio contenido." },
                { icon:"🔒", t:"Seguridad integrada desde el día 1", d:"Cámaras, drones y routers listos para desplegarse." },
              ].map((b, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="text-xl mt-0.5">{b.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{b.t}</p>
                    <p className="text-xs text-slate-500">{b.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="bg-[#0b1121] border border-slate-800 rounded-[2rem] p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
              {formSent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-5">
                  <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white mb-2">¡Solicitud recibida!</p>
                    <p className="text-slate-400 text-sm max-w-sm">Nuestro equipo revisará tu consulta y se pondrá en contacto en las próximas horas.</p>
                  </div>
                  <button onClick={() => setFormSent(false)} className="text-sm text-slate-400 hover:text-white underline underline-offset-4">Enviar otra consulta</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <p className="text-white font-bold mb-1">Cotización del Ecosistema Integrado</p>
                    <p className="text-slate-500 text-xs">Campos con * son obligatorios</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">Nombre completo *</label>
                      <input required value={formData.nombre} onChange={e => updateForm("nombre", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 text-slate-200 text-sm rounded-xl px-4 py-3 outline-none transition-colors placeholder-slate-600"
                        placeholder="Tu nombre"/>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">Empresa / Negocio *</label>
                      <input required value={formData.empresa} onChange={e => updateForm("empresa", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 text-slate-200 text-sm rounded-xl px-4 py-3 outline-none transition-colors placeholder-slate-600"
                        placeholder="Nombre de tu empresa"/>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">Cargo / Puesto</label>
                      <input value={formData.cargo} onChange={e => updateForm("cargo", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 text-slate-200 text-sm rounded-xl px-4 py-3 outline-none transition-colors placeholder-slate-600"
                        placeholder="Ej. Director de Marketing"/>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">Sector de industria *</label>
                      <select required value={formData.sector} onChange={e => updateForm("sector", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 text-slate-200 text-sm rounded-xl px-4 py-3 outline-none transition-colors appearance-none">
                        <option value="" className="bg-slate-900">Seleccionar sector...</option>
                        <option value="retail"           className="bg-slate-900">Retail / Moda</option>
                        <option value="gastronomia"      className="bg-slate-900">Gastronomía / Restaurantes</option>
                        <option value="eventos"          className="bg-slate-900">Eventos / Ferias</option>
                        <option value="corporativo"      className="bg-slate-900">Corporativo / Oficinas</option>
                        <option value="salud"            className="bg-slate-900">Salud / Farmacéutica</option>
                        <option value="educacion"        className="bg-slate-900">Educación / Museos</option>
                        <option value="entretenimiento"  className="bg-slate-900">Entretenimiento / Gaming</option>
                        <option value="otro"             className="bg-slate-900">Otro</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">Correo electrónico *</label>
                      <input required type="email" value={formData.email} onChange={e => updateForm("email", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 text-slate-200 text-sm rounded-xl px-4 py-3 outline-none transition-colors placeholder-slate-600"
                        placeholder="correo@empresa.com"/>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">Teléfono / WhatsApp *</label>
                      <input required type="tel" value={formData.telefono} onChange={e => updateForm("telefono", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 text-slate-200 text-sm rounded-xl px-4 py-3 outline-none transition-colors placeholder-slate-600"
                        placeholder="+52 55 1234 5678"/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-2 font-medium">¿Cuántos dispositivos necesitas?</label>
                    <div className="flex gap-2 flex-wrap">
                      {["1", "2–5", "6–15", "16–50", "50+"].map(o => (
                        <button type="button" key={o} onClick={() => updateForm("dispositivos", o)}
                          className={`text-xs px-4 py-2 rounded-lg border font-medium transition-all ${formData.dispositivos === o ? "bg-blue-600 border-blue-500 text-white" : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-white"}`}>
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">¿Qué quieres implementar? Cuéntanos tu caso</label>
                    <textarea value={formData.mensaje} onChange={e => updateForm("mensaje", e.target.value)} rows={3}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 text-slate-200 text-sm rounded-xl px-4 py-3 outline-none transition-colors placeholder-slate-600 resize-none"
                      placeholder="Ej. Necesito hologramas para 3 sucursales + cámaras para analítica de tráfico..."/>
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="terminos" checked={formData.terminos} onChange={e => updateForm("terminos", e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-600 bg-slate-900 accent-blue-500 cursor-pointer"/>
                    <label htmlFor="terminos" className="text-xs text-slate-500 leading-relaxed cursor-pointer">
                      Acepto recibir información comercial y que mis datos sean utilizados para gestionar mi consulta. Puedo darme de baja en cualquier momento.
                    </label>
                  </div>
                  <button type="submit" disabled={formLoading}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2">
                    {formLoading
                      ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>Enviando...</>
                      : <>Solicitar Presupuesto <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></>
                    }
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="py-14 mt-10 border-t border-slate-800/50 bg-slate-950/40 backdrop-blur-sm z-10 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-sky-400"/>
              <span className="font-bold text-white text-lg">Publicidad con Visión</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm mb-5">
              Integradores de Retail Tech. Unificamos publicidad holográfica 3D, seguridad con cámaras solares PTZ de lente dual, analítica perimetral con drones e infraestructura de Routers corporativos en una sola plataforma web.
            </p>
            <div className="flex gap-3">
              {["Twitter", "LinkedIn", "Instagram"].map(s => (
                <div key={s} className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 flex items-center justify-center cursor-pointer transition-colors">
                  <span className="text-xs text-slate-500 font-bold">{s[0]}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Ecosistema</h4>
            <div className="flex flex-col gap-2.5">
              {[["Hologramas POV","#tecnologia"],["Routers & Red","#ecosistema"],["Cámaras Solares","#ecosistema"],["Drones Aéreos","#ecosistema"]].map(([l, h]) => (
                <a key={l} href={h} className="text-slate-500 hover:text-sky-400 text-sm transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Plataforma</h4>
            <div className="flex flex-col gap-2.5">
              {[["Videos","#videos"],["Especificaciones","#specs"],["FAQ","#faq"],["Soporte IA","#chatbot"],["Contacto","#contacto"]].map(([l, h]) => (
                <a key={l} href={h} className="text-slate-500 hover:text-sky-400 text-sm transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-600">
          <p>© 2026 Publicidad con Visión. Todos los derechos reservados.</p>
          <div className="flex gap-5">
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacidad</span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Términos</span>
            <span className="font-mono text-slate-700">v5.0 · Ecosystem Core</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
