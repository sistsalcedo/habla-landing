# Checklist de implementación – Habla (Landing + Backend)

Lista de tareas con errores potenciales y mitigaciones.

---

## Fase 1: Landing + Supabase Auth

### 1.1 Instalar y configurar Supabase

| Tarea | Estado | Errores posibles | Mitigación |
|-------|--------|------------------|------------|
| `npm install @supabase/supabase-js` | | `ERR! peer dep` | Usar `--legacy-peer-deps` si hay conflictos |
| Crear `src/lib/supabase.js` | | — | — |
| Crear `.env` con `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | | Variables no cargadas | Vite solo expone vars con prefijo `VITE_` |
| Añadir `.env` a `.gitignore` | | Credenciales en repo | Verificar que `.env` esté ignorado |

### 1.2 AuthContext y AuthProvider

| Tarea | Estado | Errores posibles | Mitigación |
|-------|--------|------------------|------------|
| Crear `src/contexts/AuthContext.jsx` | | — | — |
| Proveer `session`, `user`, `signIn`, `signOut`, `signUp`, `signInWithGoogle` | | — | — |
| Envolver App con `AuthProvider` en main.jsx | | Provider fuera de Router | Colocar AuthProvider dentro de BrowserRouter |
| Manejar estado de carga `loading` | | Flash de contenido no autenticado | Mostrar spinner mientras `loading === true` |

### 1.3 LoginPage con Supabase

| Tarea | Estado | Errores posibles | Mitigación |
|-------|--------|------------------|------------|
| Usar `signInWithPassword` para login manual | | Email no verificado | Mostrar mensaje si `user.email_confirmed_at` es null |
| Manejar error 400 "Invalid login" | | Contraseña/email incorrectos | Mostrar mensaje claro al usuario |
| Manejar error de red | | `fetch` falla | Try/catch, mensaje "Revisa tu conexión" |
| Redirect tras login exitoso | | Redirect antes de que session esté lista | Usar `onAuthStateChange` o await de `signIn` |

### 1.4 RegistroPage con Supabase

| Tarea | Estado | Errores posibles | Mitigación |
|-------|--------|------------------|------------|
| Usar `signUp({ email, password })` | | Email ya registrado | Detectar `AuthApiError` code 422, mensaje amigable |
| Confirmación de email | | Supabase requiere confirmación por defecto | En Supabase Dashboard → Auth → Providers: desactivar "Confirm email" para desarrollo, o enviar email |
| Botón "Continuar con Google" | | Redirect a Google falla | Verificar URL de redirect en Supabase (Auth → URL Configuration) |
| Redirect tras registro | | Usuario sin confirmar | Si confirmación activa, redirigir a página "Revisa tu email" |

### 1.5 Google OAuth

| Tarea | Estado | Errores posibles | Mitigación |
|-------|--------|------------------|------------|
| Configurar Google en Supabase Dashboard | | — | Auth → Providers → Google: Client ID + Secret |
| Añadir Redirect URL en Google Cloud Console | | `redirect_uri_mismatch` | Añadir `https://<project>.supabase.co/auth/v1/callback` |
| Añadir localhost para desarrollo | | No funciona en local | Añadir `http://localhost:5173` en Supabase Auth URL Configuration (Site URL, Redirect URLs) |
| `signInWithOAuth({ provider: 'google' })` | | Popup bloqueado | Usar redirect (default), no popup |

### 1.6 Protección de rutas y redirecciones

| Tarea | Estado | Errores posibles | Mitigación |
|-------|--------|------------------|------------|
| Redirigir a `/login` si no autenticado en /documentacion | | Loop de redirects | Comprobar `!session && !loading` antes de redirect |
| Mostrar email en Nav cuando autenticado | | — | Usar `user?.email` del contexto |
| Botón cerrar sesión | | Session no se limpia | Llamar `supabase.auth.signOut()` y comprobar estado |

---

## Fase 2: Supabase – Base de datos

### 2.1 Migraciones SQL

| Tarea | Estado | Errores posibles | Mitigación |
|-------|--------|------------------|------------|
| Crear tabla `habla_profiles` | | RLS bloquea inserts | Configurar RLS con políticas correctas |
| Crear tabla `usage` | | FK a profile_id | Asegurar que `habla_profiles` exista antes |
| Trigger `on_auth_user_created` | | Función no existe | Crear función antes del trigger |
| Policy: usuario solo lee su profile | | Deny por defecto | `CREATE POLICY ... ON habla_profiles FOR SELECT USING (auth.uid() = supabase_user_id)` |
| Policy: service role puede insertar en profiles | | Trigger falla | La función del trigger corre con `SECURITY DEFINER` y rol del owner |

### 2.2 Trigger para crear profile

| Tarea | Estado | Errores posibles | Mitigación |
|-------|--------|------------------|------------|
| Función `handle_new_user()` | | `auth.users` no accesible | En Supabase, `auth.users` es accesible desde funciones |
| Insert en `habla_profiles` | | UUID tipo incorrecto | `auth.uid()` devuelve UUID, columna debe ser uuid |
| Generar API key en trigger | | No se puede devolver al cliente | Generar en backend al primer acceso; en trigger solo crear fila con api_key_hash NULL si es necesario |

---

## Fase 3: Backend (proyecto separado)

### 3.1 Configuración

| Tarea | Estado | Errores posibles | Mitigación |
|-------|--------|------------------|------------|
| Variables SUPABASE_URL, SUPABASE_SERVICE_KEY | | Key incorrecta | Usar Service Role Key (no anon) para operaciones admin |
| DATABASE_URL (Supabase) | | Connection string mal formado | Formato: `postgresql://postgres:[PWD]@db.[ref].supabase.co:5432/postgres` |
| Conectar SQLAlchemy a Supabase Postgres | | SSL requerido | Añadir `?sslmode=require` al connection string |

### 3.2 Auth dual (JWT + API Key)

| Tarea | Estado | Errores posibles | Mitigación |
|-------|--------|------------------|------------|
| Verificar JWT Supabase | | Firma inválida | Usar `supabase.auth.getUser(jwt)` o jwt library con JWT secret de Supabase |
| Diferenciar Bearer sk_xxx vs JWT | | Confusión | Si `token.startswith("sk_")` → API key; si no → JWT |
| API key no encontrada | | 401 | Hash con mismo algoritmo (SHA256 + salt) que al crear |
| Rate limit por API key | | Sin Redis | Usar Upstash Redis o limitar por IP temporalmente |

### 3.3 Control de uso

| Tarea | Estado | Errores posibles | Mitigación |
|-------|--------|------------------|------------|
| SUM(usage.minutos) por ciclo | | Ciclo mal calculado | Usar `ciclo_desde` y `ciclo_desde + 30 days` |
| Race condition (2 requests simultáneos) | | Exceder límite | Usar transacción con SELECT FOR UPDATE o check + insert atómico |
| Medir minutos en WebSocket | | Pérdida de datos si desconexión brusca | Enviar uso en cada turno o al menos cada N turnos |
| Ciclo mensual reset | | No resetear | Job cron o función que actualice `ciclo_desde` cada 30 días |

### 3.4 Integración en rutas

| Tarea | Estado | Errores posibles | Mitigación |
|-------|--------|------------------|------------|
| Dependencia `get_current_profile` | | 401 en OPTIONS | CORS: permitir preflight sin auth |
| WebSocket: API key en query param | | Key en logs | Evitar logging de query params con keys |
| 429 con mensaje claro | | Cliente no parsea | Incluir `{"detail":"Límite de 100 min/mes alcanzado"}` en body |

---

## Fase 4: Errores comunes y soluciones

| Error | Causa probable | Solución |
|-------|----------------|----------|
| `CORS policy` bloqueando request | Backend no permite origen del frontend | Añadir origen en CORS (FastAPI `CORSMiddleware`) |
| `Invalid API key` 401 | Key mal hasheada o no existe | Verificar algoritmo de hash; logs para debug |
| `Relation "habla_profiles" does not exist` | Migración no ejecutada | Ejecutar SQL en Supabase SQL Editor |
| `new row violates row-level security` | RLS sin policy de insert | Crear policy o usar service role en backend |
| `Email not confirmed` | Confirmación activa en Supabase | Desactivar en dev o implementar resend de confirmación |
| Redirect loop en login | Router redirige antes de cargar session | Usar `loading` del AuthContext para no redirigir prematuramente |
| `.env` variables undefined | Vite no las expone | Reiniciar `npm run dev`; verificar prefijo `VITE_` |
| `Module not found: @supabase/supabase-js` | No instalado o node_modules corrupto | `rm -rf node_modules && npm install` |

---

## Orden recomendado de ejecución

1. [x] Instalar Supabase, crear cliente, .env.example
2. [x] AuthContext + AuthProvider
3. [x] LoginPage + RegistroPage con Supabase Auth
4. [x] Botón Google OAuth
5. [ ] Ejecutar SQL en Supabase (Supabase Dashboard > SQL Editor > pegar `supabase/migrations/001_habla_profiles_and_usage.sql`)
6. [ ] Crear .env con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
7. [ ] Configurar Google Provider en Supabase (Auth > Providers) para OAuth
8. [ ] (Backend) Configurar proyecto, auth dual, usage
9. [ ] (Backend) Integrar en /api/speech y /ws/speech
