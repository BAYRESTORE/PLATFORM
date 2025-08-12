import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function logAction(userId: string | null, action: string, detail: any = {}) {
  const { error } = await supabase.from('audit_logs').insert({
    user_id: userId,
    action,
    detail,
  });
  if (error) {
    console.error('Audit log error:', error);
  }
}
