# Configuración del dominio habla.cloud

Guía paso a paso para conectar **habla.cloud** en Vercel, Railway y Supabase, de modo que la landing, la API y la autenticación funcionen correctamente.

---

## Resumen de cambios en el código

Ya se han realizado en el repositorio:

- `habla.io` → `habla.cloud` en index.html, sitemap.xml, robots.txt, meta tags, Schema.org
- `hola@habla.io` → `hola@habla.cloud` en Footer, Contacto, Términos, Privacidad, Documentación
- `api.habla.io` → `api.habla.cloud` en CodeBlock y Documentación (la API real seguirá apuntando a Railway hasta configurar dominio en Railway)

---

## 1. Vercel (Landing)

### 1.1 Añadir dominio personalizado

1. Entra en [vercel.com](https://vercel.com) → tu proyecto de la landing.
2. Ve a **Settings** → **Domains**.
3. Haz clic en **Add** y escribe: `habla.cloud`
4. También añade `www.habla.cloud` si quieres redirección (opcional).
5. Vercel te mostrará los registros DNS que debes configurar.

### 1.2 Configurar DNS en tu registrador

Actualmente tus nameservers son de parking (`ns1.dns-parking.com`). Tienes **dos opciones**:

#### Opción A: Usar nameservers de Vercel (recomendado)

1. En el panel de tu registrador de habla.cloud, busca **Nameservers** o **Servidores DNS**.
2. Cambia los nameservers a los que Vercel te indique, por ejemplo:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
3. Espera la propagación DNS (puede tardar 24–48 h, a menudo menos).
4. Vercel verificará el dominio y emitirá el certificado SSL.

#### Opción B: Mantener nameservers actuales y añadir registros

1. En el panel DNS del registrador, añade un registro **A**:
   - Nombre: `@` (o raíz)
   - Valor: `76.76.21.21` (IP de Vercel)
2. Si quieres `www`, añade un **CNAME**:
   - Nombre: `www`
   - Valor: `cname.vercel-dns.com`
3. Espera la propagación y la verificación en Vercel.

### 1.3 Verificar

- Deberías poder acceder a la landing en `https://habla.cloud`.
- El certificado SSL se genera automáticamente.

---

## 2. Railway (API backend)

La API está desplegada en `https://habla-production-4088.up.railway.app`. Para usar `api.habla.cloud`:

### 2.1 Añadir dominio personalizado en Railway

1. Entra en [railway.app](https://railway.app) → proyecto **assistant_STS** o **Habla**.
2. Abre el servicio del backend (API).
3. Ve a **Settings** → **Networking** o **Domains**.
4. Añade un dominio personalizado: `api.habla.cloud`

### 2.2 Configurar DNS

Railway te indicará qué registros crear. Normalmente:

- **CNAME**: `api` → `tu-servicio.up.railway.app` (o el valor que Railway muestre)

Si el registrador no admite CNAME en la raíz para subdominios, usa el CNAME que Railway indique para `api.habla.cloud`.

### 2.3 Alternativa sin dominio custom en Railway

Si prefieres no configurar `api.habla.cloud` en Railway de momento, la documentación y CodeBlock seguirán mostrando `api.habla.cloud`. Deberás:

- O bien configurar un proxy/redirect en tu hosting (por ejemplo en Vercel) de `api.habla.cloud` → Railway.
- O bien mantener temporalmente `https://habla-production-4088.up.railway.app` en los ejemplos de código hasta que Railway tenga el dominio custom.

---

## 3. Supabase (Auth y base de datos)

Supabase debe usar `habla.cloud` como origen autorizado para que login/registro funcionen correctamente.

### 3.1 URL Configuration

1. Entra en [supabase.com](https://supabase.com) → tu proyecto.
2. Ve a **Authentication** → **URL Configuration**.
3. Configura:

| Campo | Valor |
|-------|--------|
| **Site URL** | `https://habla.cloud` |
| **Redirect URLs** | Ver lista abajo |

### 3.2 Redirect URLs

Añade estas URLs en **Redirect URLs** (una por línea):

```
https://habla.cloud/
https://habla.cloud/*
https://habla.cloud/dashboard
https://habla.cloud/login
https://habla.cloud/registro
https://habla.cloud/resetear*
```

Opcionalmente, si sigues usando temporalmente el dominio de Vercel:

```
https://habla-landing.vercel.app/*
https://habla-landing.vercel.app/resetear*
```

### 3.3 Proveedores OAuth (Google, etc.)

Si usas Google OAuth:

1. En Supabase: **Authentication** → **Providers** → **Google**.
2. En la consola de Google Cloud, en **APIs & Services** → **Credentials** → tu OAuth 2.0 Client ID:
   - Añade `https://habla.cloud` en **Authorized JavaScript origins**.
   - Añade `https://habla.cloud/**` o las rutas concretas en **Authorized redirect URIs** (usa la URL de callback que Supabase indica).

### 3.4 Verificar

- Registro con email/contraseña.
- Login con email/contraseña.
- Si está configurado: login con Google.
- Redirección correcta tras login (por ejemplo a `/dashboard`).

---

## 4. Email hola@habla.cloud (opcional)

El checklist de tu registrador incluye “Obtén una cuenta de email profesional @habla.cloud”. Opciones:

- Usar el correo profesional del registrador (p. ej. Google Workspace, Zoho, etc.).
- Configurar MX en el DNS según las instrucciones del proveedor.
- Crear el buzón `hola@habla.cloud` para que los enlaces `mailto:hola@habla.cloud` funcionen.

---

## 5. Checklist final

| Paso | Acción | Estado |
|------|--------|--------|
| 1 | Cambios de dominio en el código | ✅ Hecho |
| 2 | Vercel: añadir `habla.cloud` | Pendiente |
| 3 | DNS: configurar para Vercel | Pendiente |
| 4 | Railway: añadir `api.habla.cloud` (opcional) | Pendiente |
| 5 | Supabase: Site URL y Redirect URLs | Pendiente |
| 6 | Supabase: Google OAuth (si aplica) | Pendiente |
| 7 | Crear/verificar hola@habla.cloud | Opcional |

---

## Orden recomendado

1. **Vercel + DNS** → Para que la landing funcione en `habla.cloud`.
2. **Supabase** → Para que login/registro funcionen desde `habla.cloud`.
3. **Railway** → Para unificar la API bajo `api.habla.cloud` (opcional pero recomendado).

Después de cada paso, prueba en producción antes de continuar.
