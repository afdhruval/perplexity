import { io } from "socket.io-client"

let socket = null

export const initializeSocket = () => {
    if (!socket) {
        socket = io("http://localhost:3000", {
            withCredentials: true,
        })

        socket.on("connect", () => {
            console.log("✅ Connected to server:", socket.id)
        })

        socket.on("disconnect", () => {
            console.log("❌ Disconnected from server")
        })
    }

    return socket
}

export const getSocket = () => {
    if (!socket) {
        throw new Error("Socket not initialized")
    }
    return socket
}

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect()
        socket = null
    }
}   