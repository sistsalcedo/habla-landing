-- Actualizar perfiles Hobby (plan free) de 100 a 75 min/mes
-- Ejecutar en Supabase SQL Editor si ya tienes usuarios con el valor anterior

UPDATE public.habla_profiles
SET minutos_incluidos = 75
WHERE plan IN ('free', 'hobby') AND minutos_incluidos = 100;
