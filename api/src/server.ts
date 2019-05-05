import { createServer } from "http"
import Koa from "koa"
import bodyParser from "koa-bodyparser"
import compress from "koa-compress"
import helmet from "koa-helmet"
import { Z_SYNC_FLUSH } from "zlib"
import { errorHandler } from "./middleware/error-handler"
import { timeElapsed } from "./middleware/time-elapsed"
import { routes } from "./routes"
import { logger } from "./utils/logger"
import { createWebsocketServer } from "./websocket"

const app = new Koa()
const server = createServer(app.callback())

app.use(errorHandler())
app.use(helmet())
app.use(compress({ filter: (contentType) => /text|application\/json/i.test(contentType), flush: Z_SYNC_FLUSH }))
app.use(bodyParser())
app.use(timeElapsed())

app.use(routes())

createWebsocketServer(server)

server.listen(9000, "0.0.0.0", () => logger.info("SYSTEM", "Server running on 0.0.0.0:9000"))
