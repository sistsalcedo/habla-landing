# PRD – Landing Page Habla

## 1. Resumen del producto

**Landing page de marketing** para la API **Habla** (Speech-to-Speech en español). Sitio web estático que promociona dos productos comerciales — **Habla Push** (REST) y **Habla Flow** (WebSocket) — con el objetivo de captar leads, mostrar precios, documentar el uso de la API y facilitar el registro y contacto.

## 2. Objetivos

| Objetivo | Descripción |
|----------|-------------|
| **Captación** | Generar leads y registros a través de CTAs y formularios |
| **Información** | Mostrar claramente productos, precios y ejemplos de uso |
| **Conversión** | Guiar al usuario hacia registro, prueba gratuita o contacto |
| **SEO** | Posicionar bien en buscadores para términos relacionados con API de voz en español |
| **Credibilidad** | Trust signals, testimonios y documentación técnica |
| **Newsletter** | Recopilar emails para nurture y seguimiento comercial |

## 3. Usuario objetivo

- **Desarrolladores** que buscan integrar voz en sus aplicaciones.
- **Empresas/startups** que evalúan APIs de voz en español.
- **Product managers** que exploran opciones de Speech-to-Speech.
- **Cualquier visitante** interesado en IA conversacional en español.

## 4. Flujo de usuario

1. **Entrada**: Llega por buscador, enlace o campaña.
2. **Hero**: Lee el mensaje principal y CTA (ej. «Empieza gratis»).
3. **Producto**: Conoce Habla Push y Habla Flow, y sus diferencias.
4. **Precios**: Consulta planes (gratis, pro, empresa).
5. **API**: Ve ejemplo de código para integrar.
6. **Testimonios**: Refuerza confianza (placeholders por ahora).
7. **Acción**: Registro, login o contacto.
8. **Newsletter**: Suscripción en footer.
9. **Legal**: Acceso a Términos y Privacidad.

## 5. Stack técnico

| Capa | Tecnología |
|------|------------|
| **Framework** | React 18 |
| **Build** | Vite 6 |
| **Estilos** | Tailwind CSS 3 |
| **Animaciones** | Framer Motion |
| **Routing** | React Router 7 |
| **Iconos** | Lucide React |
| **Hosting** | SPA estática → Vercel / Netlify / GitHub Pages |

## 6. Requisitos funcionales

### RF1. Página principal (Home)

- Hero con headline, subtítulo y CTA.
- Trust signals (ej. «75 min gratis», «Integra en 5 min»).
- Sección Producto: Habla Push y Habla Flow con descripción breve.
- Sección Precios: planes con características y CTAs.
- Bloque de código de ejemplo con sintaxis destacada.
- Testimonios (placeholders).
- CTA final (registro / empezar gratis).
- Footer con enlaces, newsletter y contacto.

### RF2. Navegación

- Nav fijo con logo, Producto, Precios, API, Contacto.
- En home: Producto/Precios/API hacen scroll a secciones.
- Fuera de home: enlaces llevan a `/` con hash.
- Contacto siempre apunta a `/contacto`.
- Menú hamburguesa responsive en móvil.

### RF3. Rutas y páginas

| Ruta | Contenido |
|------|-----------|
| `/` | Landing completa |
| `/login` | Formulario de login (UI) |
| `/registro` | Formulario de registro (UI) |
| `/documentacion` | Documentación de la API |
| `/terminos` | Términos de servicio |
| `/privacidad` | Política de privacidad |
| `/contacto` | Formulario de contacto (UI) |

### RF4. Formularios

- **Login / Registro**: Solo UI; sin backend.
- **Contacto**: Solo UI; sin envío real.
- **Newsletter**: Placeholder; conectar con Resend/Mailchimp/etc.

### RF5. SEO y marketing

- Meta title, description y keywords.
- Open Graph y Twitter Card.
- Schema.org: Organization y SoftwareApplication.
- Favicon, og-image, canonical.
- `robots.txt` y `sitemap.xml`.
- Google Analytics (comentado, pendiente configurar ID).

### RF6. Hash scroll

- En home, `#producto`, `#precios`, etc. hacen scroll a la sección correspondiente.
- Footer detecta si está en home para scroll o `Link` a home con hash.

## 7. Requisitos no funcionales

### RNF1. Responsive

- Diseño adaptable a móvil, tablet y escritorio.
- Nav colapsable en móvil.

### RNF2. Rendimiento

- Build optimizado con Vite.
- Imágenes/fuentes mínimas; preferir SVG.
- Carga rápida (< 3 s en conexión media).

### RNF3. Accesibilidad

- Contraste adecuado.
- Navegación por teclado y etiquetas semánticas.
- Contenido en español.

### RNF4. Mantenibilidad

- Componentes modulares.
- Convenciones claras (ver AGENTS.md).
- Sin credenciales ni `.env` en control de versiones.

## 8. Alcance

**En alcance:**

- Landing principal con todas las secciones.
- Rutas: home, login, registro, documentación, términos, privacidad, contacto.
- SEO básico (meta, OG, Schema, robots, sitemap).
- Newsletter en footer (conectar backend pendiente).
- Formularios UI (login, registro, contacto).
- Referencia al proyecto núcleo en docs.

**Fuera de alcance:**

- Backend de autenticación (login/registro).
- Envío real de formularios (contacto, newsletter).
- Dashboard de usuarios.
- Documentación API completa (solo plantilla).
- Integración directa con la API Habla desde esta landing.

## 9. Métricas de éxito

- Landing desplegada y accesible en dominio final.
- Tiempo de carga < 3 s.
- Posicionamiento en Google para «API voz español», «speech-to-speech español».
- CTAs visibles y funcionales (enlaces a registro/login/contacto).
- Estructura lista para conectar formularios y newsletter con backend externo.

## 10. Backend futuro

Cuando se implemente **login real**, **admin**, **gestión de usuarios** o intranet:

- **Requerirá**: base de datos, lógica de autenticación, API (endpoints).
- **Opciones**: Supabase (auth + PostgreSQL), Firebase Auth, Auth0, Clerk, o backend propio (Node/FastAPI) en Railway/Render.
- La landing actual es **solo frontend**; el backend se despliega aparte (no en Vercel para la landing).

## 11. Referencias

- **Proyecto núcleo (API)**: `docs_reference/AGENTS_nucleo.md`
- **Guía para agentes**: `AGENTS.md`
- **Checklist SEO/marketing**: `SEO-MARKETING.md`
