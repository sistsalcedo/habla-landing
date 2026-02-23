# PRD – Assistant STS (Speech-to-Speech)

## 1. Resumen del producto

**Assistant STS** es un asistente de voz conversacional que opera en modo Speech-to-Speech (STS): el usuario habla, el sistema transcribe, genera una respuesta con IA y la devuelve en audio. Diseñado para interacción por turnos en español, con dos modos de operación: v1 (HTTP, grabación manual) y v2 (WebSocket, captura continua con detección automática de fin de habla e interrupción por voz).

## 2. Objetivos

| Objetivo | Descripción |
|----------|-------------|
| **Voz a voz** | Usuario habla → recibe respuesta en audio sin interacción por texto |
| **Bajo coste** | Uso de Groq (STT + LLM) y Google TTS para equilibrio coste/calidad |
| **Latencia aceptable** | Pipeline completo en ~2–3 s (STT ~1 s, LLM ~0.65 s con 8B, TTS ~1 s) |
| **Respuestas concisas** | Respuestas breves (1–2 frases, ~50 palabras) para ahorrar tokens y tiempo |
| **Conversación natural (v2)** | Escucha continua, barge-in (interrumpir hablando), feedback sonoro |

## 3. Usuario objetivo

- Desarrolladores y curiosos que quieren prototipar un asistente de voz.
- Uso en local (backend en PC, frontend en navegador).

## 4. Flujo de usuario

### Modo v1 (HTTP)

1. **Idle**: Pantalla con micrófono, mensaje "Toca el micrófono para empezar".
2. **Escuchando**: Usuario toca micrófono, graba, efecto visual en el botón.
3. **Pensando**: Usuario para de grabar, audio se envía al backend; mensaje "Pensando..."; pitido breve + pulsos de carga.
4. **Hablando**: Backend devuelve audio MP3; se reproduce y se muestran barras animadas.
5. **Idle**: Reproduce otro turno o pulsa × para finalizar y limpiar historial.

### Modo v2 (WebSocket)

1. **Idle**: Pantalla con micrófono; selector V1/V2 visible.
2. **Escuchando**: Usuario toca micrófono; captura continua; detección automática de fin de habla (VAD).
3. **Pensando**: Pitido breve + pulsos de carga; micrófono permanece encendido.
4. **Hablando**: Barras animadas; el usuario puede interrumpir hablando (barge-in); o apagar el mic (la IA sigue hablando hasta terminar).
5. **Idle o Escuchando**: Tras la respuesta, vuelve a Escuchando; o × para finalizar.

## 5. Stack técnico

| Capa | Tecnología |
|------|------------|
| **STT** | Groq Whisper (whisper-large-v3) |
| **LLM** | Groq Llama (llama-3.1-8b-instant; configurable en `backend/config.py`) |
| **TTS** | Google Cloud Text-to-Speech (es-ES-Neural2-B) |
| **Backend** | FastAPI, Python 3.10+ |
| **Frontend** | React 18, Vite, Tailwind CSS |
| **v2** | WebSocket, Silero VAD, streaming LLM/TTS, Web Audio API |

## 6. Requisitos funcionales

### RF1. Transcripción (STT)

- Entrada: audio WebM (v1) o PCM 16 kHz (v2).
- Salida: texto en español.
- Límite de archivo: 25 MB.

### RF2. Generación de respuesta (LLM)

- Entrada: texto transcrito + historial de conversación.
- Salida: respuesta breve (máx. ~150 tokens, ~50 palabras).
- System prompt orientado a respuestas concisas para voz.
- Historial preservado al interrumpir (turno se añade cuando el stream termina).

### RF3. Síntesis de voz (TTS)

- Entrada: texto de respuesta.
- Salida: audio MP3.
- Voz: español (es-ES-Neural2-B).
- Troceo automático si el texto supera 5000 bytes.
- v2: streaming por frases.

### RF4. Orquestación

- **v1**: Pipeline síncrono STT → LLM → TTS.
- **v2**: WebSocket, pipeline asíncrono con streaming.
- Errores HTTP/claro al usuario (400, 413, 429, 500, 503).
- CORS configurado para desarrollo (localhost).

### RF5. Frontend

- Estados: idle, Escuchando, Pensando, Hablando.
- **v1**: Grabación con MediaRecorder (WebM); pulsar mic para enviar.
- **v2**: Captura PCM continua; VAD para fin de habla; StreamingAudioPlayer.
- Efecto visual en micrófono según estado; barras animadas en Hablando.
- Toggle V1/V2 en página principal (acceso rápido).
- ConfigModal: presets, prompt, max_tokens, temperature (sin toggle de modo).

### RF6. Barge-in (v2)

- Detección de voz del usuario mientras el asistente habla.
- Parada instantánea del audio (Web Audio API + GainNode).
- Envío de `interrupt` al backend; cancelación del pipeline.
- Historial de conversación preservado.

### RF7. Feedback sonoro

- Pitido breve al iniciar estado "Pensando".
- Pulsos suaves intermitentes mientras procesa.
- Sonidos se cortan al empezar la respuesta o en error/fin.

### RF8. Micrófono durante Hablando (v2)

- Al pulsar mic para apagar: solo se libera el mic; la IA sigue hablando.
- Al terminar la respuesta: pasa a IDLE si el mic estaba apagado.

## 7. Requisitos no funcionales

### RNF1. Latencia

- Total objetivo: < 5 s en condiciones normales.
- Log de latencia por etapa (STT, LLM, TTS) en consola del backend.
- Barge-in: detección + parada < 200 ms.

### RNF2. Mitigaciones

- **429 (rate limit)**: Retry con backoff y mensaje claro al usuario.
- **Archivo grande**: Rechazo 413 si > 25 MB.
- **Secrets**: Solo en `.env`; credenciales fuera de control de versiones.

### RNF3. Seguridad

- Validación de tamaño de audio.
- No exponer claves en el frontend.

## 8. Alcance

**En alcance:**

- STT + LLM + TTS síncrono (v1).
- Streaming de audio (v2): WebSocket + VAD + LLM/TTS streaming.
- Barge-in (interrupción por voz) con parada instantánea.
- Sonidos de feedback (pensando, carga).
- UI con micrófono, estados, toggle V1/V2, configuración de modelo.
- Historial en memoria (preservado al interrumpir).
- Log de latencia para desarrollo.

**Fuera de alcance:**

- Autenticación de usuarios.
- Persistencia de historial en base de datos.
- Soporte multiidioma más allá del español.
- Echo cancellation (AEC) — recomendar auriculares para evitar falsos barge-in.

## 9. Métricas de éxito

- Pipeline funciona de extremo a extremo (grabar → respuesta en audio).
- Latencia total < 5 s en condiciones normales.
- Errores 429 y límites manejados sin crashear.
- Barge-in responde en < 200 ms.
- Historial coherente tras interrupciones.
- Documentación suficiente para clonar, configurar y ejecutar.
