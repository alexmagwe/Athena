import { Alert, SafeAreaView } from "react-native"
import { Slot, SplashScreen, useRouter } from "expo-router"

import { useState } from "react"
import React from "react"
import { Session } from "@supabase/supabase-js"
import { supabase } from "../services/supabase"
import Home from "./home"
import Auth2 from "./auth"
import { AuthContext } from "../context/AuthContext"

export default function App({ route }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState()
  const router = useRouter()

  React.useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session)
      })
      .catch((err) => Alert.alert(err))

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  // React.useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
  //   return subscriber // unsubscribe on unmount
  // }, [])

  // if (initializing)
  //   return (
  //     <View className="flex h-full items-center justify-center">
  //       <ActivityIndicator />
  //     </View>
  //   )
  return (
    <SafeAreaView>
      <AuthContext.Provider value={{ session: session }}>
        <Slot />
      </AuthContext.Provider>
    </SafeAreaView>
  )
}
