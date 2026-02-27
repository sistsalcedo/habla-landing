-- Habla: tabla pending_deletions para borrado diferido (30 días)
-- Ejecutar en Supabase SQL Editor o: supabase db push

CREATE TABLE IF NOT EXISTS public.pending_deletions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supabase_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(supabase_user_id)
);

CREATE INDEX IF NOT EXISTS idx_pending_deletions_scheduled ON public.pending_deletions(scheduled_at);

-- RLS
ALTER TABLE public.pending_deletions ENABLE ROW LEVEL SECURITY;

-- Usuario solo puede ver su propia solicitud de eliminación
CREATE POLICY "Usuarios pueden leer su propia pending_deletion"
  ON public.pending_deletions FOR SELECT
  USING (auth.uid() = supabase_user_id);

-- Inserts y deletes los hace el backend con service_role (cuenta-eliminar, cuenta-cancelar, cron)
