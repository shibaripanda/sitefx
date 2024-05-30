import io, { Socket } from 'socket.io-client';

export class SocketApt {
    
    static socket: null | Socket = null

    static createConnections(): void {
        this.socket = io('http://localhost:4000/')

        this.socket.on('connect', () => {
            console.log('connect')
            console.log(this.socket.rooms)
        })

        this.socket.on('disconnect', () => {
            console.log('disconnect')
        })

        this.socket.on('responseUserId', async (res): Promise<void> => {
            console.log(res, 'responseUserId')
        })
    }

}