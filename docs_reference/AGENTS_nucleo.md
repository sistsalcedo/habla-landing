# AGENTS.md – Guía para Agentes de IA

Instrucciones para que agentes de IA (Cursor, Copilot, etc.) trabajen en este proyecto de forma coherente.

---

## Propósito del proyecto

**Habla**: API Speech-to-Speech en español. Dos productos comerciales:

| Producto      | Nombre    | Tipo        | Endpoint                  |
|---------------|-----------|-------------|---------------------------|
| v1            | **Habla Push**  | REST API    | `POST /api/speech`        |
| v2            | **Habla Flow**  | WebSocket   | `wss://.../ws/speech`     |

**Stack**: Groq STT + Groq LLM + Google TTS. Backend FastAPI, frontend React + Vite + Tailwind.

---

## Estado actual (Feb 2026)

### Despliegue

- **Backend**: Railway, online en `https://habla-production-4088.up.railway.app`
- **Frontend demo**: Vercel (online). Actualiza la URL en docs si usas otro dominio.
- **Landing** (landingpage_S2S): Pendiente desplegar (repo aparte)

### Implementado

- **Habla Push**: `POST /api/speech` – grabación batch, respuesta MP3.
- **Habla Flow**: WebSocket `/ws/speech` – Silero VAD, LLM streaming, TTS por frases, barge-in.
- **Config**: `GOOGLE_APPLICATION_CREDENTIALS_JSON` para Railway (escribe JSON a temp file).
- **Torch CPU**: requirements.txt usa PyTorch CPU para reducir tamaño de build.
- **Dockerfile** en `backend/` para Railway (evita error Railpack).

### Variables de entorno

| Dónde   | Variable                         | Uso                                  |
|---------|----------------------------------|--------------------------------------|
| Railway | `GROQ_API_KEY`                   | API Groq                             |
| Railway | `GOOGLE_APPLICATION_CREDENTIALS_JSON` | Contenido del JSON de cuenta de servicio |
| Local   | `.env` (raíz)                    | `GOOGLE_APPLICATION_CREDENTIALS` = ruta al JSON |
| Frontend| `frontend/.env`                  | `VITE_WS_URL`, `VITE_API_URL` para conectar a la API |
| Vercel  | Variables de proyecto            | `VITE_WS_URL`, `VITE_API_URL` (igual que local)      |

### Frontend – conectar a Railway

En `frontend/.env`:

```env
VITE_WS_URL=wss://habla-production-4088.up.railway.app/ws/speech
VITE_API_URL=https://habla-production-4088.up.railway.app
```

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
3. (Opcional) API key / autenticación para monetizar.

---

## Convenciones

- Python: snake_case, type hints.
- JS/JSX: camelCase, mensajes en español.
- No commitear `.env`, credenciales, `gen-lang-client-*.json`.

---

## Referencias

- Consumo API: [docs/ESTRUCTURA_PROYECTO.md](docs/ESTRUCTURA_PROYECTO.md)
- Landing: [docs/AGENTS_landingpage.md](docs/AGENTS_landingpage.md)
