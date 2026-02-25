# AGENTS.md – Guía para Agentes de IA

Instrucciones para que agentes de IA (Cursor, Copilot, etc.) trabajen en este proyecto de forma coherente.

---

## Propósito del proyecto

**Habla** (antes Assistant STS): Landing page de marketing + panel ligero para promocionar la API Speech-to-Speech en español.  
Este proyecto:

- Capta leads y altas (registro) para la API.
- Expone documentación básica y precios.
- Permite a un usuario autenticado ver su API key y uso estimado de minutos.

**Stack**: React 18 + Vite + Tailwind CSS + Framer Motion + React Router + Supabase (Auth/DB) + Edge Functions.

**Arquitectura (landing)**:

- SPA estática desplegada en **Vercel**.
- **Supabase Auth** para login/registro (Google OAuth + email/contraseña).
- **Supabase Postgres** con tablas `habla_profiles` y `usage` para perfiles y consumo.
- **Edge Function `generate-api-key`** en Supabase para generar/regenerar API keys.
- **Formspree** para Newsletter y formulario de contacto.

**Relación con el proyecto núcleo (`assistant_STS` en Railway)**:

- Este repo es solo **landing + dashboard ligero**.
- El backend real que procesa audio (STT/TTS/LLM) vive en otro repo/proyecto: ver `docs_reference/AGENTS_nucleo.md`.
- Ambos comparten la misma base de datos Supabase (tablas `habla_profiles` y `usage`) para perfiles y métricas.

---

## Estado actual (Feb 2026)

### Implementado (landing)

- **Landing principal**: Hero, Trust signals, Producto (Habla Push REST + Habla Flow WebSocket), Precios, API code block, Testimonios, CTA, Footer.
- **Rutas**: `/`, `/login`, `/registro`, `/dashboard`, `/documentacion`, `/terminos`, `/privacidad`, `/contacto`.
- **SEO**: Meta tags, Open Graph, Twitter Card, Schema.org, robots.txt, sitemap.xml, favicon.
- **Marketing**:
  - Newsletter en footer conectada a **Formspree** (si hay `VITE_FORMSPREE_NEWSLETTER_ID`).
  - Formulario de contacto conectado a **Formspree** (si hay `VITE_FORMSPREE_CONTACT_ID`).
- **Auth (Supabase)**:
  - Registro/login con email+contraseña.
  - Login con Google OAuth (si está configurado en Supabase).
  - Redirecciones y estado de sesión gestionados en `AuthContext`.
- **Dashboard**:
  - Ruta protegida `/dashboard` (redirige a `/login` si no hay sesión).
  - Muestra plan, minutos incluidos y minutos usados leyendo tablas `habla_profiles` y `usage`.
  - Bloque de **API Key**:
    - Botón “Generar API key” → llama a Edge Function `generate-api-key` (Supabase).
    - Almacena `api_key_hash` hasheado en `habla_profiles`.
    - Permite regenerar API key (invalida la anterior).
    - Copiado de API key al portapapeles.
- **Integraciones**:
  - **Supabase** como BaaS (Auth + DB + Edge Functions).
  - **Formspree** para Newsletter/Contacto.
  - **Google Analytics 4** listo vía componente `GoogleAnalytics` (solo si `VITE_GA_MEASUREMENT_ID` está definido).
- **Responsive**: Nav con menú hamburguesa en móvil; secciones adaptadas a desktop/móvil.
- **Enlaces**: Todos los `href="#"` sustituidos por rutas reales; Nav "Contacto" va a `/contacto`.

### Archivos clave

- `index.html` — Meta tags, Schema.org, fuentes, configuración base.
- `src/App.jsx` — Rutas y layout (Nav + Footer, ruta protegida de Dashboard).
- `src/pages/` — HomePage, LoginPage, RegistroPage, DashboardPage, DocumentacionPage, TerminosPage, PrivacidadPage, ContactoPage.
- `src/components/` — Nav, Hero, TrustSignals, ProductCards, PricingCards, CodeBlock, Testimonials, CTASection, Footer, ProtectedRoute, GoogleAnalytics.
- `public/` — favicon.svg, og-image.svg, robots.txt, sitemap.xml.
- `src/lib/supabase.js` — cliente Supabase (usa `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`, con fallback de placeholder en desarrollo sin `.env`).
- `src/contexts/AuthContext.jsx` — provider de autenticación (login, registro, Google OAuth, signOut).
- `supabase/migrations/001_habla_profiles_and_usage.sql` — tablas `habla_profiles` y `usage` + trigger de creación de perfil.
- `supabase/functions/generate-api-key/index.ts` — Edge Function para generar/regenerar API key.
- `SEO-MARKETING.md` — Checklist SEO/marketing y pendientes.

---

## Estructura del proyecto

```
landingpage_S2S/
├── public/
│   ├── favicon.svg
│   ├── og-image.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── TrustSignals.jsx
│   │   ├── ProductCards.jsx
│   │   ├── PricingCards.jsx
│   │   ├── CodeBlock.jsx
│   │   ├── Testimonials.jsx
│   │   ├── CTASection.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegistroPage.jsx
│   │   ├── DocumentacionPage.jsx
│   │   ├── TerminosPage.jsx
│   │   ├── PrivacidadPage.jsx
│   │   └── ContactoPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── docs_reference/          # Referencia del proyecto núcleo
│   ├── AGENTS_nucleo.md
│   ├── CHAT_IA.txt
│   └── PRD.md
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
├── SEO-MARKETING.md
├── PRD.md
└── AGENTS.md
```

---

## Rutas

| Ruta | Página | Contenido |
|------|--------|-----------|
| `/` | HomePage | Landing completa |
| `/login` | LoginPage | Formulario login (UI only) |
| `/registro` | RegistroPage | Formulario registro (UI only) |
| `/documentacion` | DocumentacionPage | Plantilla API docs |
| `/terminos` | TerminosPage | Términos de servicio |
| `/privacidad` | PrivacidadPage | Política de privacidad |
| `/contacto` | ContactoPage | Formulario contacto (UI only) |

---

## Navegación

- **Nav**: Logo → `/`; Producto, Precios, API → scroll en home, `/#producto` etc. fuera de home; Contacto → `/contacto` siempre.
- **Footer**: Enlaces internos con `useLocation` para saber si scroll o `Link` a home con hash.
- **Hash scroll**: HomePage tiene `useEffect` para scroll a `#producto`, `#precios`, etc. cuando la URL incluye hash.

---

## Convenciones de código

### React/JSX

- Componentes en PascalCase.
- camelCase para funciones y variables.
- Comentarios y mensajes al usuario en español.
- Usar `Link` de React Router para navegación interna; `href` solo para `mailto:` o enlaces externos.

### Tailwind

- Usar clases de `tailwind.config.js` (accent, bg-card, text-muted, border, etc.).
- No crear clases CSS personalizadas salvo necesidad; preferir utilidades de Tailwind.

### Archivos

- No commitear `.env`, credenciales ni `node_modules/`. Ver `.gitignore`.
- `dist/` está en `.gitignore`; se regenera con `npm run build`.

---

## Variables de entorno (landing)

- `VITE_SUPABASE_URL` — URL del proyecto Supabase.
- `VITE_SUPABASE_ANON_KEY` — Anon public key. Ver `.env.example`.
- `VITE_FORMSPREE_NEWSLETTER_ID` — ID de formulario Formspree para Newsletter.
- `VITE_FORMSPREE_CONTACT_ID` — ID de formulario Formspree para Contacto.
- `VITE_GA_MEASUREMENT_ID` — ID de medición GA4 (opcional).

En Vercel: añadir las mismas variables en Project Settings > Environment Variables.

## Supabase – URL Configuration (Vercel)

Tras desplegar en Vercel, en Supabase Auth > URL Configuration:
- **Site URL**: `https://habla-landing.vercel.app` (o tu dominio final).
- **Redirect URLs**: incluir al menos:
  - `https://habla-landing.vercel.app/*`
  - `https://habla-landing.vercel.app/resetear*` (reset contraseña)
  - Cualquier dominio personalizado que se añada (mismas rutas).

## Pendientes (landing) – ver también `SEO-MARKETING.md`

1. **Dominio**: Reemplazar `habla.io` por dominio real en index.html, `public/`, componentes y docs.
2. **Analytics**: Definir `VITE_GA_MEASUREMENT_ID` y revisar que `GoogleAnalytics` se cargue solo en producción.
3. **Testimonios**: Sustituir placeholders en `Testimonials.jsx` por casos reales (o más creíbles).
4. **Contenido de documentación**: Ampliar `DocumentacionPage.jsx` con endpoints reales (Push/Flow) y ejemplos actualizados del backend.
5. **Branding**: Revisar logo, og-image y textos para alinearlos con el naming final del producto y la estrategia de pricing.

---

## Despliegue (Vercel)

- **Root Directory**: `./` (o vacío) — todo está en la raíz.
- **Framework Preset**: Vite (auto-detectado).
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install` (por defecto)

Pasos recomendados:

1. Conectar repo de GitHub en [vercel.com](https://vercel.com).
2. Definir variables de entorno (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_FORMSPREE_*`, `VITE_GA_MEASUREMENT_ID`).
3. Deploy.
4. Verificar en producción `/login`, `/registro`, `/dashboard`, Newsletter y Contacto.

---

## Antes de cambiar algo

1. Revisar `SEO-MARKETING.md` para estado SEO y marketing.
2. Si modificas rutas: actualizar `sitemap.xml` y enlaces en Nav/Footer.
3. Si cambias el dominio: buscar `habla.io` en todo el proyecto.
4. Para el producto API real: ver `docs_reference/AGENTS_nucleo.md` (proyecto separado, backend en Railway).

---

## Relación con backend `assistant_STS` (Railway) y tareas pendientes

El backend de la API Habla (proyecto `assistant_STS`, desplegado en Railway) es responsable de procesar audio y aplicar la lógica de negocio. La landing **no** llama directamente a Railway; ambos proyectos comparten Supabase como capa de datos.

### Qué ya existe en Supabase

- Tabla `habla_profiles` (un perfil por `auth.users` + campos de plan, minutos incluidos, ciclo, `api_key_hash`).
- Tabla `usage` (registro de minutos usados por perfil y producto `push` / `flow`).
- Trigger que crea automáticamente un `habla_profiles` al registrarse un usuario en `auth.users`.
- Edge Function `generate-api-key` que:
  - Valida el JWT del usuario autenticado.
  - Genera una API key `habla_...`, calcula su hash SHA-256 y lo guarda en `habla_profiles.api_key_hash`.
  - Devuelve la API key en texto plano para mostrarla una sola vez en el Dashboard.

### Lo que debe hacer el backend `assistant_STS`

1. **Validar API key en cada request a la API de voz**
   - Leer la API key de `X-API-Key` o `Authorization: Bearer <API_KEY>`.
   - Calcular el hash SHA-256 con el mismo algoritmo que la Edge Function.
   - Buscar en `habla_profiles` la fila con ese `api_key_hash` usando `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (solo en servidor).
   - Si no hay match → responder 401 (key inválida/expirada).
   - Si hay match → obtener `profile_id`, `plan`, `minutos_incluidos`, `ciclo_desde` y usarlo para aplicar límites.

2. **Registrar uso de minutos**
   - Tras procesar una petición (Push REST o Flow WebSocket), insertar una fila en `usage`:
     - `profile_id` (de `habla_profiles`).
     - `minutos` (o fracción equivalente según la unidad acordada).
     - `producto` (`'push'` o `'flow'`).
   - Este INSERT debe hacerse con la **service_role** (bypasa RLS), nunca con la anon key.
   - El Dashboard de la landing ya está preparado para leer de `usage` y mostrar el uso por ciclo actual.

3. **Aplicar límites de plan (100 min/mes para free)**
   - Antes de aceptar una petición, sumar el uso del ciclo actual (`usage` desde `ciclo_desde`) y compararlo con `minutos_incluidos`.
   - Si se supera el límite del plan:
     - O bien rechazar la petición (429/402) con mensaje claro.
     - O bien permitirla pero marcarla para facturación adicional (según estrategia futura).

4. **Futuro: Billing e integración con pasarela de pago**
   - Integrar proveedor de pagos (Stripe / Culqi / Kushki, según decisión final).
   - Sincronizar upgrades de plan y límites (`plan`, `minutos_incluidos`, `ciclo_desde`) con Supabase.

> Nota para agentes: toda la lógica anterior vive en el repo del backend (`assistant_STS`). Este repo solo debe conocer:
> - Cómo mostrar la API key y el uso que ya existen en Supabase.
> - Cómo guiar al usuario hacia la documentación de la API y flujos de upgrade/pago una vez estén implementados en el backend.

---

## Comandos

```bash
npm run dev      # Desarrollo (Vite, hot reload)
npm run build    # Producción → dist/
npm run preview  # Preview del build
```
