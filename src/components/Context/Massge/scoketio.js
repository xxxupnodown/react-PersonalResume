import io from 'socket.io-client'

let socketio
function initIO () {
    if (!socketio) {
        socketio = io('ws://localhost:3000')
    }
}
initIO()
export default socketio