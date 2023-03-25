import React from "react"
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { Button, Input } from "react-native-elements"
import { AntDesign } from "@expo/vector-icons"
import { supabase } from "../services/supabase"
import { Root, Popup } from "react-native-popup-confirm-toast"

type Props = {
  content: string
  id: number
}

export default function Snippet({ content, id }: Props) {
  let [edit, setEdit] = React.useState(false)
  let [value, setValue] = React.useState(content)
  async function handleEdit() {
    try {
      let data = await supabase
        .from("wisdom")
        .update({ content: value })
        .eq("id", id)
      console.log(data)
      Alert.alert("Success", "Leaf updated")
    } catch (e) {
      console.error(e)
    }
    setEdit(false)
  }
  async function handleDelete() {
    Popup.show({
      type: "confirm",
      title: "Delete Wisdom!",
      textBody: "Are you sure you want to delete this ",
      buttonText: "Delete",
      confirmText: "Cancel",
      callback: async () => {
        try {
          let data = await supabase.from("wisdom").delete().eq("id", id)
          console.log(data)
          Alert.alert("Success", "Leaf updated")
        } catch (e) {
          console.error(e)
        }
        Popup.hide()
      },
      cancelCallback: () => {
        Popup.hide()
      },
    })

    setEdit(false)
  }
  return (
    <View className="mt-2">
      {!edit ? (
        <View>
          <TouchableOpacity onLongPress={() => setEdit(true)}>
            <Text className="text-lg rounded-md p-3 bg-slate-100 dark:text-white dark:bg-slate-700">
              {content}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex   gap-x-2 items-center ">
          <Input
            className="dark:text-white"
            value={value}
            onChangeText={(text) => setValue(text)}
          />
          <View className="flex-row gap-6">
            <TouchableOpacity
              onPress={handleEdit}
              className="bg-slate-100 dark:bg-green-500 rounded-md p-2"
            >
              <Text>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              className="bg-slate-100 dark:bg-rose-400 rounded-md p-2"
            >
              <Text>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setEdit(false)}
              className="bg-slate-100 dark:bg-slate-300 rounded-md p-2"
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
}
