import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return Response.json({ error: 'Falta cabecera Authorization' }, { status: 401, headers: corsHeaders })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    })

    const { data: { user }, error } = await supabaseAuth.auth.getUser()
    if (error || !user) {
      return Response.json({ error: 'Token inválido o expirado' }, { status: 401, headers: corsHeaders })
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    const { error: updateError } = await supabaseAdmin
      .from('habla_profiles')
      .update({ plan: 'hobby', minutos_incluidos: 75, ciclo_desde: new Date().toISOString() })
      .eq('supabase_user_id', user.id)

    if (updateError) {
      return Response.json({ error: 'Error al cambiar de plan', details: updateError.message }, { status: 500, headers: corsHeaders })
    }

    return Response.json({ ok: true, plan: 'hobby' }, { headers: corsHeaders })
  } catch (err) {
    return Response.json({ error: 'Error interno', details: String(err) }, { status: 500, headers: corsHeaders })
  }
})
