import { StatusBar } from "expo-status-bar"
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native"
import { FAB, Header } from "react-native-elements"
import { AntDesign } from "@expo/vector-icons"
import { useContext, useState } from "react"
import { useRouter } from "expo-router"
import React from "react"
import Toast from "react-native-toast-message"
import { supabase } from "../services/supabase"
import { AuthContext } from "../context/AuthContext"
import { TouchableOpacity } from "react-native-gesture-handler"
import Snippet from "./Snippet"
import { Root } from "react-native-popup-confirm-toast"
type Corpus = {
  content: string
  created_at: string
  id: number
}
export interface HomeProps {}
export default function Home({}: HomeProps) {
  const [loading, setLoading] = useState(true)
  const [corpus, setCorpus] = useState<Corpus[]>([])
  const { session } = useContext(AuthContext)
  // Handle user state changes
  async function handleSignOut() {
    try {
      await supabase.auth.signOut()
    } catch (err) {
      console.error(err)
    }
  }
  async function getWisdom() {
    if (session) {
      try {
        let { data, error, status } = await supabase
          .from("wisdom")
          .select("content,created_at,id")
          .eq("user_id", session.user.id)

        if (error) {
          setLoading(false)
          throw Error(error.message)
        }
        console.log("corpus", data)
        if (data && data.length > 0) {
          setCorpus(data)
        }
        setLoading(false)
      } catch (e) {
        console.error(e)

        setLoading(false)
      }
    }
  }
  const router = useRouter()
  React.useEffect(() => {
    getWisdom()
  }, [])
  return (
    <SafeAreaView className="h-full dark:bg-slate-800 text-slate-100">
      <Root>
        <Toast />
        <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          rightComponent={
            <TouchableOpacity onPress={handleSignOut}>
              <Text className="text-white">Sign Out</Text>
            </TouchableOpacity>
          }
        />
        <View className="py-16 px-4 ">
          {corpus.length == 0 && !loading ? (
            <View className="">
              <Text className="dark:text-white text-4xl mb-4">
                No wisdom leafs
              </Text>
            </View>
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getWisdom} />
              }
              className="gap-2"
            >
              {corpus.map((item, i) => (
                <Snippet key={i} id={item.id} content={item.content} />
              ))}
            </ScrollView>
          )}
          <StatusBar style="auto" />
        </View>
        <FAB
          size="large"
          color="green"
          onPress={() => router.push("/add")}
          icon={<AntDesign name="plus" size={25} color="white" />}
          placement="right"
        />
      </Root>
    </SafeAreaView>
  )
}
