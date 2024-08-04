import express from "express";
import dotenv from "dotenv"
import routes from "./routes/router.js"
import cors from "cors";
import { serverLog } from "./middlewares/serverLog.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use(serverLog)
app.use('/', routes)

app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}`))