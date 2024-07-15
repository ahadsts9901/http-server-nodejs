import { createServer } from "http"
import { app } from "./routes/index.js";

const server = createServer(app)

const PORT = process.env.PORT! || 5002;

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});