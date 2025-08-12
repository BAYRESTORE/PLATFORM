import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'

export function useAuth(requiredRoles: string[] = []) {
  const router = useRouter()

  useEffect(() => {
    async function checkUser() {
      const user = supabase.auth.user()
      if (!user) {
        router.replace('/login')
        return
      }
      if (requiredRoles.length > 0) {
        const role = user.user_metadata?.role
        if (!requiredRoles.includes(role)) {
          router.replace('/unauthorized')
        }
      }
    }
    checkUser()
  }, [router, requiredRoles])
}
