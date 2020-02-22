import { Server } from "http"
import { SocketData, SocketDataType } from "types"
import ws from "ws"
import { logger } from "./utils/logger"

let wss: ws.Server

export function createWebsocketServer(server: Server) {
	wss = new ws.Server({ server, path: "/api/socket" })
	wss.on("connection", (socket) => onConnection(socket))
}

function onConnection(socket: ws) {
	logger.info("SYSTEM", "socket connection")
	socket.addEventListener("message", (message) => {
		logger.info("SYSTEM", "socket message")
		logger.info("SYSTEM", message)
	})
	socket.addEventListener("open", (message) => {
		logger.info("SYSTEM", "socket open")
		logger.info("SYSTEM", message)
	})
	socket.addEventListener("close", (message) => {
		logger.info("SYSTEM", "socket close")
		logger.info("SYSTEM", message)
	})
	socket.addEventListener("error", (message) => {
		logger.info("SYSTEM", "socket error")
		logger.info("SYSTEM", message)
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
