// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './configs/db.js';
// import { inngest, functions } from "./inngest/index.js";
// import {serve} from 'inngest/express';
// import app from './app.js';






// const app=express();
// await connectDB();

// app.use(express.json());
// app.use(cors());

// app.get('/',(req,res)=> res.send('server is running'))
// app.use('/api/inngest', serve({ client: inngest, functions }));


// const PORT=process.env.PORT || 4000;
// // app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))

// export default app;

// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './configs/db.js';
// import { inngest, functions } from "./inngest/index.js";
// import { serve } from 'inngest/express';

// const app = express(); // ✅ Keep this one only

// // Connect to database
// await connectDB();

// // Middlewares
// app.use(express.json());
// app.use(cors());

// // Routes
// app.get('/', (req, res) => res.send('server is running'));
// app.use('/api/inngest', serve({ client: inngest, functions }));

// // Port setup
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// export default app;

// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './configs/db.js';
// import { inngest, functions } from "./inngest/index.js";
// import { serve } from 'inngest/express';

// const app = express();

// // Middlewares
// app.use(express.json());
// app.use(cors());

// // Routes
// app.get('/', (req, res) => res.send('server is running'));
// app.use('/api/inngest', serve({ client: inngest, functions }));

// // Connect to database (run on first import)
// connectDB().then(() => console.log('Database connected')).catch(console.error);

// // ✅ Export app for Vercel
// export default app;
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { inngest, functions } from "./inngest/index.js";
import { serve } from 'inngest/express';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => res.send('server is running'));
app.use('/api/inngest', serve({ client: inngest, functions }));

// Connect to database (run on first import)
connectDB().then(() => console.log('Database connected')).catch(console.error);

// ✅ Export app for Vercel
export default app;
