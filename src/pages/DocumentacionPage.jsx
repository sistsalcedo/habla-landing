import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Book, Key, Server, Radio, Network, FileCode, Zap, AlertCircle } from 'lucide-react'

const sections = [
  {
    id: 'introduccion',
    skipNav: true,
    icon: Book,
    title: 'Introducción',
    content: 'Habla ofrece dos productos: Habla Push (REST, push-to-talk, acepta MP3, WAV y WebM) y Habla Flow (WebSocket, conversación natural). Ambos usan la misma API key y comparten el mismo modelo de precios.',
  },
  {
    id: 'autenticacion',
    icon: Key,
    title: 'Autenticación',
    content: 'Obtén tu API key en el Dashboard tras registrarte. Inclúyela en el header X-API-Key o Authorization: Bearer en todas las peticiones.',
    code: `X-API-Key: YOUR_API_KEY

# O bien:
Authorization: Bearer YOUR_API_KEY`,
  },
  {
    id: 'v1-rest',
    icon: Server,
    title: 'Habla Push — REST (push-to-talk)',
    content: 'Envía un archivo de audio completo (MP3, WAV o WebM) y recibe el audio de respuesta.',
    code: `curl -X POST https://api.habla.cloud/api/speech \\
  -F "file=@audio.mp3" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
  {
    id: 'ejemplo-python',
    icon: Server,
    title: 'Ejemplo Python (Habla Push)',
    content: 'Usa la librería requests para enviar un archivo de audio y guardar la respuesta MP3.',
    code: `import requests

API_KEY = "YOUR_API_KEY"
url = "https://api.habla.cloud/api/speech"

with open("audio.mp3", "rb") as f:
    response = requests.post(
        url,
        files={"file": ("audio.mp3", f, "audio/mpeg")},
        headers={"Authorization": f"Bearer {API_KEY}"}
    )

if response.status_code == 200:
    with open("respuesta.mp3", "wb") as out:
        out.write(response.content)
    print("Audio guardado en respuesta.mp3")
else:
    print(f"Error {response.status_code}:", response.text)`,
  },
  {
    id: 'ejemplo-javascript',
    icon: Server,
    title: 'Ejemplo JavaScript (Habla Push)',
    content: 'En navegador: usa fetch con FormData. En Node.js 18+: fetch nativo; para archivos usa form-data.',
    code: `// Navegador (con input type="file")
const formData = new FormData();
formData.append("file", fileInput.files[0]);

const response = await fetch("https://api.habla.cloud/api/speech", {
  method: "POST",
  headers: { "Authorization": "Bearer YOUR_API_KEY" },
  body: formData
});

if (response.ok) {
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio.play();
} else {
  console.error(await response.text());
}

// Node.js (con form-data: npm install form-data)
import FormData from "form-data";
import fs from "fs";

const form = new FormData();
form.append("file", fs.createReadStream("audio.mp3"));

const res = await fetch("https://api.habla.cloud/api/speech", {
  method: "POST",
  headers: { "Authorization": "Bearer YOUR_API_KEY", ...form.getHeaders() },
  body: form
});
const buffer = Buffer.from(await res.arrayBuffer());
fs.writeFileSync("respuesta.mp3", buffer);`,
  },
  {
    id: 'v2-websocket',
    icon: Network,
    title: 'Habla Flow — Conversación (WebSocket)',
    content: 'Conecta por WebSocket para streaming bidireccional. Envía comandos JSON y audio PCM 16 kHz mono, 16-bit.',
    code: `wss://api.habla.cloud/ws/speech

# Comandos: {"type": "start"|"stop"|"interrupt"|"close"}
# Audio: bytes PCM 16 kHz mono, 16-bit`,
  },
  {
    id: 'ejemplo-websocket-js',
    icon: Network,
    title: 'Ejemplo JavaScript (Habla Flow WebSocket)',
    content: 'Conexión WebSocket básica. Envía comandos JSON y recibe audio MP3 en chunks.',
    code: `const ws = new WebSocket("wss://api.habla.cloud/ws/speech?api_key=YOUR_API_KEY");

ws.onopen = () => {
  ws.send(JSON.stringify({ type: "start" }));
};

ws.onmessage = (event) => {
  if (event.data instanceof Blob) {
    // Audio MP3
    const url = URL.createObjectURL(event.data);
    new Audio(url).play();
  } else {
    const msg = JSON.parse(event.data);
    if (msg.type === "audio") {
      // Procesar chunk de audio
    }
  }
};

// Enviar audio PCM (16 kHz mono, 16-bit)
ws.send(pcmBuffer);

ws.onerror = (err) => console.error(err);
ws.onclose = () => console.log("Conexión cerrada");`,
  },
  {
    id: 'formatos',
    icon: FileCode,
    title: 'Formatos de audio',
    content: 'Habla Push acepta MP3, WAV y WebM. Habla Flow envía PCM 16 kHz mono, 16-bit. La respuesta es MP3.',
  },
]

export default function DocumentacionPage() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto flex max-w-[1200px] gap-12">
        <aside className="hidden w-64 shrink-0 lg:block">
          <nav className="sticky top-24 space-y-2">
            <a href="#quick-start" className="block rounded-lg py-2 text-sm text-text-muted transition-colors hover:text-white">
              Quick start — 5 minutos
            </a>
            {sections.filter((s) => !s.skipNav).map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block rounded-lg py-2 text-sm text-text-muted transition-colors hover:text-white"
              >
                {s.title}
              </a>
            ))}
            <a href="#errores-frecuentes" className="block rounded-lg py-2 text-sm text-text-muted transition-colors hover:text-white">
              Errores frecuentes
            </a>
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-16"
          >
            <div>
              <span className="mb-4 inline-block rounded-full bg-accent/20 px-3 py-1 text-sm font-medium text-accent">
                Documentación en español · Ejemplos listos para copiar
              </span>
              <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Documentación API
              </h1>
              <p className="text-lg text-text-muted">
                Guía para integrar Habla en tu aplicación con Habla Push (REST) y Habla Flow (WebSocket).
              </p>
            </div>

            <section id="quick-start" className="scroll-mt-24 rounded-xl border border-accent/30 bg-accent/5 p-6">
              <div className="mb-4 flex items-center gap-3">
                <Zap className="h-6 w-6 text-accent" />
                <h2 className="text-xl font-semibold text-white">Quick start — 5 minutos</h2>
              </div>
              <ol className="mb-4 list-decimal space-y-3 pl-5 text-text-muted">
                <li>Regístrate gratis y genera tu API key en el Dashboard.</li>
                <li>Instala el cliente o usa cURL. Ejemplo Habla Push:</li>
              </ol>
              <pre className="mb-4 overflow-x-auto rounded-lg border border-border bg-[#09090b] p-4 font-mono text-sm text-white">
                <code>{`curl -X POST https://api.habla.cloud/api/speech \\
  -F "file=@audio.mp3" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code>
              </pre>
              <p className="text-text-muted">
                Para Habla Flow (WebSocket), conecta a <code className="rounded bg-border px-1">wss://api.habla.cloud/ws/speech</code> y envía audio PCM 16 kHz mono.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/registro" className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black no-underline hover:bg-accent-hover">
                  Crear cuenta gratis
                </Link>
                <Link to="/documentacion#autenticacion" className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-border">
                  Ver autenticación
                </Link>
              </div>
            </section>

            {sections.map(({ id, icon: Icon, title, content, code }) => (
              <section key={id} id={id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="h-6 w-6 text-accent" />
                  <h2 className="text-2xl font-semibold text-white">{title}</h2>
                </div>
                <p className="mb-4 text-text-muted">{content}</p>
                {code && (
                  <pre className="overflow-x-auto rounded-lg border border-border bg-[#09090b] p-4 font-mono text-sm text-white">
                    <code>{code}</code>
                  </pre>
                )}
              </section>
            ))}

            <section id="errores-frecuentes" className="scroll-mt-24">
              <div className="mb-4 flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-semibold text-white">Errores frecuentes y troubleshooting</h2>
              </div>
              <div className="space-y-6 text-text-muted">
                <div>
                  <h3 className="mb-1 font-medium text-white">429 Too Many Requests</h3>
                  <p>Has superado el límite de uso. Verifica tu cuota en el Dashboard o actualiza tu plan. Los minutos extra se facturan automáticamente en los planes de pago.</p>
                </div>
                <div>
                  <h3 className="mb-1 font-medium text-white">Timeout / conexión cerrada</h3>
                  <p>Habla Flow mantiene la sesión abierta mientras haya actividad. Si el audio es muy largo sin respuesta del LLM, puede cerrarse. Asegúrate de enviar chunks de audio adecuados (ej. 100–300 ms).</p>
                </div>
                <div>
                  <h3 className="mb-1 font-medium text-white">Formato de audio no soportado</h3>
                  <p>Habla Push acepta MP3, WAV y WebM. Habla Flow requiere PCM 16 kHz mono, 16-bit. Comprueba que el audio cumpla estos requisitos.</p>
                </div>
                <div>
                  <h3 className="mb-1 font-medium text-white">API key inválida o ausente</h3>
                  <p>Incluye el header <code className="rounded bg-border px-1">X-API-Key</code> o <code className="rounded bg-border px-1">Authorization: Bearer YOUR_API_KEY</code> en todas las peticiones. Verifica que la key sea correcta en el Dashboard.</p>
                </div>
              </div>
            </section>

            <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
              <h3 className="mb-2 font-semibold text-white">Obtén tu API key</h3>
              <p className="mb-4 text-text-muted">
                Regístrate gratis y genera tu API key desde el Dashboard. También puedes contactar a hola@habla.cloud para planes Enterprise.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/registro"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black no-underline hover:bg-accent-hover"
                >
                  Crear cuenta gratis
                  <Radio className="h-4 w-4" />
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-border"
                >
                  Ir al Dashboard
                  <Key className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
