import io, { Socket } from 'socket.io-client';

export class SocketApt {
    static socket: null | Socket = null

    static createConnections(): void {
        this.socket = io('http://localhost:4000/')

        this.socket.on('connect', () => {
            
            let userId = localStorage.getItem('userId')
            if(!userId && this.socket){
                localStorage.setItem('userId', JSON.stringify(this.socket.id))
                userId = localStorage.getItem('userId')
            }
            console.log('connect', userId)
            this.socket.emit('userId', {userId})
        })

        this.socket.on('disconnect', () => {
            console.log('disconnect')
        })

    }
}