import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Button, Input } from "react-native-elements"
import { AntDesign } from "@expo/vector-icons"
import { supabase } from "../services/supabase"
type Props = {
  content: string
  id: number
}

export default function Snippet({ content, id }: Props) {
  let [edit, setEdit] = React.useState(false)
  let [value, setValue] = React.useState(content)
  function handleEdit() {
    try {
      supabase.from("wisdom").update({ content: value }).eq("id", id)
    } catch (e) {
      console.error(e)
    }
    setEdit(false)
  }
  return (
    <View>
      {edit ? (
        <View>
          <TouchableOpacity onLongPress={() => setEdit(true)}>
            <Text className="text-lg rounded-md p-3 bg-slate-100 dark:text-white dark:bg-slate-700">
              {content}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-row gap-x-2 items-center ">
          <Input value={value} onChangeText={(text) => setValue(text)} />
          <Button
            onPress={handleEdit}
            icon={<AntDesign name="check" size={24} color="black" />}
          />
        </View>
      )}
    </View>
  )
}
