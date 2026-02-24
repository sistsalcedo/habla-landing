-- Habla: tablas habla_profiles y usage
-- Ejecutar en Supabase SQL Editor (Dashboard > SQL Editor)

-- Tabla de perfiles Habla (extiende auth.users)
CREATE TABLE IF NOT EXISTS public.habla_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supabase_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  api_key_hash TEXT,
  plan TEXT NOT NULL DEFAULT 'free',
  minutos_incluidos INTEGER NOT NULL DEFAULT 100,
  ciclo_desde TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(supabase_user_id)
);

-- Tabla de uso
CREATE TABLE IF NOT EXISTS public.usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.habla_profiles(id) ON DELETE CASCADE,
  minutos NUMERIC(10, 4) NOT NULL,
  producto TEXT NOT NULL CHECK (producto IN ('push', 'flow')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para consultas frecuentes
CREATE INDEX IF NOT EXISTS idx_usage_profile_created ON public.usage(profile_id, created_at);
CREATE INDEX IF NOT EXISTS idx_habla_profiles_supabase_user_id ON public.habla_profiles(supabase_user_id);

-- RLS
ALTER TABLE public.habla_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage ENABLE ROW LEVEL SECURITY;

-- Policy: usuario solo ve su propio profile
CREATE POLICY "Usuarios pueden leer su propio profile"
  ON public.habla_profiles FOR SELECT
  USING (auth.uid() = supabase_user_id);

-- Inserts en habla_profiles los hace el trigger (SECURITY DEFINER, bypass RLS)

-- Policy: usuario solo ve su propio usage (via profile)
CREATE POLICY "Usuarios pueden leer su propio usage"
  ON public.usage FOR SELECT
  USING (
    profile_id IN (
      SELECT id FROM public.habla_profiles WHERE supabase_user_id = auth.uid()
    )
  );

-- Inserts en usage los hace el backend con service role (bypass RLS)

-- Función: crear profile al registrar usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.habla_profiles (supabase_user_id, plan, minutos_incluidos, ciclo_desde)
  VALUES (NEW.id, 'free', 100, NOW());
  RETURN NEW;
END;
$$;

-- Trigger: al crear usuario en auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Comentario: la API key se genera en el backend al primer acceso
-- y se almacena hasheada en api_key_hash
