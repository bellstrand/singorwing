import { Server } from "http"
import { SocketData, SocketDataType } from "types"
import ws from "ws"

let wss: ws.Server

export function createWebsocketServer(server: Server) {
	wss = new ws.Server({ server, path: "/api/socket" })
	wss.on("connection", (socket) => onConnection(socket))
}

function onConnection(socket: ws) {
	console.log("socket connection")
	socket.addEventListener("message", (message) => {
		console.log("socket message")
		console.log(message)
	})
	socket.addEventListener("open", (message) => {
		console.log("socket open")
		console.log(message)
	})
	socket.addEventListener("close", (message) => {
		console.log("socket close")
		console.log(message)
	})
	socket.addEventListener("error", (message) => {
		console.log("socket error")
		console.log(message)
	})
}

export function send(userId: string, type: SocketDataType, data: SocketData<any>["data"]) {
	const socketData: SocketData<any> = { type, data }
	wss.clients.forEach((socket: ws & { userId?: string }) => {
		if (socket.userId && userId === socket.userId) {
			socket.send(socketData)
		}
	})
}
