import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"
import { SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY } from "@env"
import "react-native-url-polyfill/auto"
console.log(SUPABASE_ANON_KEY)
console.log(SUPABASE_PROJECT_URL)

export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
