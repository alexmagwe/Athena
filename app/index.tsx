import { useContext } from "react"
import React from "react"
import Home from "./home"
import Auth from "./auth"
import { AuthContext } from "../context/AuthContext"

export default function App({ route }) {
  const { session } = useContext(AuthContext)

  return session ? <Home /> : <Auth />
}
