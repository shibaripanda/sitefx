import { useEffect } from "react"
import { SocketApt } from "../api/socket-api.ts"

export const useConnectSocket = () => {

    const connectSocket = async () => {
        SocketApt.createConnections()
    }

    const userIdSet = async () => {
        let userId = localStorage.getItem('userId')
        if(!userId && SocketApt.socket && SocketApt.socket.id){
            localStorage.setItem('userId', SocketApt.socket.id)
            userId = localStorage.getItem('userId')
        }
        if(SocketApt.socket) SocketApt.socket.emit('userId', {userId})
    }
    
    useEffect(() => {
            connectSocket()
            setTimeout(() => {
                userIdSet()
            }, 1000)
    }, [])
}