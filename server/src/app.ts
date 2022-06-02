import 'dotenv/config'
import express from 'express';
import BookRoutes from "./routes/BookRoutes";
import RoninRoutes from "./routes/RoninRoutes";

const app = express();

app.set('port', 3001);

app.use(express.json());

app.use(BookRoutes);
app.use(RoninRoutes);

export default app