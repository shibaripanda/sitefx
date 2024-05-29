import { useEffect } from "react"
import { SocketApt } from "../api/socket-api.ts"

export const useConnectSocket = () => {

    const connectSocket = async () => {
        const res = SocketApt.createConnections()
        console.log(SocketApt.socket) 
    }

    const userIdSet = async () => {
        const userId = localStorage.getItem('userId')
        console.log(userId)
        if(SocketApt.socket) SocketApt.socket.emit('userId', {userId})
    }
    
    useEffect(() => {
        const regClient = async () => {
            await connectSocket()
            // await userIdSet()
        }
        regClient()
    }, [])
}