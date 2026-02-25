import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function randomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const bytes = crypto.getRandomValues(new Uint8Array(length))
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length]
  }
  return result
}

async function sha256Hex(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return Response.json(
        { error: 'Missing or invalid Authorization header' },
        { status: 401, headers: corsHeaders }
      )
    }
    const token = authHeader.replace('Bearer ', '')

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    })

    const { data: { user }, error } = await supabaseAuth.auth.getUser()
    if (error || !user) {
      return Response.json({ error: 'Invalid or expired token' }, { status: 401, headers: corsHeaders })
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {}
    const regenerate = body?.regenerate === true

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('habla_profiles')
      .select('id, api_key_hash')
      .eq('supabase_user_id', user.id)
      .single()

    if (profileError || !profile) {
      return Response.json(
        { error: 'Profile not found. Please ensure you are registered.' },
        { status: 404, headers: corsHeaders }
      )
    }

    const hasKey = !!profile.api_key_hash

    if (hasKey && !regenerate) {
      return Response.json(
        {
          api_key: null,
          message:
            'Ya tienes una API key. Si la perdiste, usa el botón "Regenerar" para crear una nueva (la anterior dejará de funcionar).',
        },
        { headers: corsHeaders }
      )
    }

    const apiKey = `habla_${randomString(32)}`
    const apiKeyHash = await sha256Hex(apiKey)

    const { error: updateError } = await supabaseAdmin
      .from('habla_profiles')
      .update({ api_key_hash: apiKeyHash })
      .eq('id', profile.id)

    if (updateError) {
      return Response.json(
        { error: 'Failed to save API key', details: updateError.message },
        { status: 500, headers: corsHeaders }
      )
    }

    return Response.json(
      {
        api_key: apiKey,
        message: regenerate
          ? 'Nueva API key generada. La anterior ya no funcionará.'
          : 'Guarda tu API key en un lugar seguro. No la compartas.',
      },
      { headers: corsHeaders }
    )
  } catch (err) {
    return Response.json(
      { error: 'Internal error', details: String(err) },
      { status: 500, headers: corsHeaders }
    )
  }
})
