# AGENTS.md – Guía para Agentes de IA

Instrucciones para que agentes de IA (Cursor, Copilot, etc.) trabajen en este proyecto de forma coherente.

---

## Propósito del proyecto

**Habla**: API Speech-to-Speech en español. Dos productos comerciales:

| Producto      | Nombre        | Tipo        | Endpoint básico             |
|---------------|---------------|-------------|-----------------------------|
| v1            | **Habla Push**| REST API    | `POST /api/speech`          |
| v2            | **Habla Flow**| WebSocket   | `wss://.../ws/speech`       |

---

## Stack técnico

| Capa           | Tecnología / servicio                                    |
|----------------|----------------------------------------------------------|
| STT            | Groq Whisper (`whisper-large-v3`)                        |
| LLM            | Groq Llama (`llama-3.1-8b-instant`)                      |
| TTS            | Google Cloud Text-to-Speech                              |
| Backend API    | FastAPI (Python 3.10+), WebSocket nativo de Starlette    |
| Frontend demo  | React 18 + Vite + Tailwind CSS                           |
| Streaming v2   | Web Audio API (AudioContext), WebSocket, Silero VAD      |
| Infra backend  | Railway (Dockerfile propio, PyTorch CPU)                 |
| Infra frontend | Vercel (build Vite, dominio `*.vercel.app`)              |
| Datos negocio  | Supabase (plan futuro: usuarios, uso, facturación)       |

El backend vive en `backend/`, la demo en `frontend/` y la landing comercial en un repo aparte (`landingpage_S2S`).

---

## Estado actual (Feb 2026)

### Despliegue

- **Backend**: Railway, `https://habla-production-4088.up.railway.app`
- **Frontend demo**: Vercel, [habla-lilac.vercel.app](https://habla-lilac.vercel.app) (para demos)
- **Landing** (landingpage_S2S): Pendiente desplegar (repo aparte)

### Implementado

- **Habla Push**: `POST /api/speech` – grabación batch, respuesta MP3.
- **Habla Flow**: WebSocket `/ws/speech` – Silero VAD, LLM streaming, TTS por frases, barge-in.
- **Config**: `GOOGLE_APPLICATION_CREDENTIALS_JSON` para Railway (escribe JSON a temp file).
- **Torch CPU**: requirements.txt usa PyTorch CPU para reducir tamaño de build.
- **Dockerfile** en `backend/` para Railway (evita error Railpack).
- **CORS**: backend permite `localhost`, `127.0.0.1` y `*.vercel.app`.

### Variables de entorno

| Dónde   | Variable / archivo                    | Uso principal                               |
|---------|----------------------------------------|--------------------------------------------|
| Railway | `GROQ_API_KEY`                        | API Groq (STT + LLM)                        |
| Railway | `GOOGLE_APPLICATION_CREDENTIALS_JSON` | Contenido del JSON de cuenta de servicio TTS|
| Local   | `.env` (raíz)                         | Backend local: Groq, Google TTS, Supabase   |
| Frontend| `frontend/.env`                       | `VITE_WS_URL`, `VITE_API_URL` para la demo  |
| Vercel  | Variables de proyecto                 | `VITE_WS_URL`, `VITE_API_URL` (frontend prod)|

#### Detalle `.env` (raíz)

Este archivo **no debe commitearse** en otros entornos. Ejemplo de contenido (ver también `.env.example`):

- `GROQ_API_KEY`: clave de la cuenta Groq para Whisper + Llama.
- `GOOGLE_APPLICATION_CREDENTIALS`: ruta local al JSON de cuenta de servicio de Google Cloud TTS.
- `VITE_WS_URL` (opcional en local): URL WebSocket de Habla Flow si se quiere apuntar al backend remoto en vez de al proxy de Vite.
- `SUPABASE_URL` (opcional): URL del proyecto Supabase para el backend de negocio (usuarios, uso, etc.).
- `SUPABASE_SERVICE_ROLE_KEY` (opcional): clave de servicio de Supabase **solo para backend**, nunca exponer en frontend.

El backend (`backend/main.py`) carga primero `.env` de la raíz del repo y luego `.env` dentro de `backend/` si existe.

#### Detalle `frontend/.env`

Usado por Vite para inyectar variables solo en el frontend:

```env
VITE_WS_URL=wss://habla-production-4088.up.railway.app/ws/speech
VITE_API_URL=https://habla-production-4088.up.railway.app
```

En desarrollo se puede omitir y utilizar el proxy de Vite (ver `vite.config.js`). En producción (Vercel) se definen como variables del proyecto.

### Frontend – conexión a la API

`frontend/src/api.js` resuelve la URL de la API y del WebSocket según el entorno:

- **Localhost** (`localhost` / `127.0.0.1`):
  - API REST → `http://127.0.0.1:8000` (proxy de Vite para `/api`, `/health`, `/ws`).
  - WebSocket → `ws://127.0.0.1:8000/ws/speech`.
- **Producción en Vercel** (`*.vercel.app`):
  - Si existen `VITE_API_URL` y `VITE_WS_URL` → se usan esas URLs.
  - Si no existen → fallback directo a Railway (`RAILWAY_API` y `RAILWAY_WS`).
- **Dominio propio**:
  - Se deben definir obligatoriamente `VITE_API_URL` y `VITE_WS_URL` en Vercel.

### Compatibilidad móvil

| Plataforma | Habla Push | Habla Flow |
|------------|------------|------------|
| **Desktop** | ✅ | ✅ |
| **Android Chrome** | ✅ | ✅ |
| **iOS Safari** | ✅ | ⚠️ Limitaciones: autoplay, WebSocket tras errores de reproducción |

En iOS, Safari y Chrome usan WebKit; Habla Flow puede dar "Error de reproducción" o "Error de conexión WebSocket" tras el primer turno. Habla Push suele funcionar bien.

---

## Estructura del proyecto (Opción A – monorepo)

```
habla/
├── backend/                    # API (Habla Push + Habla Flow)
│   ├── main.py
│   ├── ws_routes.py
│   ├── config.py               # GOOGLE_APPLICATION_CREDENTIALS_JSON
│   ├── Dockerfile
│   ├── requirements.txt        # torch CPU
│   └── services/
├── frontend/                   # Demo para probar la API
│   ├── .env                    # VITE_WS_URL, VITE_API_URL
│   └── src/
├── landingpage_S2S/            # Landing de marketing (pendiente)
├── docs/
│   ├── AGENTS_landingpage.md
│   └── ESTRUCTURA_PROYECTO.md
├── .gitignore
└── README.md
```

---

## API principal

| Método | Ruta           | Descripción                    |
|--------|----------------|--------------------------------|
| GET    | /              | Info básica                    |
| GET    | /health        | Estado del servicio            |
| GET    | /api/ws-url    | URL WebSocket (dev)            |
| GET/PUT| /api/config    | Config del modelo (prompt, tokens, temp) |
| POST   | /api/speech    | Habla Push – audio → MP3       |
| POST   | /api/clear-history | Limpia historial           |
| WS     | /ws/speech     | Habla Flow – streaming         |

**WebSocket (Habla Flow)**:
- `{"type":"start"}` – Inicia turno
- `{"type":"stop"}` – Procesa audio
- `{"type":"interrupt"}` – Barge-in
- `{"type":"close"}` – Cierra
- `{"type":"ping"}` / `{"type":"pong"}` – Keepalive

---

## Pendientes

1. ~~Desplegar frontend demo en Vercel~~ ✓
2. Desplegar landing (landingpage_S2S) en Vercel (repo aparte).
3. (Opcional) Mitigar limitaciones de Habla Flow en iOS Safari.
4. (Opcional) API key / autenticación para monetizar.

---

## Convenciones

- Python: snake_case, type hints.
- JS/JSX: camelCase, mensajes en español.
- No commitear `.env`, credenciales, `gen-lang-client-*.json`.

---

## Referencias

- Consumo API: [docs/ESTRUCTURA_PROYECTO.md](docs/ESTRUCTURA_PROYECTO.md)
- Landing: [docs/AGENTS_landingpage.md](docs/AGENTS_landingpage.md)
