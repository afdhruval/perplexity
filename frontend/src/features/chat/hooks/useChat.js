import { useEffect } from "react"
import { initializeSocket, disconnectSocket } from "../service/chat.socket"

export const useChat = () => {

    useEffect(() => {
        const socket = initializeSocket()

        socket.on("message", (data) => {
            console.log(" Message received:", data)
        })

        return () => {
            disconnectSocket()
        }
    }, [])
}