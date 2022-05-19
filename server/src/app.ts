import express from 'express';
import BookRoutes from "./routes/BookRoutes";

const app = express();

app.set('port', 3001);

app.use(express.json());

app.use(BookRoutes);

export default app