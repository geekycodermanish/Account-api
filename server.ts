import express from 'express';
import bodyParser from 'body-parser';
import accountRoutes from './src/routes/accountRoutes';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', accountRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
