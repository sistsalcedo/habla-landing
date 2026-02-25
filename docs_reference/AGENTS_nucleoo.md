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

| Capa            | Tecnología / servicio                                   |
|-----------------|---------------------------------------------------------|
| STT             | Groq Whisper (`whisper-large-v3`)                       |
| LLM             | Groq Llama (`llama-3.1-8b-instant`)                     |
| TTS             | Google Cloud Text-to-Speech                             |
| Backend API     | FastAPI (Python 3.10+), WebSocket nativo de Starlette   |
| Frontend demo   | React 18 + Vite + Tailwind CSS                          |
| Streaming v2    | Web Audio API (AudioContext), WebSocket, Silero VAD     |
| Auth / Billing  | Supabase (`habla_profiles`, `usage`), API key opcional  |
| Infra backend   | Railway (Dockerfile, PyTorch CPU)                       |
| Infra frontend  | Vercel (Vite build, `*.vercel.app`)                     |

El backend está en `backend/`, la demo en `frontend/` y la landing comercial en un repo aparte (`landingpage_S2S`). La landing usa Supabase Auth, dashboard con API key/uso, y comparte las tablas `habla_profiles` y `usage` con el backend. Ver [docs/AGENTS_landingpage.md](docs/AGENTS_landingpage.md).

---

## Estado actual (Feb 2026)

### Despliegue

| Servicio       | Plataforma | URL |
|----------------|------------|-----|
| Backend        | Railway    | `https://habla-production-4088.up.railway.app` |
| Frontend demo  | Vercel     | [habla-lilac.vercel.app](https://habla-lilac.vercel.app) |
| Landing        | Pendiente  | Repo aparte |

### Implementado

- **Habla Push**: `POST /api/speech` – grabación batch, respuesta MP3.
- **Habla Flow**: WebSocket `/ws/speech` – Silero VAD, LLM streaming, TTS por frases, barge-in.
- **Config del modelo**: `GET/PUT /api/config` – prompt, max_tokens, temperatura.
- **Supabase** (opcional): autenticación por API key, control de uso (minutos por plan).
- **Credenciales Railway**: `GOOGLE_APPLICATION_CREDENTIALS_JSON` – escribe JSON en archivo temporal.
- **PyTorch CPU**: `requirements.txt` usa build CPU para Silero VAD (reduce tamaño en Railway).
- **Dockerfile** en `backend/` para Railway.
- **CORS**: permite `localhost`, `127.0.0.1` y `*.vercel.app`.
- **Frontend**: fallback automático a Railway cuando se sirve en `*.vercel.app`.

### API key (opcional)

Si Supabase está configurado (`SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`), se puede enviar:

- `X-API-Key: <api_key>` o `Authorization: Bearer <api_key>`

Si no hay API key, se trata como demo sin límites. Si hay API key, se valida contra `habla_profiles` y se aplican las cuotas de minutos según el plan.

---

## Variables de entorno

| Dónde    | Variable / archivo                    | Uso principal                                |
|----------|---------------------------------------|----------------------------------------------|
| Railway  | `GROQ_API_KEY`                        | API Groq (STT + LLM)                         |
| Railway  | `GOOGLE_APPLICATION_CREDENTIALS_JSON` | Contenido del JSON de cuenta de servicio TTS |
| Railway  | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Opcional: billing y API key             |
| Local    | `.env` (raíz)                         | Backend: Groq, Google TTS, Supabase          |
| Frontend | `frontend/.env`                       | `VITE_WS_URL`, `VITE_API_URL` para la demo   |
| Vercel   | Variables de proyecto                 | `VITE_WS_URL`, `VITE_API_URL` (frontend prod)|

### Detalle `.env` (raíz)

**No debe commitearse.** Ver `.env.example` para plantilla.

| Variable                          | Obligatorio | Descripción |
|-----------------------------------|------------|-------------|
| `GROQ_API_KEY`                    | Sí         | Clave Groq para Whisper + Llama |
| `GOOGLE_APPLICATION_CREDENTIALS`  | Sí (local) | Ruta al JSON de cuenta de servicio Google TTS |
| `VITE_WS_URL`                     | No         | WebSocket (en raíz: uso local; en `frontend/.env`: prod) |
| `SUPABASE_URL`                    | No         | URL del proyecto Supabase (billing / API key) |
| `SUPABASE_SERVICE_ROLE_KEY`       | No         | Service role key de Supabase (solo backend) |

El backend (`main.py`) carga `.env` de la raíz y luego `backend/.env` si existe.

### Detalle `frontend/.env`

Para desarrollo local cuando se apunta al backend en Railway:

```env
VITE_WS_URL=wss://habla-production-4088.up.railway.app/ws/speech
VITE_API_URL=https://habla-production-4088.up.railway.app
```

En local con proxy de Vite se puede omitir. En Vercel se definen como variables del proyecto.

---

## Frontend – conexión a la API

`frontend/src/api.js` resuelve las URLs en runtime:

| Entorno     | API REST | WebSocket |
|-------------|----------|-----------|
| Localhost   | `http://127.0.0.1:8000` (proxy Vite) | `ws://127.0.0.1:8000/ws/speech` |
| `*.vercel.app` | `VITE_API_URL` o fallback Railway | `VITE_WS_URL` o fallback Railway |
| Dominio propio | `VITE_API_URL` (obligatorio) | `VITE_WS_URL` (obligatorio) |

---

## Compatibilidad móvil

| Plataforma       | Habla Push | Habla Flow |
|------------------|------------|------------|
| Desktop          | ✅         | ✅         |
| Android Chrome   | ✅         | ✅         |
| iOS Safari       | ✅         | ⚠️ Limitaciones: autoplay, WebSocket tras errores |

En iOS, Safari y Chrome usan WebKit. Habla Flow puede dar "Error de reproducción" o "Error de conexión WebSocket" tras el primer turno. Habla Push suele funcionar bien.

---

## Estructura del proyecto

```
assistant_STS/
├── backend/                       # API (Habla Push + Habla Flow)
│   ├── main.py                    # FastAPI, rutas REST
│   ├── ws_routes.py               # WebSocket Habla Flow
│   ├── config.py                  # Credenciales, VAD, modelos
│   ├── auth_dep.py                # Dep: API key opcional, cuotas
│   ├── billing.py                 # Supabase: profiles, usage
│   ├── supabase_client.py         # Cliente Supabase
│   ├── runtime_config.py          # Config del modelo (prompt, tokens)
│   ├── Dockerfile                 # Railway
│   ├── requirements.txt           # torch CPU, supabase
│   └── services/
│       ├── stt.py, llm.py, llm_stream.py, tts.py, tts_stream.py
│       └── vad.py                 # Silero VAD
├── frontend/                      # Demo React + Vite
│   ├── .env                       # VITE_WS_URL, VITE_API_URL
│   └── src/
│       ├── App.jsx
│       ├── api.js                 # Resolución URLs API/WS
│       ├── hooks/useVoiceSession.js
│       └── utils/
├── docs/
│   ├── AGENTS_landingpage.md
│   └── ESTRUCTURA_PROYECTO.md
├── .env                           # No commitear
├── .env.example
├── .gitignore
└── README.md
```

---

## API principal

| Método   | Ruta               | Descripción |
|----------|--------------------|-------------|
| GET      | /                  | Info básica |
| GET      | /health            | Estado del servicio |
| GET      | /api/ws-url        | URL WebSocket (dev) |
| GET/PUT  | /api/config        | Config del modelo (prompt, max_tokens, temperatura) |
| POST     | /api/speech        | Habla Push – audio → MP3 |
| POST     | /api/clear-history | Limpia historial de conversación |
| WS       | /ws/speech         | Habla Flow – streaming |

**WebSocket (Habla Flow)**:
- `{"type":"start"}` – Inicia turno
- `{"type":"stop"}` – Procesa audio
- `{"type":"interrupt"}` – Barge-in
- `{"type":"close"}` – Cierra
- `{"type":"ping"}` / `{"type":"pong"}` – Keepalive

---

## Pendientes

1. ~~Desplegar frontend demo en Vercel~~ ✓
2. Landing (landingpage_S2S): implementada con Supabase Auth, dashboard, API key. Pendiente desplegar (repo aparte).
3. (Opcional) Mitigar limitaciones de Habla Flow en iOS Safari.
4. (Opcional) Integrar billing completo con Supabase en producción.

---

## Convenciones

- Python: snake_case, type hints.
- JS/JSX: camelCase, mensajes en español.
- No commitear `.env`, credenciales, `gen-lang-client-*.json`, `SUPABASE_SERVICE_ROLE_KEY`.

---

## Referencias

- Consumo API: [docs/ESTRUCTURA_PROYECTO.md](docs/ESTRUCTURA_PROYECTO.md)
- Landing: [docs/AGENTS_landingpage.md](docs/AGENTS_landingpage.md)
- PRD: [docs/PRD.md](docs/PRD.md)
- CHECKLIST_V2: [CHECKLIST_V2.md](CHECKLIST_V2.md)
