import { AuthContext } from "../context/AuthContext"
import React, { useContext } from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { Input } from "react-native-elements"
import Toast from "react-native-toast-message"
import { supabase } from "../services/supabase"
import { useRouter } from "expo-router"

export default function AddWisdomForm() {
  const [wisdom, setWisdom] = useState("")
  const [submitting, setSubmiting] = useState(false)
  const { session } = useContext(AuthContext)
  const router = useRouter()
  async function handleAdd() {
    console.log(session)

    if (session) {
      setSubmiting(true)
      try {
        let { data, count } = await supabase
          .from("wisdom")
          .insert({ content: wisdom, user_id: session.user.id })
          .select()
        console.log(data)
        Alert.alert("wisdom tree has a new leaf")
        router.back()
        setSubmiting(false)
      } catch (err) {
        Alert.alert(err)
        setSubmiting(false)
      }
    }
  }
  return (
    <View className="border-2 p-8 py-3 dark:bg-slate-800 dark:text-slate-100  h-full flex justify-center ">
      <Text className="text-5xl mb-4 dark:text-slate-100 ">
        Another life changing piece of text
      </Text>
      <Input
        className="dark:text-white"
        value={wisdom}
        onChangeText={(text) => setWisdom(text)}
      />
      <TouchableOpacity
        disabled={submitting}
        onPress={handleAdd}
        className="px-6 py-4 w-full text-center rounded-md border-2 border-green-400 bg-green-600"
      >
        <Text className="text-center text-lg text-slate-100 ">Add</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  )
}
