import express, { Express, Response, Request } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './app/config/db';
import router from './routes/routes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app: Express = express();
connectDB();

//middleware
// app.use(express.json());
app.use(cors({ origin: 'http://localhost:3010', credentials: true }));
app.use(express.json({ limit: '10mb' }));

app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));

// Parse JSON data
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('uploads'));

dotenv.config();

//routes
app.use('/api', router);


const port = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
    res.cookie("test", "test", {
        secure: false,
        maxAge: 1000 * 20,
    });
    res.send("Hello World")
});


app.listen(port, () => {
    console.log(`⚡Server running on port ${port}`);
});

