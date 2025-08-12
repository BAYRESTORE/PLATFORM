import { supabase } from './supabaseClient';

export async function logAudit(userId: string | null, action: string, detail?: any) {
  try {
    await supabase.from('audit_logs').insert([
      {
        user_id: userId,
        action,
        detail,
      },
    ]);
  } catch (error) {
    console.error('Gagal simpan audit log:', error);
  }
                               }
